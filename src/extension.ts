// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { window, ExtensionContext, MessageItem, commands } from "vscode";
import { platform } from "os";

import OptimizerWebview from "./optimizerWebview";
import DefenderOptimizer from "./defenderOptimizer";
import IndexerOptimizer from "./indexerOptimizer";

export function activate(context: ExtensionContext) {
  if (platform() !== "win32") {
    // return;
  }

  const runConfig: MessageItem = { title: "Let's do it!" };
  const learnMore: MessageItem = { title: "Learn more" };

  const devOptimizer = new OptimizerWebview(context);
  const defenderOptimizer = new DefenderOptimizer();
  const indexerOptimizer = new IndexerOptimizer();

  commands.registerCommand(
    "windevaccelerator.configureDefender",
    defenderOptimizer.configureFolder
  );

  commands.registerCommand(
    "windevaccelerator.configureIndexer",
    indexerOptimizer.configureFolder
  );

  window
    .showInformationMessage(
      `Hey there! Let's get your Windows environment setup for optimal OSS
      development 💻.`,
      runConfig,
      learnMore
    )
    .then(async (result: MessageItem | undefined) => {
      if (result === runConfig) {
        devOptimizer.showWebview();
      }
    });
}

export function deactivate() {}
