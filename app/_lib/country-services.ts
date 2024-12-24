import { TCountry } from "../_types/country-type";

export async function getCountries(): Promise<TCountry[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();

    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}
