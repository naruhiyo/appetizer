import{ WorkspaceConfiguration, workspace } from 'vscode';

/**
 * Configurationの管理モデル
 */
export class ConfigurationReader {
  private generalConf: WorkspaceConfiguration;

  constructor () {
    this.generalConf = workspace.getConfiguration('appetizerConf.general');
  }

  getGeneralConf () : WorkspaceConfiguration {
    return this.generalConf;
  }
}
