import * as vscode from "vscode";
import { scheduleJob } from "node-schedule";
import {
  HungryTime,
  HungryTimeImpl,
  AppetizerView,
  AppetizerService,
  HotpepperShop,
  I18nConverter
} from "../lib";

export function showAppetizer(c: vscode.ExtensionContext): { dispose: any } {
  // get i18n
  const vscodeNlsConfig = JSON.parse(process.env.VSCODE_NLS_CONFIG as string);
  const i18nConverter = new I18nConverter(vscodeNlsConfig.locale);

  // get text from i18n
  const WELLCOME_MESSAGE = i18nConverter.localize('appetizer.popup.welcomeMessage');
  const CONTINUE_BUTTON = i18nConverter.localize('appetizer.popup.continueButton');
  const CANCEL_BUTTON = i18nConverter.localize('appetizer.popup.cancelButton');

  // get config
  const hungryTime: HungryTime = HungryTimeImpl.getHungryTime();
  // get view
  const appetizerView: AppetizerView = new AppetizerView();
  // get service
  const service: AppetizerService = new AppetizerService();

  // set timer
  scheduleJob(hungryTime!, async () => {
    // API call
    const shopList: Array<HotpepperShop> | null = await service.getAppetizer();

    if (shopList === null) {
      return;
    }

    const selection = await vscode.window.showInformationMessage(
      WELLCOME_MESSAGE,
      CONTINUE_BUTTON
    );
    if (selection !== CONTINUE_BUTTON) {

      return vscode.window.showInformationMessage(CANCEL_BUTTON);
    }

    // create html
    await appetizerView.buildHtml();
    // create component
    await appetizerView.injectComponent(shopList);
    // open web view
    await appetizerView.createWebViewPanel();
  });

  // 何も返さない
  return {
    dispose: null,
  };
}
