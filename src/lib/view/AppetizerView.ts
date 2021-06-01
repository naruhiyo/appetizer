/* eslint-disable @typescript-eslint/naming-convention */
import { ViewBuilderImpl } from "./ViewBuilder";
import * as vscode from "vscode";
import appetizerTemplate from "./appetizer.template.html";
import appetizerStyle from "./appetizer.scss";
import { HotpepperShop } from "../model/HotpepperShopModel";

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

  injectComponent(shopList: Array<HotpepperShop>): void {
    const body: string = shopList.map(
        (shop: HotpepperShop): string =>
          `<div class="appetizer-field card">
            <div class="card-img"><img src="${shop.photo}" alt="sample-img" /></div>
            <div class="card-title">
              <span class="shop-genre">${shop.genre}</span>
              <span class="shop-budge-badge">${shop.budget.name}</span>
            </div>
            <div class="card-body">
              <span class="shop-name">${shop.name}</span>
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
