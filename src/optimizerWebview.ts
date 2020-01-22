import { window, ViewColumn, WebviewPanel } from "vscode";

import { WSLCheck, TerminalCheck, CheckItem } from "./checks";

export default class OptimizerWebview {
  panel: WebviewPanel | undefined;
  checks: Array<CheckItem>;

  constructor() {
    // Inititalize each check item.
    this.checks = Array(new TerminalCheck(), new WSLCheck());
  }

  showWebview() {
    this.panel = window.createWebviewPanel(
      "optimizer",
      "Optimize Your Windows DevBox",
      ViewColumn.One,
      {}
    );
    this.panel.webview.html = this.serializeChecks();
  }

  serializeChecks() {
    let checks: string = "";

    for (const check of this.checks) {
      checks += check.render();
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
          ${checks}
          <li style="margin: 20px 0 0 0"><button>Install Selected</button></li>
        </ul>
      </body>
      </html>`;
  }
}
