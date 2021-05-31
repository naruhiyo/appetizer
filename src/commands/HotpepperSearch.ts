import * as vscode from 'vscode';
import { HotpepperApi } from '../lib/api/HotpepperApi';
import { HotpepperApiForm, HotpepperApiFormImpl } from '../lib/api/HotpepperApiForm';
import { GeneralConfigImpl, GeneralConfig } from '../lib';
import { prependListener } from 'process';
import { HotpepperShopResponseListImpl } from "../lib/model/HotpepperShopResponseList";

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
    const hotpepperApiFormImpl = HotpepperApiFormImpl.newFromConfig(priceMin, priceMax, lat, lng);

    // API call
    const hotpepperApiParamsList = hotpepperApiFormImpl.toApi();
    const responseData = Promise.all(hotpepperApiParamsList.map(param => hotpepperApi.searchShop(param)));
    const hotpepperShopResponseListImpl = await HotpepperShopResponseListImpl.newFromResponse(responseData);
    const selectedShops = await hotpepperShopResponseListImpl.selectShops();

    if (selectedShops !== null) {
      vscode.window.showInformationMessage('get shops');
      console.log(selectedShops);
    } else {
      vscode.window.showInformationMessage('API error');
    }
  });
}
