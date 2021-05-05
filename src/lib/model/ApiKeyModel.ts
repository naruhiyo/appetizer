import { WorkspaceConfiguration } from 'vscode';
import { ConfigurationReader } from './ConfigurationReader';

// 型
export type ApiKey = string | null | undefined;

/**
 * ApiKeyのデータモデル
 */
export class ApiKeyImpl {
  private apiKeyConf: WorkspaceConfiguration;

  constructor () {
    const configurationReader: ConfigurationReader = new ConfigurationReader();
    this.apiKeyConf = configurationReader.getApiKeyConf();
  }

  getHotpepperApiKey () : ApiKey {
    return this.apiKeyConf.get('hotpepperApiKey');
  }

  getGoogleApiKey () : ApiKey {
    return this.apiKeyConf.get('googleApiKey');
  }
}
