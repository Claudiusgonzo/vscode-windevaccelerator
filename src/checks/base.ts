export enum CheckType {
  WSL,
  Terminal,
  Font,
  None
}

export interface CheckItem {
  details: string;
  template: string;
  title: string;
  type: CheckType;

  clickHandler(): void;
  render(): string;
}

class CheckBase {
  details: string;
  template: string;
  title: string;
  type: CheckType;

  constructor() {
    this.details = "";
    this.title = "";
    this.type = CheckType.None;

    this.template = `
    <li class="check-item">
      <div class="check-item">
        <div class="check-box"><input type="checkbox" name="wsl" value="wsl"></div>
        <div class="check-item-details">
          <h1 class="check-header">%title%</h1>
          <p>%details%</p>
          <a href="#">Do it now</a>
        </div>
      </div>
    </li>
    `;
  }

  render() {
    return this.template
      .replace("%title%", this.title)
      .replace("%details%", this.details);
  }
}

export class WSLCheck extends CheckBase implements CheckItem {
  constructor() {
    super();

    this.type = CheckType.WSL;
    this.title = "Install WSL";
    this.details = `Install and run all of your favorite Linux command-line apps
    and tools along side your favorite Windows Apps.`;
  }

  clickHandler() {}
}

export class TerminalCheck extends CheckBase implements CheckItem {
  constructor() {
    super();

    this.type = CheckType.Terminal;
    this.title = "Install the Windows Terminal";
    this.details = `Install a new, modern, feature-rich, productive terminal
    application for command-line users.`;
  }

  clickHandler() {}
}
