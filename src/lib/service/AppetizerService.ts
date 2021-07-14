import { HotpepperShop, HotpepperShopImpl } from "../model/HotpepperShopModel";
import { GeneralConfigImpl, GeneralConfig } from "../model/GeneralConfigModel";
import { HotpepperApi } from "../api/HotpepperApi";
import { HeartRailsExpressApi } from "../api/HeartRailsExpressApi";
import { HeartRailsExpressFormImpl } from "../api/HeartRailsExpressForm";
import { HeartRailsExpressStationImpl } from "../model/HeartRailsExpressStationModel";
import { HotpepperApiForm, HotpepperApiFormImpl } from "../api/HotpepperApiForm";
import { HotpepperShopResponseListImpl } from "../model/HotpepperShopResponseList";

export class AppetizerService {
  private hotpepperApi: HotpepperApi;
  private heartRailsExpressApi: HeartRailsExpressApi;

  constructor() {
    // API
    this.hotpepperApi = new HotpepperApi();
    this.heartRailsExpressApi = new HeartRailsExpressApi();
  }

  public async getAppetizer(): Promise<Array<HotpepperShop> | null> {
    // 更新されたconfig値を取得させるためgetAppetizer内でconfigを取得する
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    const hotpepperApiFormImpl: HotpepperApiFormImpl = HotpepperApiFormImpl.newFromConfig();

    // formの値が不正な場合、正しい値をHeartRails APIから取得する
    if (!hotpepperApiFormImpl.isValid()) {
      // 日本国内で緯度経度が定義されていなければ、configから駅名と県名を取得
      const prefecture: string = generalConf.prefecture;
      const stationName: string = generalConf.nearStation;

      // APIから緯度経度を取得
      const heartRailsExpressFormImpl: HeartRailsExpressFormImpl = HeartRailsExpressFormImpl.newFromGet(prefecture, stationName);

      // バリデーション
      if (!heartRailsExpressFormImpl.isValid()) {
        return null;
      }

      // HeartRailsAPI呼び出し
      const stationResponse: HeartRailsExpressStationImpl | null = await this.heartRailsExpressApi.getStation(heartRailsExpressFormImpl.toApi());

      if (stationResponse === null) {
        return null;
      }

      // 緯度経度をセット
      hotpepperApiFormImpl.setLatLng(stationResponse.getLat(), stationResponse.getLng());
    }

    // API用のフォームにデータをセット
    hotpepperApiFormImpl.setApiForm();

    // バリデーション
    if (!hotpepperApiFormImpl.isValid() || !hotpepperApiFormImpl.isValidForApiForm()) {
      return null;
    }

    // HotpepperAPI呼び出し
    const hotpepperApiParamsList: Array<HotpepperApiForm> = hotpepperApiFormImpl.toApi();
    const shopListResponse: Array<HotpepperShopImpl | null> = await Promise.all(hotpepperApiParamsList.map(param => this.hotpepperApi.searchShop(param)));

    // 呼び出し結果を一つの配列にマージ
    const hotpepperShopResponseListImpl: HotpepperShopResponseListImpl = await HotpepperShopResponseListImpl.newFromResponse(shopListResponse);
    const selectedShops: Array<HotpepperShop> = await hotpepperShopResponseListImpl.selectShops();

    if (selectedShops.length < 1) {
      return null;
    }

    return selectedShops;
  }
}
