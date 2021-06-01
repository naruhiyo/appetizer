import { ApiKeyImpl } from "../model/ApiKeyModel";
import { HotpepperShopImpl } from "../model/HotpepperShopModel";
import axios from "axios";
import { HotpepperApiForm } from "./HotpepperApiForm";

export class HotpepperApi {
  private HOTPEPPER_API_ENDPOINT: string =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1";
  private apiKey: string;
  private FORMAT = "json";

  constructor() {
    // get API key
    const apiKeyImpl: ApiKeyImpl = new ApiKeyImpl();
    this.apiKey = apiKeyImpl.getHotpepperApiKey() as string;
  }

  public async searchShop(hotpepperApiParams: HotpepperApiForm): Promise<HotpepperShopImpl | null> {
    // execute api
    try {
      const response = await axios.get(this.HOTPEPPER_API_ENDPOINT, {
        params: {
          key: this.apiKey,
          format: this.FORMAT,
          ...hotpepperApiParams,
        },
      });

      return HotpepperShopImpl.newFromApiResponse(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  searchMap() {}
}
