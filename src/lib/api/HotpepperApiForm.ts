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

  constructor() {
    this.apiForm = [];
  }

  public getApiForm() {
    return this.apiForm;
  }

  public static newFromConfig(budgetMin: number, budgetMax: number, lat: number, lng: number): HotpepperApiFormImpl {
    const hotpepperApiFormImpl: HotpepperApiFormImpl = new HotpepperApiFormImpl();
    const matchedBudget = BudgetList.filter(budget => {
      return budgetMin <= budget.cap && budget.floor <= budgetMax;
    });
    console.log('matchedBudget:', matchedBudget);
    const countMax = 100;
    const count = Math.floor(countMax / matchedBudget.length);
    hotpepperApiFormImpl.apiForm = matchedBudget.map(budget => {
      return {
        budget: budget.code,
        lat: lat,
        lng: lng,
        count: count,
      }
    });
    return hotpepperApiFormImpl;
  }
}
