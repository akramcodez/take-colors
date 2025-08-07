import * as vscode from "vscode";
import { TakeColorsPanelProvider } from "./TakeColorsPanelProvider"; // Import our new provider

export function activate(context: vscode.ExtensionContext) {
  // Instantiate our PanelProvider
  const provider = new TakeColorsPanelProvider(context.extensionUri);

  // Register the provider with VS Code
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TakeColorsPanelProvider.viewType,
      provider
    )
  );
}

export function deactivate() {}
