import { window, ViewColumn, WebviewPanel } from "vscode";

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
      {}
    );

    this.panel.webview.html = this.serializeChecks();
    this.panel.webview.onDidReceiveMessage(this.handleClick);
  }

  handleClick(message: any): void {
    switch (message.checkType) {
      case "wsl":
        this.checks.forEach(c => {
          if (c.type === CheckType.WSL) {
            // toggle
          }
        });
        break;

      default:
        break;
    }
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
          <li style="margin: 20px 0 0 0"><button>Install Selected</button></li>
        </ul>
      </body>
      </html>`;
  }
}
