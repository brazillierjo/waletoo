import { GeoNamesResponse } from "@/src/interfaces/geonamesInterface";

export class CitiesApi {
  static async get(inputValue: string): Promise<GeoNamesResponse> {
    const response = await fetch(
      `https://api.geonames.org/searchJSON?q=${inputValue}&maxRows=3&username=dovah&cities=cities1000`,
      { mode: "no-cors" }
    );

    if (!response.ok) {
      throw new Error("Error while fetching geonames data");
    }

    return response.json();
  }
}
