import * as vscode from 'vscode';
import { GoogleApi, GeneralConfigImpl, GeneralConfig, GooglePlaceApiForm } from '../lib';

export function searchGoogle(c: vscode.ExtensionContext): { dispose: any } {
  // api
  const googleApi: GoogleApi = new GoogleApi();

  return vscode.commands.registerCommand('appetizer.searchGoogle', async () => {
    // config
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    const params: GooglePlaceApiForm = {
      // location: `${generalConf.latLng.lat},${generalConf.latLng.lng}`,
      location: `1,1`,
      radious: 300,
      language: 'ja',
      types: 'restaurant'
    };

    // API call
    const responseData = await googleApi.searchPlaces(params);

    if (responseData !== null) {
      // TODO: Google APIを採用していく場合は型を用意してレスポンスを解析する
      console.log(responseData);
      vscode.window.showInformationMessage(responseData.toString());
    } else {
      vscode.window.showInformationMessage('API error');
    }
  });
}
