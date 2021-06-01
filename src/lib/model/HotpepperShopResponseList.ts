import { HotpepperShop, HotpepperShopImpl } from "./HotpepperShopModel";

export class HotpepperShopResponseListImpl {
  private SELECTED_NUM = 4;
  private hotpepperShopImplList: Array<HotpepperShopImpl | null> = [];

  public static async newFromResponse(hotpepperShopImplList: Array<HotpepperShopImpl | null>){
    const hotpepperShopResponseListImpl:HotpepperShopResponseListImpl = new HotpepperShopResponseListImpl();
    hotpepperShopResponseListImpl.hotpepperShopImplList = hotpepperShopImplList;
    return hotpepperShopResponseListImpl;
  }

  public async selectShops(): Promise<Array<HotpepperShop>> {
    // 全ての料理情報(店舗情報)を一つの配列に統合する
    let mergedShopList: Array<HotpepperShop> = [];
    await this.hotpepperShopImplList.forEach(async (hotpepperShopImpl: HotpepperShopImpl | null) => {
      if (hotpepperShopImpl === null) {return;}
      await hotpepperShopImpl.shopList.forEach(shop => mergedShopList.push(shop));
    });

    // 統合結果が既に4件以下だった場合そのまま配列を返す
    if (mergedShopList.length < this.SELECTED_NUM) {
      return mergedShopList;
    }

    // 統合した配列の中からランダムに4件抽出する
    const selectedResponses: Array<HotpepperShop> = [...Array(this.SELECTED_NUM)].map((): HotpepperShop => {
      const randomIndex: number = Math.floor(Math.random() * mergedShopList.length);
      return mergedShopList.splice(randomIndex, 1)[0];
    });

    return selectedResponses;
  }

}
