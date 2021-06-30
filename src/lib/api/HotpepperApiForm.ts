import { BudgetList, Budget } from "../../lib/model/HotpepperBudgetModel";
import { GeneralConfigImpl, GeneralConfig } from "../../lib";

/**
 * Hot Pepper API検索用のパラメーター
 */
export type HotpepperApiForm = {
  budget: string;
  lat: number;
  lng: number;
  count: number;
};

export class HotpepperApiFormImpl {
  public apiForm: Array<HotpepperApiForm>;
  public budgetMin: number = 0;
  public budgetMax: number = 0;
  public lat: number = 0;
  public lng: number = 0;

  constructor() {
    this.apiForm = [];
  }

  public static newFromConfig(): HotpepperApiFormImpl {
    const hotpepperApiFormImpl: HotpepperApiFormImpl =
      new HotpepperApiFormImpl();
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    hotpepperApiFormImpl.budgetMin = generalConf.minPrice;
    hotpepperApiFormImpl.budgetMax = generalConf.maxPrice;
    return hotpepperApiFormImpl;
  }

  /**
   * バリデーション
   * @returns Boolean
   */
  public isValid(): Boolean {
    if (this.budgetMax < 0 || this.budgetMax === null || this.budgetMax === undefined) {
      return false;
    }

    if (this.budgetMin < 0 || this.budgetMin === null || this.budgetMin === undefined) {
      return false;
    }

    if (this.budgetMax < this.budgetMin) {
      return false;
    }

    if (this.lat === null || this.lat === undefined) {
      return false;
    }

    if (this.lng === null || this.lng === undefined) {
      return false;
    }

    if (!this.inJapanLatLng(this.lat, this.lng)) {
      return false;
    }

    return true;
  }

  /**
   * ApiForm用のバリデーション
   * @returns Boolean
   */
  public isValidForApiForm(): Boolean {
    const _this: HotpepperApiFormImpl = this;
    const validResults: Array<Boolean> = this.apiForm.map((form) => {
      if (form.count < 0 || form.count === null || form.count === undefined) {
        return false;
      }

      if (form.lat === null || form.lat === undefined) {
        return false;
      }

      if (form.lng === null || form.lng === undefined) {
        return false;
      }

      if (!_this.inJapanLatLng(form.lat, form.lng)) {
        return false;
      }

      if (form.budget.length < 1 || form.budget === null || form.budget === undefined) {
        return false;
      }

      return true;
    });

    // falseが一つでも含まれていたら不正なためfalseをreturnさせる
    return !validResults.includes(false);
  }
  public setLatLng(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  public setApiForm(): void {
    const matchedBudget = BudgetList.filter((budget: Budget) => {
      return this.budgetMin <= budget.cap && budget.floor <= this.budgetMax;
    });
    const countMax = 100;
    const count = Math.floor(countMax / matchedBudget.length);
    this.apiForm = matchedBudget.map((budget: Budget) => {
      return {
        budget: budget.code,
        lat: this.lat,
        lng: this.lng,
        count: count,
      };
    });
    return;
  }

  public toApi(): Array<HotpepperApiForm> {
    return this.apiForm;
  }

  // 日本国内に緯度経度が設定されているか確認する
  private inJapanLatLng(lat: number, lng: number): Boolean {
    return (
      20 <= lat && lat <= 46 && 122 <= lng && lng <= 154
    );
  }
}
