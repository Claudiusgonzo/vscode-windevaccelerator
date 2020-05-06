// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  window,
  ViewColumn,
  WebviewPanel,
  ProgressLocation,
  Uri,
  ExtensionContext
} from "vscode";
import * as path from "path";

import initializeChecks from "./checks";
import { CheckItem } from "./checks/base";

export default class OptimizerWebview {
  checks: Array<CheckItem>;
  context: ExtensionContext;
  panel: WebviewPanel | undefined;

  constructor(context: ExtensionContext) {
    this.checks = Array<CheckItem>();
    this.context = context;
  }

  showWebview() {
    this.panel = window.createWebviewPanel(
      "optimizer",
      "Optimize Your Windows DevBox",
      ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          Uri.file(path.join(this.context.extensionPath, "resources"))
        ]
      }
    );

    this.checks = initializeChecks(this.context, this.panel);

    this.panel.webview.html = this.serializeChecks();
    this.panel.webview.onDidReceiveMessage(this.handleClick.bind(this));
  }

  handleClick(message: any): void {
    if (message.command === "toggle") {
      this.checks.forEach(c => {
        if (c.type === message.event) {
          c.toggle();
        }
      });
    }

    if (message.command === "exec") {
      // TODO: Execute a single task.
    }

    if (message.command === "execSelected") {
      this.executeSelected();
    }
  }

  async executeSelected() {
    const selected: Array<CheckItem> = Array<CheckItem>();

    for (let i = 0; i < this.checks.length; i++) {
      if (this.checks[i].isChecked) {
        selected.push(this.checks[i]);
      }
    }

    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: `Configuring ${selected.length} tools`,
        cancellable: false
      },
      async progress => {
        const incrementLength = 100 / selected.length;

        progress.report({ increment: 0 });

        return new Promise(async resolve => {
          (async function next(count) {
            if (count === selected.length) {
              return resolve();
            }

            let cur = selected[count];
            let increment = incrementLength;

            if (count > 0) {
              increment = incrementLength * count;
            }

            progress.report({
              increment: increment,
              message: `Installing ${cur.type}...`
            });

            await cur.install();

            setTimeout(next, 2500, ++count);
          })(0);
        });
      }
    );
  }

  serializeChecks() {
    let checksHtml: string = "";

    for (const check of this.checks) {
      checksHtml += check.render();
    }

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Windows Dev Box Optimizer</title>
        <style>
          * { font-family: Verdana, Helvetica, sans-serif; }

          .logo {
            width: 100px;
            /* height: 75px; */
            margin: 0 15px 0 0;
           }

           img {
             max-width: 100px;
             max-height: 100px;
           }

          body.vscode-light {
            color: black;
          }

          body.vscode-dark {
            color: white;
          }

          .check-list {
            list-style: none;
            margin-top: 30px;
          }

          .check-item {
            display: flex;
            align-items: center;
          }

          .check-box { padding: 0 10px 0 0; }

          .check-item-details { margin-bottom: 20px; margin-left: 20px;}

          .check-item-details h1,
          .check-item-details p { margin: 0 0 5px 0; }
          .button {
            box-sizing: border-box;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            padding: 5px 10px;
            outline-offset: 2px!important;
            color: var(--vscode-button-foreground);
            background: var(--vscode-button-background);
          }

          .button:hover {
            color: var(--vscode-button-foreground);
            background: var(--vscode-button-hoverBackground);
          }

          h1 { font-size: 22px; }
        </style>
      </head>
      <body>
        <h1>Optimize Windows for Development</h1>
        <p>Windows is already a great development platform and with a few tweaks we can make it even better.
        Select one or more tools and then click the configure button. Please note, some tools may require a restart.</p>
        <ul class="check-list">
          ${checksHtml}
          <li style="margin: 20px 0 0 0"><a class="button" role="button" title="Configure Selected" onClick="handleClick('execSelected')">Configure Selected</a></li>
        </ul>

        <script>
          const vscode = acquireVsCodeApi();

          function handleClick(c, e) {
            vscode.postMessage({ command: c, event: e });
            return false;
          }
        </script>
      </body>
      </html>`;
  }
}
