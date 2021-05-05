import { URL, URLSearchParams } from "url";
import { ApiKeyImpl, ApiKey } from "../model/ApiKeyModel";
import axios from "axios";
import * as vscode from "vscode";
import { HotpepperApiForm } from "./HotpepperApiForm";

export class HotpepperApi {
  private HOTPEPPER_API_ENDPOINT: string =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1";
  private apiKey: string;
  private FORMAT = 'json';

  constructor() {
    // get API key
    const apiKeyImpl: ApiKeyImpl = new ApiKeyImpl();
    this.apiKey = apiKeyImpl.getHotpepperApiKey() as string;
  }

  async searchShops(hotpepperApiParams: HotpepperApiForm): Promise<Object | null> {
    // execute api
    try {
      const response = await axios.get(this.HOTPEPPER_API_ENDPOINT, {
        params: {
          key: this.apiKey,
          format: this.FORMAT,
          ...hotpepperApiParams
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  searchMap() {}
}
