export type HotpepperShop = {
  access: string;
  budget: {
    average: string;
    name: string;
  };
  close: string;
  genre: string; // genre.name
  name: string;
  open: string;
  photo: string; // photo.pc.l
  station: string; // station_name
  url: string; // urls.pc
};

export class HotpepperShopImpl {
  shopList: Array<HotpepperShop>;

  constructor() {
    this.shopList = [];
  }

  // REMARK: anyじゃないとオブジェクトにアクセスできない
  public static newFromApiResponse(apiResponseData: any): HotpepperShopImpl {
    const hotpepperShopImpl: HotpepperShopImpl = new HotpepperShopImpl();

    // レスポンスは公式ドキュメントを参照すること
    const shopList = apiResponseData["results"]["shop"];
    hotpepperShopImpl.shopList = shopList.map((shop: any): HotpepperShop => {
      return {
        access: shop['access'],
        budget: {
          average: shop['budget']['average'],
          name: shop['budget']['name'],
        },
        close: shop['close'],
        genre: shop['genre']['name'],
        name: shop['name'],
        open: shop['open'],
        photo: shop['photo']['pc']['l'],
        station: shop['station_name'],
        url: shop['urls']['pc'],
      };
    });
    return hotpepperShopImpl;
  }
}
