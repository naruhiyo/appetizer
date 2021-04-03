import{ WorkspaceConfiguration, workspace } from 'vscode';

/**
 * Configurationの管理モデル
 */
export class ConfigurationReader {
  private apiKeyConf: WorkspaceConfiguration;
  private generalConf: WorkspaceConfiguration;

  constructor () {
    this.apiKeyConf = workspace.getConfiguration('appetizerConf.apiKey');
    this.generalConf = workspace.getConfiguration('appetizerConf.general');
  }

  getApiKeyConf () : WorkspaceConfiguration {
    return this.apiKeyConf;
  }

  getGeneralConf () : WorkspaceConfiguration {
    return this.generalConf;
  }
}
