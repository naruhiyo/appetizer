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
    let prefecture: string | undefined = this.generalConf.get('prefecture');
    let nearStation: string | undefined = this.generalConf.get('nearStation');
    let minPrice: number | undefined = this.generalConf.get('minPrice');
    let maxPrice: number | undefined = this.generalConf.get('maxPrice');
    let searchStoreRange: number | undefined = this.generalConf.get('searchStoreRange');

    // undefined型を弾くためにチェック
    if (typeof (prefecture) === 'undefined') {
      prefecture = '';
    }
    if (typeof (nearStation) === 'undefined') {
      nearStation = '';
    }
    if (typeof (minPrice) === 'undefined') {
      minPrice = 0;
    }
    if (typeof (maxPrice) === 'undefined') {
      maxPrice = 0;
    }
    if (typeof (searchStoreRange) === 'undefined') {
      searchStoreRange = 0;
    }
    return {
      prefecture: prefecture,
      nearStation: nearStation,
      minPrice: minPrice,
      maxPrice: maxPrice,
      searchStoreRange: searchStoreRange
    };
  }
}
