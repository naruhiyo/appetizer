/**
 * PlaceAPI検索用のパラメーター
 */
export type HeartRailsExpressForm = {
  method: string;
  name: string;
  prefecture: string;
};

export class HeartRailsExpressFormImpl {
  private method: string = '';
  private name: string = '';
  private prefecture: string = '';

  public static newFromGet(prefecture: string, stationName: string) : HeartRailsExpressFormImpl {
    const form = new HeartRailsExpressFormImpl();
    form.method = 'getStations';
    form.prefecture = prefecture;
    form.name = stationName;
    return form;
  }

  /**
   * バリデーション
   * @returns Boolean
   */
  public isValid() : Boolean {
    if (this.method.length < 1 || this.method === null || this.method === undefined) {
      return false;
    }

    if (this.prefecture.length < 1 || this.prefecture === null || this.prefecture === undefined) {
      return false;
    }

    if (this.name.length < 1 || this.name === null || this.name === undefined) {
      return false;
    }

    return true;
  }

  public toApi() : HeartRailsExpressForm {
    return {
      method: this.method,
      prefecture: this.prefecture,
      name: this.name
    };
  }
}
