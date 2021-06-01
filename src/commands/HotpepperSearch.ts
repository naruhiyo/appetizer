import * as vscode from 'vscode';
import { HotpepperApi } from '../lib/api/HotpepperApi';
import { HotpepperApiForm, HotpepperApiFormImpl } from '../lib/api/HotpepperApiForm';
import { HotpepperShopResponseListImpl } from "../lib/model/HotpepperShopResponseList";

export function searchHotpepper(c: vscode.ExtensionContext): { dispose: any } {
  // api
  const hotpepperApi: HotpepperApi = new HotpepperApi();

  return vscode.commands.registerCommand('appetizer.searchHotpepper', async () => {
    const hotpepperApiFormImpl = HotpepperApiFormImpl.newFromConfig();

    // API call
    const hotpepperApiParamsList = hotpepperApiFormImpl.toApi();
    const responseData = await Promise.all(hotpepperApiParamsList.map(param => hotpepperApi.searchShop(param)));
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
