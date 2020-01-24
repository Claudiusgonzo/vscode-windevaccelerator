import { window, ExtensionContext, MessageItem } from "vscode";
import { platform } from "os";

import OptimizerWebview from "./optimizerWebview";

export function activate(context: ExtensionContext) {
  if (platform() !== "win32") {
    // return;
  }

  const runConfig: MessageItem = { title: "Let's do it!" };
  const learnMore: MessageItem = { title: "Learn more" };
  const optimizer = new OptimizerWebview(context);

  window
    .showInformationMessage(
      `Hey there! Let's get your Windows environment setup for optimal OSS
      development. 💻`,
      runConfig,
      learnMore
    )
    .then(async (result: MessageItem | undefined) => {
      if (result === runConfig) {
        optimizer.showWebview();
      }
    });
}

export function deactivate() {}
