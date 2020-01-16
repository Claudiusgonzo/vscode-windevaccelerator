import { window, ExtensionContext, MessageItem, ViewColumn } from "vscode";
import { platform } from "os";

import OptimizerWebview from "./optimizerWebview";

export function activate(context: ExtensionContext) {
  if (platform() !== "win32") {
    return;
  }

  const runConfig: MessageItem = { title: "Run" };
  const learnMore: MessageItem = { title: "Learn more" };
  const optimizer = new OptimizerWebview();

  window
    .showInformationMessage(
      `Hey there! Let's get your Windows environment setup for optimal OSS
      development. 💻`,
      runConfig,
      learnMore
    )
    .then(async (result: MessageItem | undefined) => {
      if (result === runConfig) {
        const panel = window.createWebviewPanel(
          "optimizer",
          "Optimize Windows",
          ViewColumn.One,
          {}
        );

        panel.webview.html = optimizer.getWebviewContent();
      }
    });
}

export function deactivate() {}