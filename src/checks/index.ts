import { CheckItem, TerminalCheck, WSLCheck } from "./base";

export default function initializeChecks(): Array<CheckItem> {
  return new Array(new WSLCheck(), new TerminalCheck());
}
