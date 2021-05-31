import { BudgetList } from "../../lib/model/HotpepperBudgetModel";
import { GeneralConfigImpl, GeneralConfig } from '../../lib';

/**
 * Hot Pepper API検索用のパラメーター
 */
export type HotpepperApiForm = {
  budget: string | null | undefined,
  lat: number | null | undefined,
  lng: number | null | undefined,
  count: number,
};

export class HotpepperApiFormImpl {
  private apiForm: Array<HotpepperApiForm>;
  private budgetMin: number = 0;
  private budgetMax: number = 0;
  private lat: number | null | undefined = 0;
  private lng: number | null | undefined = 0;

  constructor() {
    this.apiForm = [];
  }

  public static newFromConfig(): HotpepperApiFormImpl {
    const hotpepperApiFormImpl: HotpepperApiFormImpl = new HotpepperApiFormImpl();
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    const priceRange = generalConf.priceRange?.sort();
    hotpepperApiFormImpl.budgetMin = priceRange === undefined ? 0 : priceRange[0];
    hotpepperApiFormImpl.budgetMax = priceRange === undefined ? hotpepperApiFormImpl.budgetMin : priceRange[1];
    hotpepperApiFormImpl.lat = generalConf.latLng.lat;
    hotpepperApiFormImpl.lng = generalConf.latLng.lng;
    return hotpepperApiFormImpl;
  }

  public toApi(): Array<HotpepperApiForm> {
    const matchedBudget = BudgetList.filter(budget => {
      return this.budgetMin <= budget.cap && budget.floor <= this.budgetMax;
    });
    console.log('matchedBudget:', matchedBudget);
    const countMax = 100;
    const count = Math.floor(countMax / matchedBudget.length);
    this.apiForm = matchedBudget.map(budget => {
      return {
        budget: budget.code,
        lat: this.lat,
        lng: this.lng,
        count: count,
      }
    });
    return this.apiForm;
  }
}
