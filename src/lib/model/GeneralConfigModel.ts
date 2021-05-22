import { WorkspaceConfiguration } from 'vscode';
import { ConfigurationReader } from './ConfigurationReader';

// 型
export type GeneralConfig = {
  prefecture: string;
  nearStation: string;
  latLng: {
    lat: number;
    lng: number;
  }
  minPrice: number;
  maxPrice: number;
  searchStoreRange: number;
};

/**
 * 共通Configのデータモデル
 */
export class GeneralConfigImpl {
  private generalConf: WorkspaceConfiguration;

  constructor () {
    const configurationReader: ConfigurationReader = new ConfigurationReader();
    this.generalConf = configurationReader.getGeneralConf();
  }

  getGeneralConf () : GeneralConfig {
    return {
      prefecture: this.generalConf.get('prefecture')!,
      nearStation: this.generalConf.get('nearStation')!,
      latLng: {
        lat: this.generalConf.get('lat')!,
        lng: this.generalConf.get('lng')!,
      },
      minPrice: this.generalConf.get('minPrice')!,
      maxPrice: this.generalConf.get('maxPrice')!,
      searchStoreRange: this.generalConf.get('searchStoreRange')!
    };
  }
}
