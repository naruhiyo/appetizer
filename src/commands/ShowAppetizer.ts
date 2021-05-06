import * as vscode from "vscode";
import { scheduleJob } from "node-schedule";
import {
  HungryTime,
  HungryTimeImpl,
  HotpepperApiForm,
  HotpepperApi,
  AppetizerView,
} from "../lib";

export function showAppetizer(c: vscode.ExtensionContext): { dispose: any } {
  const APPETIZER_BUTTON = "Yes!";
  const WELLCOME_MESSAGE = "An appetizer has come! Am I hungry?";
  const NEXT_TIME = "See you next time.";

  // get config
  const hungryTime: HungryTime = HungryTimeImpl.getHungryTime();

  // get view
  const appetizerView: AppetizerView = new AppetizerView();
  appetizerView.buildHtml();

  const params: HotpepperApiForm = {
    budget: "B001",
    lat: 35.6198513,
    lng: 139.7281892,
  };

  // API
  const hotpepperApi: HotpepperApi = new HotpepperApi();

  // set timer
  scheduleJob(hungryTime!, async () => {
    // API call
    // const responseData: Object | null = await hotpepperApi.searchShops(params);

    // if (responseData === null) {
    //   return;
    // }

    const selection = await vscode.window.showInformationMessage(
      WELLCOME_MESSAGE,
      APPETIZER_BUTTON
    );

    if (selection !== APPETIZER_BUTTON) {
      return vscode.window.showInformationMessage(NEXT_TIME);
    }

    const hoge: any = {};
    // create component
    await appetizerView.injectComponent(hoge);

    // open web view
    await appetizerView.createWebViewPanel();
  });

  // 何も返さない
  return {
    dispose: null,
  };
}
