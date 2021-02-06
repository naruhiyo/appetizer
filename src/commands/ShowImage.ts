import * as vscode from 'vscode';
import slash from 'slash';

import sampleImage from '../sample.jpg';

export default vscode.commands.registerCommand('appetizer.showImage', () => {
  // web view の作成
  const uri = sampleImage.startsWith('data:')
            ? vscode.Uri.parse(sampleImage)
            : vscode.Uri.file(slash(sampleImage));
  
});
