import i18nJson from "./i18n.json";

export class I18nConverter {
  private i18nTextObject: any | null = null;

  constructor(locale: string) {
    // i18nJsonをany型として定義して中身を動的に取得する
    this.i18nTextObject = (i18nJson as any)[locale];
  }

  /**
   * key名で他言語ファイルを探し出す
   * @param textKey ドット区切りのjson key
   */
  localize(textKey: string) {
    let result: any | null = this.i18nTextObject;

    // i18nKeyを分解し該当のネストまでたどる
    const i18nKeys: Array<string> = textKey.split(".");

    // 該当のテキストまで辿り着かせる
    i18nKeys.forEach((i18nKey: string) => {
      result = result[i18nKey];
    });

    return result;
  }
}
