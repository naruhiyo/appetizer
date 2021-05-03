import * as vscode from 'vscode';
import { scheduleJob } from 'node-schedule';
import { HungryTime, HungryTimeImpl, HotpepperApiForm, HotpepperApi, AppetizerView, HotpepperShopImpl } from '../lib';


export function showAppetizer(c: vscode.ExtensionContext): { dispose: any } {
  const APPETIZER_BUTTON = 'Yes!';
  const WELLCOME_MESSAGE = 'An appetizer has come! Am I hungry?';
  const NEXT_TIME = 'See you next time.';
  const API_ERROR = 'Sorry, I don\'t get appetizer.';

  // get config
  const hungryTimeImpl: HungryTimeImpl = new HungryTimeImpl();
  const hungryTime: HungryTime = hungryTimeImpl.getHungryTime();

  // get view
  const appetizerView: AppetizerView = new AppetizerView();
  appetizerView.buildHtml();

  const params: HotpepperApiForm = {
    lat: 35.6198513,
    lng: 139.7281892,
  };

  // API
  const hotpepperApi: HotpepperApi = new HotpepperApi();

  // set timer
  scheduleJob(hungryTime!, async () => {
    const selection = await vscode.window.showInformationMessage(WELLCOME_MESSAGE, APPETIZER_BUTTON);

    // API call
    // const responseData: Object | null = await hotpepperApi.searchShops(params);

    // create response model
    // const hotpepperShopImpl: HotpepperShopImpl = HotpepperShopImpl.newFromApiResponse(responseData);

    if (selection !== APPETIZER_BUTTON) {
      return vscode.window.showInformationMessage(NEXT_TIME);
    }

    // if (responseData === null) {
    //   return vscode.window.showErrorMessage(API_ERROR);
    // }

    const hoge: any = {};
    // create component
    await appetizerView.injectComponent(hoge);

    // open web view
    await appetizerView.createWebViewPanel();
  });

  // 何も返さない
  return {
    dispose: null
  };
}
