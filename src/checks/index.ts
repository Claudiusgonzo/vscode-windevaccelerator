import { ExtensionContext, WebviewPanel, Uri } from "vscode";
import * as path from "path";

import { CheckItem, TerminalCheck, WSLCheck } from "./base";

export default function initializeChecks(
  context: ExtensionContext,
  panel: WebviewPanel
): Array<CheckItem> {
  // Initialize the images.
  const terminalImagePath = Uri.file(
    path.join(context.extensionPath, "resources", "terminal.png")
  );
  const wslImagePath = Uri.file(
    path.join(context.extensionPath, "resources", "ubuntu-icon.png")
  );

  return new Array(
    new WSLCheck(panel.webview.asWebviewUri(wslImagePath)),
    new TerminalCheck(panel.webview.asWebviewUri(terminalImagePath))
  );
}
