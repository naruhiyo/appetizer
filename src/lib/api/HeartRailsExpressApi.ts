import axios from "axios";
import { HeartRailsExpressStationImpl } from "../model/HeartRailsExpressStationModel";
import { HeartRailsExpressForm } from "./HeartRailsExpressForm";

export class HeartRailsExpressApi {
  private STATION_API_ENDPOINT: string =
    "http://express.heartrails.com/api/json?method=getStations";

  async getStation(
    stationApiParams: HeartRailsExpressForm
  ): Promise<HeartRailsExpressStationImpl | null> {
    // execute api
    try {
      const response = await axios.get(this.STATION_API_ENDPOINT, {
        params: stationApiParams
      });

      return HeartRailsExpressStationImpl.newFromApiResponse(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
