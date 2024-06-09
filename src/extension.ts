// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DevchainPanel } from './panels/DevchainPanel';

// Start the Extension and run the webview panel
export function activate(context: vscode.ExtensionContext) {

    let webview = vscode.commands.registerCommand('devchain-studio.dev', () => { 
      DevchainPanel.create_devchain_panel(context.extensionUri);
    });
    context.subscriptions.push(webview);
}


// This method is called when your extension is deactivated
export function deactivate() {}
