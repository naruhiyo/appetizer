import * as vscode from 'vscode';
import { HotpepperApi } from '../lib/HotPepperApi';
import { HotpepperApiForm } from '../lib/HotPepperApiForm';
import { GeneralConfigImpl, GeneralConfig } from '../lib';

export function searchHotpepper(c: vscode.ExtensionContext): { dispose: any } {
  // api
  const hotpepperApi: HotpepperApi = new HotpepperApi();

  return vscode.commands.registerCommand('appetizer.searchHotpepper', async () => {
    // config
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    const params: HotpepperApiForm = {
      // lat: generalConf.latLng.lat,
      // lng: generalConf.latLng.lng,
      lat: 35.6198513,
      lng: 139.7281892,
    };
    console.log(params);

    // API call
    const responseData = await hotpepperApi.searchShops(params);

    if (responseData !== null) {
      // TODO: Hotpepper APIを採用していく場合は型を用意してレスポンスを解析する
      console.log(responseData);
      vscode.window.showInformationMessage(responseData.toString());
    } else {
      vscode.window.showInformationMessage('API error');
    }
  });
}
