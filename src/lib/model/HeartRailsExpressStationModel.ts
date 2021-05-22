export class HeartRailsExpressStationImpl {
  private name: string = '';
  private lat: number = 0;
  private lng: number = 0;

  // REMARK: anyじゃないとオブジェクトにアクセスできない
  public static newFromApiResponse(apiResponseData: any): HeartRailsExpressStationImpl {
    const heartRailsExpressStationImpl: HeartRailsExpressStationImpl = new HeartRailsExpressStationImpl();

    // 駅の緯度経度はどのレスポンスも同一のため最初の一件目だけ取得する
    const station = apiResponseData["response"]["station"][0];
    heartRailsExpressStationImpl.name = station["name"];
    heartRailsExpressStationImpl.lat = station["y"];
    heartRailsExpressStationImpl.lng = station["x"];
    return heartRailsExpressStationImpl;
  }

  public getName(): string {
    return this.name;
  }

  public getLat(): number {
    return this.lat;
  }

  public getLng(): number {
    return this.lng;
  }
}
