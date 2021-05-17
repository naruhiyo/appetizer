import * as vscode from 'vscode';
import { HotpepperApi } from '../lib/api/HotpepperApi';
import { HotpepperApiForm, HotpepperApiFormImpl } from '../lib/api/HotpepperApiForm';
import { GeneralConfigImpl, GeneralConfig } from '../lib';
import { prependListener } from 'process';

export function searchHotpepper(c: vscode.ExtensionContext): { dispose: any } {
  // api
  const hotpepperApi: HotpepperApi = new HotpepperApi();

  return vscode.commands.registerCommand('appetizer.searchHotpepper', async () => {
    // config
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    const priceRange = generalConf.priceRange?.sort();
    const priceMin = priceRange === undefined ? 0 : priceRange[0];
    const priceMax = priceRange === undefined ? 0 : priceRange[1];
    let lat = generalConf.latLng.lat;
    let lng = generalConf.latLng.lng;
    if (lat === undefined || lat === null) {
      vscode.window.showInformationMessage('please set lat');
      return;
    }
    if (lng === undefined || lng === null) {
      vscode.window.showInformationMessage('please set lng');
      return;
    }
    let hotpepperApiFormImpl = HotpepperApiFormImpl.newFromConfig(priceMin, priceMax, lat, lng);

    // API call
    let responseData = Promise.all(hotpepperApiFormImpl.getApiForm().map(param => hotpepperApi.searchShops(param)));

    if (responseData !== null) {
      // TODO: Hotpepper APIを採用していく場合は型を用意してレスポンスを解析する
      responseData.then(responses => {
        let nestedResponses: Array<any> = Array.from(responses);
        let flattenedResponses = [].concat.apply([],nestedResponses);
        console.log(flattenedResponses);
        vscode.window.showInformationMessage(flattenedResponses.toString());
      })
    } else {
      vscode.window.showInformationMessage('API error');
    }
  });
}
