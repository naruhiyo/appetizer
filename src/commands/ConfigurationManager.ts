import * as vscode from 'vscode';

export function configurationManager(c: vscode.ExtensionContext): { dispose: any } {

  return vscode.commands.registerCommand('appetizer.readConfig', async () => {
    // read config
    const apiKeyConf = vscode.workspace.getConfiguration('appetizerConf.apiKey');
    const generalConf = vscode.workspace.getConfiguration('appetizerConf.general');

    vscode.window.showInformationMessage(`hotpepperApiKey: ${apiKeyConf.get('hotpepperApiKey')}`);

    const lat: number | undefined = generalConf.get('lat');
    const lng: number | undefined = generalConf.get('lng');
    const minPrice: number | undefined = generalConf.get('minPrice');
    const maxPrice: number | undefined = generalConf.get('maxPrice');
    const generalConfInfo = `
      nearStation: ${generalConf.get('nearStation')},
      latLng: ${lat},${lng},
      priceRange: ${minPrice} ~ ${maxPrice},
      searchStoreRange: ${generalConf.get('searchStoreRange')}
    `;
    vscode.window.showInformationMessage(generalConfInfo);
  });
}