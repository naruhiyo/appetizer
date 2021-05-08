import { resolve } from "path";
import { config } from "dotenv";

// 型
export type HungryTime = string | undefined;

/**
 * ApiKeyのデータモデル
 */
export class HungryTimeImpl {
  constructor () {
    // .envの読み込み
    const result = config({ path: resolve(__dirname, ".env") });

    if (result.error) {
      throw result.error;
    }
  }
  static getHungryTime () : HungryTime {
    return process.env.HUNGRY_TIME;
  }
}
