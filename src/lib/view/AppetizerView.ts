/* eslint-disable @typescript-eslint/naming-convention */
import { ViewBuilderImpl } from "./ViewBuilder";
import * as vscode from "vscode";
import appetizerTemplate from "./appetizer.template.html";
import appetizerStyle from "./appetizer.scss";
import { HotpepperShopImpl, HotpepperShop } from "../model/HotpepperShopModel";

const sample: Array<HotpepperShop> = [
  {
    access: "大崎駅 西口徒歩1分",
    budget: {
      average: "3800円（通常平均）4000円（宴会平均）",
      name: "4001～5000円",
    },
    close: "年末年始",
    genre: "焼肉・ホルモン",
    name: "焼肉ホルモン BEBU屋 大崎店",
    open:
      "月～日、祝日、祝前日: 11:00～15:00 （料理L.O. 14:00）17:00～23:00 （料理L.O. 22:00 ドリンクL.O. 22:30）",
    photo: "https://imgfp.hotp.jp/IMGH/26/87/P025502687/P025502687_238.jpg",
    station: "大崎",
    url: "https://www.hotpepper.jp/strJ001155182/?vos=nhppalsa000016",
  },
  {
    access: "大崎駅 西口徒歩1分",
    budget: {
      average: "3800円（通常平均）4000円（宴会平均）",
      name: "4001～5000円",
    },
    close: "年末年始",
    genre: "焼肉・ホルモン",
    name: "焼肉ホルモン BEBU屋 大崎店",
    open:
      "月～日、祝日、祝前日: 11:00～15:00 （料理L.O. 14:00）17:00～23:00 （料理L.O. 22:00 ドリンクL.O. 22:30）",
    photo: "https://imgfp.hotp.jp/IMGH/26/87/P025502687/P025502687_238.jpg",
    station: "大崎",
    url: "https://www.hotpepper.jp/strJ001155182/?vos=nhppalsa000016",
  },
];

export class AppetizerView extends ViewBuilderImpl {
  private static VIEW_TYPE: string = "showAppetizer";
  private static TITLE: string = "Show Appetizer!";

  constructor() {
    super(AppetizerView.VIEW_TYPE, AppetizerView.TITLE, vscode.ViewColumn.One, {
      // Enable javascript in the webview
      enableScripts: true,
      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [],
    });
  }

  buildHtml(): void {
    const template = appetizerTemplate;
    const css = appetizerStyle;

    // CSSをHTMLに埋め込み
    this.html = template.replace(/styleYield/i, `<style>${css}</style>`);
  }

  injectComponent(responseModel: HotpepperShopImpl): void {
    // const shopList: string = responseModel.shopList.map(
    const body: string = sample
      .map(
        (shop: HotpepperShop): string =>
          `<div class="appetizer-field card">
            <div class="card-img"><img src="${shop.photo}" alt="sample-img" /></div>
            <div class="card-title">${shop.name}</div>
            <div class="card-body">
              ${shop.genre}
            </div>
            <div class="card-footer">
              <a href="${shop.url}" target="_blank">To shop</a>
            </div>
        </div>`
      )
      .join("");

    this.html = this.html.replace(/bodyYield/i, body);
  }
}
