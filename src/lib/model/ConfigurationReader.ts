import{ WorkspaceConfiguration, workspace } from 'vscode';

/**
 * Configurationの管理モデル
 */
export class ConfigurationReader {
  private apiKeyConf: WorkspaceConfiguration;
  private generalConf: WorkspaceConfiguration;
  private  scheduleConf: WorkspaceConfiguration;

  constructor () {
    this.apiKeyConf = workspace.getConfiguration('appetizerConf.apiKey');
    this.generalConf = workspace.getConfiguration('appetizerConf.general');
    this.scheduleConf = workspace.getConfiguration('appetizerConf.schedule');
  }

  getApiKeyConf () : WorkspaceConfiguration {
    return this.apiKeyConf;
  }

  getGeneralConf () : WorkspaceConfiguration {
    return this.generalConf;
  }

  getScheduleConf () : WorkspaceConfiguration {
    return this.scheduleConf;
  }
}
