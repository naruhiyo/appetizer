export class HotpepperShopResponseListImpl {
  private responseData: any;

  public static async newFromResponse(responseData: any){
    const hotpepperShopResponseListImpl:HotpepperShopResponseListImpl = new HotpepperShopResponseListImpl();
    hotpepperShopResponseListImpl.responseData = responseData;
    return hotpepperShopResponseListImpl;
  }

  public async selectShops(): Promise<Object | null>{
    try {
      // TODO: Hotpepper APIを採用していく場合は型を用意してレスポンスを解析する
      let selectedShops = this.responseData.then((responses: Iterable<any> | ArrayLike<any>) => {
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

}
