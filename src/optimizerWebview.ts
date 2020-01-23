import { window, ViewColumn, WebviewPanel, ProgressLocation } from "vscode";

import initializeChecks from "./checks";
import { CheckItem, CheckType } from "./checks/base";

export default class OptimizerWebview {
  panel: WebviewPanel | undefined;
  checks: Array<CheckItem>;

  constructor() {
    this.checks = initializeChecks();
  }

  showWebview() {
    this.panel = window.createWebviewPanel(
      "optimizer",
      "Optimize Your Windows DevBox",
      ViewColumn.One,
      { enableScripts: true }
    );

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

  executeSelected() {
    const selected: Array<CheckItem> = Array<CheckItem>();
    for (let i = 0; i < this.checks.length; i++) {
      selected.push(this.checks[i]);
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

        return new Promise(resolve => {
          (function next(count) {
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

            setTimeout(next, 1500, ++count);
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
          * { font-family: Arial, Helvetica, sans-serif; }

          .check-list {
            list-style: none;
            margin-top: 20px;
          }

          .check-item {
            display: flex;
            align-items: center;
          }

          .check-box { padding: 0 10px 0 0; }

          .check-item-details { margin-bottom: 20px; }

          .check-item-details h1,
          .check-item-details p { margin: 0 0 5px 0; }

          h1 { font-size: 22px; }
        </style>
      </head>
      <body>
        <ul class="check-list">
          ${checksHtml}
          <li style="margin: 20px 0 0 0"><button onClick="handleClick('execSelected')">Install Selected</button></li>
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
