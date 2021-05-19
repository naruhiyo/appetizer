import { resolve } from "path";
import { config } from "dotenv";
// 型
export type ApiKey = string | undefined;

/**
 * ApiKeyのデータモデル
 */
export class ApiKeyImpl {
  constructor () {
    // .envの読み込み
    const result = config({ path: resolve(__dirname, ".env") });

    if (result.error) {
      throw result.error;
    }
  }

  getHotpepperApiKey () : ApiKey {
    return process.env.HOTPEPPER_API_KEY;
  }

  getGoogleApiKey () : ApiKey {
    return process.env.GOOGLE_API_KEY;
  }
}
