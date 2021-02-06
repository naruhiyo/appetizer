import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import * as path from 'path';

function getHtmlForWebview(context: vscode.ExtensionContext) {
  const loadImagePath = path.resolve(__dirname, 'sample.jpg');
  let imageConfig = {
    extension: `image/jpeg`
  };
  let sampleImage = null;
  try {
    sampleImage = readFileSync(
      loadImagePath, 'base64'
    );
  } catch(e) {
    console.log('error', e);
  }
  
  console.log(`data:${imageConfig.extension},base64,${sampleImage}`);
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cat Coding</title>
            </head>
            <body>
              <img src="data:${imageConfig.extension};base64,${sampleImage}" alt="sample-img"/>
            </body>
            </html>`;
}

function createPanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'showImage',
    'Sample Image Viewer',
    vscode.ViewColumn.One,
    {
      // Enable javascript in the webview
      enableScripts: true,

      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [],
    }
  );
  panel.webview.html = getHtmlForWebview(context);
}

export function showImage(c: vscode.ExtensionContext): { dispose: any } {
  return vscode.commands.registerCommand('appetizer.showImage', () => {
    createPanel(c);
  });
}
