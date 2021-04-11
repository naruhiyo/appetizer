import { URL, URLSearchParams } from "url";
import { ApiKeyImpl, ApiKey } from "./ApiKeyModel";
import axios from "axios";
import * as vscode from "vscode";
import { GooglePlaceApiForm } from "./GoogleApiForm";

export class GoogleApi {
  private PLACE_API_ENDPOINT: string =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  private apiKey: string;

  constructor() {
    // get API key
    const apiKeyImpl: ApiKeyImpl = new ApiKeyImpl();
    this.apiKey = apiKeyImpl.getGoogleApiKey() as string;
  }

  async searchPlaces(placeApiParams: GooglePlaceApiForm): Promise<Object | null> {
    // execute api
    try {
      const response = await axios.get(this.PLACE_API_ENDPOINT, {
        params: {
          key: this.apiKey,
          placeApiParams,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  searchMap() {}
}
