import { getCountries } from "@/app/_lib/country-services";
import { Suspense } from "react";

export default async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: {
  defaultCountry: string;
  name: string;
  id: string;
  className?: string;
}) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <Suspense key={defaultCountry}>
      <select
        name={name}
        id={id}
        defaultValue={`${defaultCountry}%${flag}`}
        className={className}
      >
        <option value="">Select country...</option>
        {countries &&
          countries.map((country) => (
            <option
              key={country.name}
              value={`${country.name}%${country.flag}`}
            >
              {country.name}
            </option>
          ))}
      </select>
    </Suspense>
  );
}
