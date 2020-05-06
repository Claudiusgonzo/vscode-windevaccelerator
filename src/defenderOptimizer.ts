// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Uri } from "vscode";
import { spawn } from "child_process";

export default class DefenderOptimizer {
  constructor() {}
  async configureFolder(folder: Uri) {
    console.log(folder.fsPath);
    const cp = spawn("powershell.exe", [
      "runas.exe /savecred /user:administrator",
      `"Add-MpPreference -ExclusionPath ${folder.fsPath}"`,
    ]);
    cp.on("data", console.log.bind(console));
    // const res = exec(
    //   `runas.exe /savecred /user:administrator "Add-MpPreference -ExclusionPath ${folder.fsPath}"`,
    //   (err, stdout) => {
    //     return new Promise((resolve, reject) => {
    //       console.log(err, stdout);
    //       if (err) return reject(err);
    //       resolve(stdout);
    //     });
    //   }
    // );
  }
}
