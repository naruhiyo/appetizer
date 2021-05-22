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

  public toApi() : HeartRailsExpressForm {
    return {
      method: this.method,
      prefecture: this.prefecture,
      name: this.name
    };
  }
}
