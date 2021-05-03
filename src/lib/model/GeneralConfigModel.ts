import { WorkspaceConfiguration } from 'vscode';
import { ConfigurationReader } from './ConfigurationReader';

// 型
export type GeneralConfig = {
  nearStation: string | null | undefined;
  latLng: {
    lat: number | null | undefined;
    lng: number | null | undefined;
  }
  priceRange: string | null | undefined;
  searchStoreRange: number | null | undefined;
};

/**
 * 共通Configのデータモデル
 */
export class GeneralConfigImpl {
  private generalConf: WorkspaceConfiguration;

  constructor () {
    const configurationReader: ConfigurationReader = new ConfigurationReader();
    this.generalConf = configurationReader.getApiKeyConf();
  }

  getGeneralConf () : GeneralConfig {
    const priceRange: GeneralConfig['priceRange'] = this.generalConf.get('priceRange');

    return {
      nearStation: this.generalConf.get('nearStation'),
      latLng: {
        lat: this.generalConf.get('lat'),
        lng: this.generalConf.get('lng'),
      },
      priceRange: priceRange,
      searchStoreRange: this.generalConf.get('searchStoreRange')
    };
  }
}
