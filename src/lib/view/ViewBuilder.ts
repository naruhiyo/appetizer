import * as vscode from "vscode";
import { HotpepperShop } from '../model/HotpepperShopModel';

export interface ViewBuilder {
  buildHtml(): void;
  injectComponent(shopList: Array<HotpepperShop>): void;
  createWebViewPanel(): vscode.WebviewPanel;
}

export abstract class ViewBuilderImpl implements ViewBuilder {
  protected viewType: string;
  protected title: string;
  protected showOptions:
    | vscode.ViewColumn
    | {
        viewColumn: vscode.ViewColumn;
        preserveFocus?: boolean | undefined;
      };
  protected options?:
    | (vscode.WebviewPanelOptions & vscode.WebviewOptions)
    | undefined;
  protected html: string = '';

  constructor(
    viewType: string,
    title: string,
    showOptions:
      | vscode.ViewColumn
      | {
          viewColumn: vscode.ViewColumn;
          preserveFocus?: boolean | undefined;
        },
    options?: (vscode.WebviewPanelOptions & vscode.WebviewOptions) | undefined
  ) {
    this.viewType = viewType;
    this.title = title;
    this.showOptions = showOptions;
    this.options = options;
  }

  buildHtml(): void {
    throw new Error("Method not implemented.");
  }

  injectComponent(shopList: Array<HotpepperShop>): void {
    throw new Error("Method not implemented.");
  }

  createWebViewPanel(): vscode.WebviewPanel {
    const panel = vscode.window.createWebviewPanel(
      this.viewType,
      this.title,
      this.showOptions,
      this.options
    );
    panel.webview.html = this.html;
    return panel;
  }
}
