import type { Country } from "@/app/page";
import Link from "next/link";
import Image from "next/image";
import CountryCard from "@/components/CountryCard";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );

  return (await response.json())[0];
}

async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common == name
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 == border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt,
    };
  });
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);
  const borderCountries = await getCountryBordersByName(decodeURI(name));

  const formater = Intl.NumberFormat("pt", { notation: "compact" });

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">
        {country.translations.por.common}
      </h1>

      <Link href="/" className="flex py-2">
        <Image
          src="/arrow-back.svg"
          alt="Ícone seta de voltar"
          width={24}
          height={24}
        />
        Voltar
      </Link>

      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-lg">
        <section>
          {country.capital?.length && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Capital: </b>
              {country.capital}
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente: </b>
            {country.region} {country.subregion && `- ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 População: </b>
            {formater.format(country.population)}
          </h2>
          {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Línguas faladas: </b>
              <br />
              {Object.values(country.languages).map((language) => (
                <span
                  key={language}
                  className="inline-block p-2 bg-indigo-700 mt-2 mr-2 text-white text-sm rounded-xl"
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
        </section>
        <div className="relative h-48 md:h-auto w-96 shadow-md">
          <Image
            src={country.flags.svg}
            alt={"country.flags.alt"}
            fill
            className="object-cover my-3"
          />
        </div>
      </article>

      <section>
        <h3 className="mt-8 text-2xl font-semibold text-gray-800">
          Países que fazem fronteira
        </h3>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-3">
          {borderCountries?.map((border) => (
            <CountryCard key={border.name} { ... border} />
          ))}
        </div>
      </section>
    </section>
  );
}
