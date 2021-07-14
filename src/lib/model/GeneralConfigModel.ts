import { WorkspaceConfiguration } from 'vscode';
import { ConfigurationReader } from './ConfigurationReader';

// 型
export type GeneralConfig = {
  prefecture: string;
  nearStation: string;
  minPrice: number;
  maxPrice: number;
  searchStoreRange: number;
};

/**
 * 共通Configのデータモデル
 */
export class GeneralConfigImpl {
  private NG_WORD = '駅';
  private generalConf: WorkspaceConfiguration;

  constructor () {
    const configurationReader: ConfigurationReader = new ConfigurationReader();
    this.generalConf = configurationReader.getGeneralConf();
  }

  getGeneralConf () : GeneralConfig {
    // 駅名に`駅`が含まれる場合取り除く（HeartRails APIが許容していないため）
    let nearStation: string = this.generalConf.get('nearStation')!;

    if (nearStation.endsWith(this.NG_WORD)) {
      // 末尾一文字を削除
      nearStation = nearStation.slice(0, -1);
    }

    return {
      prefecture: this.generalConf.get('prefecture')!,
      nearStation: nearStation,
      minPrice: this.generalConf.get('minPrice')!,
      maxPrice: this.generalConf.get('maxPrice')!,
      searchStoreRange: this.generalConf.get('searchStoreRange')!
    };
  }
}
