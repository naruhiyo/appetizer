import { WorkspaceConfiguration } from 'vscode';
import { ConfigurationReader } from './ConfigurationReader';

// 型
export type HungryTime = string | null | undefined;

/**
 * ApiKeyのデータモデル
 */
export class HungryTimeImpl {
  private scheduleConf: WorkspaceConfiguration;

  constructor () {
    const configurationReader: ConfigurationReader = new ConfigurationReader();
    this.scheduleConf = configurationReader.getScheduleConf();
  }

  getHungryTime () : HungryTime {
    return this.scheduleConf.get('hungryTime');
  }
}
