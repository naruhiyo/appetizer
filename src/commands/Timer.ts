import * as vscode from 'vscode';

function getCurrentTime(): string {
  const date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

export function showCurrentTime(c: vscode.ExtensionContext): { dispose: any } {
  return vscode.commands.registerCommand('appetizer.showCurrentTime', () => {
    const currentTime = getCurrentTime()
    vscode.window.showInformationMessage('Now: ' + currentTime);
  });
}
