export default class OptimizerWebview {
  constructor() {}

  getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Windows Dev Box Optimizer</title>
</head>
<body>
  <ul>
    <li>Install WSL <span>[Do it now]</span></li>
  </ul>
</body>
</html>`;
  }
}
