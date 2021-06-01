import { HotpepperShopImpl } from "../model/HotpepperShopModel";
import { GeneralConfigImpl, GeneralConfig } from "../model/GeneralConfigModel";
import { HotpepperApi } from "../api/HotpepperApi";
import { HeartRailsExpressApi } from "../api/HeartRailsExpressApi";
import { HeartRailsExpressFormImpl } from "../api/HeartRailsExpressForm";
import { HeartRailsExpressStationImpl } from "../model/HeartRailsExpressStationModel";
import { HotpepperApiForm } from "../api/HotpepperApiForm";

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

  public async getAppetizer(): Promise<HotpepperShopImpl | null> {
    const params: HotpepperApiForm = {
      lat: 0,
      lng: 0
    };

    if (this.inJapanLatLng()) {
      // configから緯度経度を取得
      params.lat = this.generalConf.latLng.lat;
      params.lng = this.generalConf.latLng.lat;
    } else {
      // configから駅名と県名を取得
      const prefecture: string = this.generalConf.prefecture;
      const stationName: string = this.generalConf.nearStation;

      // APIから緯度経度を取得
      const form: HeartRailsExpressFormImpl = HeartRailsExpressFormImpl.newFromGet(prefecture, stationName);
      const response: HeartRailsExpressStationImpl | null = await this.heartRailsExpressApi.getStation(form.toApi());

      if (response === null) {
        return null;
      }

      params.lat = response.getLat();
      params.lng = response.getLng();
    }

    // API call
    const responseData: HotpepperShopImpl | null = await this.hotpepperApi.searchShops(params);

    if (responseData === null) {
      return null;
    }

    return responseData;
  }

  // 日本国内に緯度経度が設定されているか確認する
  private inJapanLatLng(): Boolean {
    return (
      this.generalConf.latLng.lat >= 20 &&
      this.generalConf.latLng.lat <= 46 &&
      this.generalConf.latLng.lng >= 122 &&
      this.generalConf.latLng.lng <= 154
    );
  }
}
