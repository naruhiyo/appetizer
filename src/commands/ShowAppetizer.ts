import * as vscode from "vscode";
import { scheduleJob } from "node-schedule";
import {
  HungryTime,
  HungryTimeImpl,
  AppetizerView,
  AppetizerService,
  HotpepperShopImpl
} from "../lib";

export function showAppetizer(c: vscode.ExtensionContext): { dispose: any } {
  const APPETIZER_BUTTON = "Yes!";
  const WELLCOME_MESSAGE = "An appetizer has come! Am I hungry?";
  const NEXT_TIME = "See you next time.";

  // get config
  const hungryTime: HungryTime = HungryTimeImpl.getHungryTime();
  // get view
  const appetizerView: AppetizerView = new AppetizerView();
  // get service
  const service: AppetizerService = new AppetizerService();

  // set timer
  scheduleJob(hungryTime!, async () => {
    // API call
    const response: Object | null = await service.getAppetizer();

    if (response === null) {
      return;
    }

    const selection = await vscode.window.showInformationMessage(
      WELLCOME_MESSAGE,
      APPETIZER_BUTTON
    );

    if (selection !== APPETIZER_BUTTON) {
      return vscode.window.showInformationMessage(NEXT_TIME);
    }

    // create html
    await appetizerView.buildHtml(); 
    // create component
    await appetizerView.injectComponent(response);
    // open web view
    await appetizerView.createWebViewPanel();
  });

  // 何も返さない
  return {
    dispose: null,
  };
}
