import * as vscode from 'vscode';

export function helloWorld(c: vscode.ExtensionContext): { dispose: any } {
  return vscode.commands.registerCommand('appetizer.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from appetizer!');
  });
}
