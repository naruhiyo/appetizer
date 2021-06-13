import { BudgetList } from "../../lib/model/HotpepperBudgetModel";
import { GeneralConfigImpl, GeneralConfig } from '../../lib';

/**
 * Hot Pepper API検索用のパラメーター
 */
export type HotpepperApiForm = {
  budget: string,
  lat: number,
  lng: number,
  count: number,
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
    const hotpepperApiFormImpl: HotpepperApiFormImpl = new HotpepperApiFormImpl();
    const generalConfigImpl: GeneralConfigImpl = new GeneralConfigImpl();
    const generalConf: GeneralConfig = generalConfigImpl.getGeneralConf();

    // parameter 作成
    hotpepperApiFormImpl.budgetMin = generalConf.minPrice;
    hotpepperApiFormImpl.budgetMax = generalConf.maxPrice;
    return hotpepperApiFormImpl;
  }

  public toApi(): Array<HotpepperApiForm> {
    const matchedBudget = BudgetList.filter(budget => {
      return this.budgetMin <= budget.cap && budget.floor <= this.budgetMax;
    });
    const countMax = 100;
    const count = Math.floor(countMax / matchedBudget.length);
    this.apiForm = matchedBudget.map(budget => {
      return {
        budget: budget.code,
        lat: this.lat,
        lng: this.lng,
        count: count,
      };
    });
    return this.apiForm;
  }
}
