import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import * as path from 'path';

interface ImageConfig {
  format: string;
  extension: string;
  image: string | null;
  createDataURL(): string;
}

function getImageConfig(path: string): ImageConfig {
  let imageResouce: string | null = null;
  try {
    imageResouce = readFileSync(
      path, 'base64'
    );
  } catch(e) {
    console.log('error', e);
  }

  const ext = path.split('.').slice(-1)[0];
  return {
    format: 'base64',
    extension: ext,
    image: imageResouce,
    createDataURL: () => `data:image/${ext};base64,${imageResouce}`
  };
}

function getHTML(imageConfig: ImageConfig): string {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cat Coding</title>
            </head>
            <body>
              <img src="${imageConfig.createDataURL()}" alt="sample-img"/>
            </body>
            </html>`;
}

function createPanel() {
  return vscode.window.createWebviewPanel(
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
}

export function showImage(c: vscode.ExtensionContext): { dispose: any } {
  return vscode.commands.registerCommand('appetizer.showImage', async () => {
    const selection = await vscode.window.showInformationMessage('Hello World from appetizer!', 'Popup Dish!');
    if (selection === 'Popup Dish!') {
      const imagePath = path.resolve(__dirname, 'sample.jpg');
      const imageConfig = getImageConfig(imagePath);
      const html:string = getHTML(imageConfig);
      const panel = createPanel();
      panel.webview.html = html;
    }
  });
}
