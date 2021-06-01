type Budget = {
  code: string,
  floor: number,
  cap: number,
};

/**
 * 検索用ディナー予算マスタAPIを叩いて取得した情報
 * code: 検索用ディナー予算コード
 * floor: 下限金額（含む）
 * cap: 上限金額（含む）
 */
export const BudgetList: Array<Budget> = [
  {
    code: "B009",
    floor: 0,
    cap: 500,
  },
  {
    code: "B010",
    floor: 501,
    cap: 1000,
  },
  {
    code: "B011",
    floor: 1001,
    cap: 1500,
  },
  {
    code: "B001",
    floor: 1501,
    cap: 2000,
  },
  {
    code: "B002",
    floor: 2001,
    cap: 3000,
  },
  {
    code: "B003",
    floor: 3001,
    cap: 4000,
  },
  {
    code: "B008",
    floor: 4001,
    cap: 5000,
  },
  {
    code: "B004",
    floor: 5001,
    cap: 7000,
  },
  {
    code: "B005",
    floor: 7001,
    cap: 10000,
  },
  {
    code: "B006",
    floor: 10001,
    cap: 15000,
  },
  {
    code: "B012",
    floor: 15001,
    cap: 20000,
  },
  {
    code: "B013",
    floor: 20001,
    cap: 30000,
  },
  {
    code: "B014",
    floor: 30001,
    cap: Number.MAX_SAFE_INTEGER,
  },
];
