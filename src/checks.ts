enum CheckType {
  WSL,
  Terminal
}
enum CheckState {}

interface CheckItem {
  type: CheckType;
  title: string;
  details: string;

  clickHandler(): void;
  serialize(): string;
}

export class WSLCheck implements CheckItem {
  type: CheckType;
  details: string;
  title: string;

  constructor() {
    this.type = CheckType.WSL;
    this.title = "Install WSL";
    this.details = `Install and run all of your favorite Linux command-line apps
    and tools along side your favorite Windows Apps.`;
  }

  clickHandler() {}

  serialize() {
    return `<li class="check-item">
      <div class="check-item">
        <div class="check-box"><input type="checkbox" name="wsl" value="wsl"></div>
        <div class="check-item-details">
          <h1 class="check-header">${this.title}</h1>
          <p>${this.details}</p>
          <a href="#">Do it now</a>
        </div>
      </div>
    </li>`;
  }
}

export class TerminalCheck implements CheckItem {
  type: CheckType;
  details: string;
  title: string;

  constructor() {
    this.type = CheckType.Terminal;
    this.title = "Install the Windows Terminal";
    this.details = `Install a new, modern, feature-rich, productive terminal
    application for command-line users.`;
  }

  clickHandler() {}

  serialize() {
    return `<li class="check-item">
      <div class="check-item">
        <div class="check-box"><input type="checkbox" name="terminal" value="terminal"></div>
        <div class="check-item-details">
          <h1 class="check-header">${this.title}</h1>
          <p>${this.details}</p>
          <a href="#">Do it now</a>
        </div>
      </div>
    </li>`;
  }
}
