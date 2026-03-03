"use client";

import { useEffect, useState } from "react";
import SelectClient from "../Client/SelectClient";

interface CountryData {
  name: string;
  dial_code: string;
  code: string;
}

interface SelectProps {
  options: "countries" | "dial code";
}

const COUNTRY_DATA_URL =
  "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json";

export default async function Select({ options }: SelectProps) {
  const [selectOptions, setSelectOptions] = useState<string[]>(
    options === "countries" ? ["United States"] : ["+1"],
  );

  useEffect(() => {
    let isMounted = true;

    const loadCountryData = async () => {
      try {
        const response = await fetch(COUNTRY_DATA_URL, { cache: "force-cache" });
        if (!response.ok) {
          return;
        }

        const countryData: CountryData[] = await response.json();
        const mappedOptions = countryData
          .map((country) =>
            options === "countries" ? country.name : country.dial_code,
          )
          .filter(Boolean);

        if (isMounted && mappedOptions.length > 0) {
          setSelectOptions(mappedOptions);
        }
      } catch {
        return;
      }
    };

    loadCountryData();

    return () => {
      isMounted = false;
    };
  }, [options]);

  return (
    <SelectClient
      defaultSelection={selectOptions[0]}
      options={selectOptions}
    />
  );
}
