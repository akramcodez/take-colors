import type { WebviewApi } from "vscode-webview";

// This constant holds the VS Code API object provided by the webview environment.
// It's used to post messages from the webview to the extension.
const vscode: WebviewApi<unknown> = acquireVsCodeApi();

export default vscode;
