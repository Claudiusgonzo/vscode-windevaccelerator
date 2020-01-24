import * as path from "path";
import { spawn } from "child_process";
import { ExtensionContext, Uri } from "vscode";

export enum CheckType {
  WSL = "WSL",
  Terminal = "Terminal",
  Font = "Font",
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
    this.title = "Install WSL";
    this.details = `Install and run all of your favorite Linux command-line apps
    and tools along side your favorite Windows Apps.`;
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
    this.title = "Install the Windows Terminal";
    this.details = `Install a new, modern, feature-rich, productive terminal
    application for command-line users.`;
  }

  async install() {
    return new Promise<boolean>(resolve => {
      // TODO
      resolve(true);
    });
  }
}
