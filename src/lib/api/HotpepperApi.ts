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

  private async searchShop(hotpepperApiParams: HotpepperApiForm): Promise<Object | null> {
    // execute api
    try {
      const response = await axios.get(this.HOTPEPPER_API_ENDPOINT, {
        params: {
          key: this.apiKey,
          format: this.FORMAT,
          ...hotpepperApiParams,
        },
      });

      return response.data.results.shop;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async searchShops(hotpepperApiParamsList: Array<HotpepperApiForm>): Promise<Object | null> {
    // execute api
    try {
      let responseData = Promise.all(hotpepperApiParamsList.map(param => this.searchShop(param)));

        // TODO: Hotpepper APIを採用していく場合は型を用意してレスポンスを解析する
      let selectedShops = responseData.then(responses => {
          let nestedResponses: Array<any> = Array.from(responses);
          let flattenedResponses = [].concat.apply([],nestedResponses);
          console.log('Num of all response data:', flattenedResponses.length);
          const selectedNum = 4;
          const selectedResponses = [...Array(selectedNum)].map(() =>
            flattenedResponses.splice(Math.floor(Math.random() * flattenedResponses.length), 1)[0]);
          console.log('Num of selected data:', selectedResponses.length);
          return selectedResponses;
        });
      return selectedShops;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  searchMap() {}
}
