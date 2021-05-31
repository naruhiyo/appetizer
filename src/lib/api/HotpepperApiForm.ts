import { BudgetList } from "../../lib/model/HotpepperBudgetModel";

/**
 * Hot Pepper API検索用のパラメーター
 */
export type HotpepperApiForm = {
  budget: string | null | undefined,
  lat: number | null | undefined,
  lng: number | null | undefined,
  count: number,
};

// ToDo:
//       - 100個取得して、そこからランダムに4個選択する
export class HotpepperApiFormImpl {
  private apiForm: Array<HotpepperApiForm>;
  private budgetMin: number = 0;
  private budgetMax: number = 0;
  private lat: number = 0;
  private lng: number = 0;

  constructor() {
    this.apiForm = [];
  }

  public static newFromConfig(budgetMin: number, budgetMax: number, lat: number, lng: number): HotpepperApiFormImpl {
    const hotpepperApiFormImpl: HotpepperApiFormImpl = new HotpepperApiFormImpl();
    hotpepperApiFormImpl.budgetMin = budgetMin;
    hotpepperApiFormImpl.budgetMax = budgetMax;
    hotpepperApiFormImpl.lat = lat;
    hotpepperApiFormImpl.lng = lng;
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
