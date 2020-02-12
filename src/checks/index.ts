// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ExtensionContext, WebviewPanel, Uri } from "vscode";
import * as path from "path";

import {
  CheckItem,
  TerminalCheck,
  WSLCheck,
  FontCheck,
  DefenderCheck,
  IndexerCheck
} from "./base";

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
  const fontImagePath = Uri.file(
    path.join(context.extensionPath, "resources", "cascadia-code.png")
  );
  const defenderImagePath = Uri.file(
    path.join(context.extensionPath, "resources", "Defender.png")
  );
  const indexerImagePath = Uri.file(
    path.join(context.extensionPath, "resources", "indexer.png")
  );

  return new Array(
    new WSLCheck(panel.webview.asWebviewUri(wslImagePath)),
    new TerminalCheck(panel.webview.asWebviewUri(terminalImagePath)),
    new FontCheck(panel.webview.asWebviewUri(fontImagePath)),
    new DefenderCheck(panel.webview.asWebviewUri(defenderImagePath)),
    new IndexerCheck(panel.webview.asWebviewUri(indexerImagePath))
  );
}
