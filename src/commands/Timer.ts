
import * as vscode from 'vscode';

type dateTime = {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
}

function getCurrentTime(): dateTime {
  const date: Date = new Date();
  const currentTime: dateTime = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
  return currentTime
}

export function showCurrentTime(c: vscode.ExtensionContext): { dispose: any } {
  return vscode.commands.registerCommand('appetizer.showCurrentTime', () => {
    const currentTime: dateTime = getCurrentTime()
    vscode.window.showInformationMessage(`Now: ${currentTime.year}/${currentTime.month}/${currentTime.date} ${currentTime.hour}:${currentTime.minute}:${currentTime.second}`);
  });
}
