import { HotpepperShop, HotpepperShopImpl } from "../model/HotpepperShopModel";
import { GeneralConfigImpl, GeneralConfig } from "../model/GeneralConfigModel";
import { HotpepperApi } from "../api/HotpepperApi";
import { HeartRailsExpressApi } from "../api/HeartRailsExpressApi";
import { HeartRailsExpressFormImpl } from "../api/HeartRailsExpressForm";
import { HeartRailsExpressStationImpl } from "../model/HeartRailsExpressStationModel";
import { HotpepperApiForm, HotpepperApiFormImpl } from "../api/HotpepperApiForm";
import { HotpepperShopResponseListImpl } from "../model/HotpepperShopResponseList";

export class AppetizerService {
  private generalConf: GeneralConfig;
  private hotpepperApi: HotpepperApi;
  private heartRailsExpressApi: HeartRailsExpressApi;

  constructor() {
    // get config
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    this.generalConf = generalConfigImpl.getGeneralConf();

    // API
    this.hotpepperApi = new HotpepperApi();
    this.heartRailsExpressApi = new HeartRailsExpressApi();
  }

  public async getAppetizer(): Promise<Array<HotpepperShop> | null> {
    const hotpepperApiFormImpl: HotpepperApiFormImpl = HotpepperApiFormImpl.newFromConfig();

    if (!this.inJapanLatLng(hotpepperApiFormImpl.lat, hotpepperApiFormImpl.lng)) {
      // 日本国内で緯度経度が定義されていなければ、configから駅名と県名を取得
      const prefecture: string = this.generalConf.prefecture;
      const stationName: string = this.generalConf.nearStation;

      // APIから緯度経度を取得
      const heartRailsExpressFormImpl: HeartRailsExpressFormImpl = HeartRailsExpressFormImpl.newFromGet(prefecture, stationName);
      const stationResponse: HeartRailsExpressStationImpl | null = await this.heartRailsExpressApi.getStation(heartRailsExpressFormImpl.toApi());

      if (stationResponse === null) {
        return null;
      }

      hotpepperApiFormImpl.lat = stationResponse.getLat();
      hotpepperApiFormImpl.lng = stationResponse.getLng();
    }

    // API call
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

  // 日本国内に緯度経度が設定されているか確認する
  private inJapanLatLng(lat: number, lng: number): Boolean {
    return (20 <= lat && lat <= 46) && (122 <= lng && lng <= 154);
  }
}
