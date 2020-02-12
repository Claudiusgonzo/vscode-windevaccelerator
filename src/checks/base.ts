// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as path from "path";
import { spawn } from "child_process";
import { Uri } from "vscode";

export enum CheckType {
  WSL = "WSL",
  Terminal = "Terminal",
  Font = "Font",
  Defender = "Defender",
  Indexer = "Indexer",
  None = "None"
}

export interface CheckItem {
  details: string;
  isChecked: boolean;
  template: string;
  title: string;
  type: CheckType;

  render(): string;
  toggle(): void;
  install(): Promise<boolean>;
}

class CheckBase {
  details: string;
  imagePath: Uri;
  isChecked: boolean;
  template: string;
  title: string;
  type: CheckType;

  constructor(imagePath: Uri) {
    this.details = "";
    this.imagePath = imagePath;
    this.isChecked = false;
    this.title = "";
    this.type = CheckType.None;

    this.template = `
    <li class="check-item">
      <div class="check-item">
        <div class="check-box"><input type="checkbox" onClick="handleClick('toggle', '%type%')"></div>
        <div><img class="logo" src="%imagePath%"></div>
        <div class="check-item-details">
          <h1 class="check-header">%title%</h1>
          <p>%details%</p>
          <a href="#" onClick="handleClick('exec', '%type%')">Do it now</a>
        </div>
      </div>
    </li>
    `;
  }

  render() {
    return this.template
      .replace(/\%type\%/gi, this.type.toString())
      .replace(/\%imagePath\%/gi, this.imagePath.toString())
      .replace(/\%title\%/gi, this.title)
      .replace(/\%details\%/gi, this.details);
  }

  toggle() {
    this.isChecked = !this.isChecked;
  }
}

export class WSLCheck extends CheckBase implements CheckItem {
  constructor(imagePath: Uri) {
    super(imagePath);

    this.type = CheckType.WSL;
    this.title = "Windows Subsystem for Linux (WSL)";
    this.details = `WSL is a Windows 10 feature that enables you to run full, native Linux distributions directly on Windows,
    alongside your traditional Windows desktop and modern store apps. With WSL you can you can run "Linux first" command line tools such as bash,
    sed, awk, etc. and you can install popular Web and OSS frameworks and runtimes such as Node, Python, or PHP.
    `;
  }

  async install() {
    // # Enable necessary features
    // dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    // dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    // # Download the appx from our docs page and install it
    // curl.exe -LO https://aka.ms/wsl-ubuntu-1804
    // Add-AppxPackage .\wsl-ubuntu-1804
    // # RESTART to actually use WSL! Do not use the app before
    return new Promise<boolean>(resolve => {
      // const cp = spawn("powershell.exe", [
      //   "Enable-WindowsOptionalFeature",
      //   "-Online",
      //   "-FeatureName Microsoft-Windows-Subsystem-Linux"
      // ]);
      // cp.on("data", console.log.bind(console));
      resolve(true);
    });
  }
}

export class TerminalCheck extends CheckBase implements CheckItem {
  constructor(imagePath: Uri) {
    super(imagePath);

    this.type = CheckType.Terminal;
    this.title = "Windows Terminal";
    this.details = `The new Windows Terminal is a modern, fast, and feature rich terminal application for command line tools
    and shells like the Command Prompt, PowerShell, and WSL. The Terminal supports multiple tabs, Unicode and UTF-8 characters,
    GPU acceleration, and custom themes, styles, and configurations.`;
  }

  async install() {
    return new Promise<boolean>(resolve => {
      // TODO
      resolve(true);
    });
  }
}

export class FontCheck extends CheckBase implements CheckItem {
  constructor(imagePath: Uri) {
    super(imagePath);

    this.type = CheckType.Font;
    this.title = "Cascadia Code Font";
    this.details = `Cascadia Code is a new monospaced font, which enhances the look and feel of the new Windows Terminal. Cascadia Code supports
    programming ligatures which merge symbols and remove details so the eyes are processing less while coding.
    `;
  }

  async install() {
    return new Promise<boolean>(resolve => {
      // TODO
      resolve(true);
    });
  }
}

export class DefenderCheck extends CheckBase implements CheckItem {
  constructor(imagePath: Uri) {
    super(imagePath);

    this.type = CheckType.Defender;
    this.title = "Configure Windows Defender";
    this.details = `Windows Defender keeps your computer safe by monitoring every file change on your computer.
    Because compilers can create and touch a lot of files, this can slow down the development process without providing any additional protection.
    You can configure Windows Defender to ignore specific build output folders you know are secure.
    `;
  }

  async install() {
    return new Promise<boolean>(resolve => {
      // TODO
      resolve(true);
    });
  }
}

export class IndexerCheck extends CheckBase implements CheckItem {
  constructor(imagePath: Uri) {
    super(imagePath);

    this.type = CheckType.Indexer;
    this.title = "Configure Windows Indexer";
    this.details = `The Windows Indexer service helps to improve search performance on your computer.
    By using the new Enhanced Search feature of Windows 10, you can exclude certain search locations
    such as build outputs that change frequently and are not relevant when providing search results.
    `;
  }

  async install() {
    return new Promise<boolean>(resolve => {
      // TODO
      resolve(true);
    });
  }
}
