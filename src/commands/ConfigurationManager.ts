import * as vscode from 'vscode';

export function configurationManager(c: vscode.ExtensionContext): { dispose: any } {
  const apiKeyConf = vscode.workspace.getConfiguration('appetizerConf.apiKey');
  const generalConf = vscode.workspace.getConfiguration('appetizerConf.general');

  return vscode.commands.registerCommand('appetizer.readConfig', async () => {
    vscode.window.showInformationMessage(`hotpepperApiKey: ${apiKeyConf.get('hotpepperApiKey')}`);

    const lat: number | undefined = generalConf.get('lat');
    const lng: number | undefined = generalConf.get('lng');
    const priceRange: number[] | undefined = generalConf.get('priceRange');
    const generalConfInfo = `
      nearStation: ${generalConf.get('nearStation')},
      latLng: ${lat},${lng},
      priceRange: ${priceRange?.join(',')},
      searchStoreRange: ${generalConf.get('searchStoreRange')}
    `;
    vscode.window.showInformationMessage(generalConfInfo);
  });
}