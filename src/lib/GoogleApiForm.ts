/**
 * PlaceAPI検索用のパラメーター
 */
export type GooglePlaceApiForm = {
  location: string,
  radious: number,
  language: string,
  types: string,
};
