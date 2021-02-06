import * as vscode from 'vscode';

export default vscode.commands.registerCommand('appetizer.helloWorld', () => {
  vscode.window.showInformationMessage('Hello World from appetizer!');
});
