import { IoChevronBack } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "../constants";
import { Result } from "../types";
import { Badge } from "../App";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemonList, setPokemonList] = useState<Result[]>([]);

  useEffect(() => {
    const name = searchParams.get("name");
    if (!name) return;
    const fetchData = async () => {
      const response = await fetch(apiFetch.pokemonByName + name, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      const promises = [
        ...data.data.map(async (poke: Result) => {
          const petition = await fetch(poke.url);
          const response = await petition.json();
          return { ...poke, details: response };
        }),
      ];
      Promise.all(promises).then((result) => {
        setPokemonList(result);
      });
    };
    fetchData();
  }, [searchParams]);

  const onSearch = (e: any) => {
    e.preventDefault();

    const target = e.target[0];
    const name = target.value;

    setSearchParams({ name });
  };

  return (
    <main className="h-[100vh] w-[100vw] flex flex-col overflow-hidden">
      <section className="h-full w-full flex flex-col p-4 gap-4 overflow-auto">
        <form onSubmit={onSearch} className="inline-flex gap-2">
          <a href="/" className="">
            <IoChevronBack className="w-7 h-7" />
          </a>
          <input
            defaultValue={searchParams.get("name") || undefined}
            type="text"
            name="search"
            placeholder="search pokemon"
            className="rounded-full w-full pl-4"
          />
        </form>
        {pokemonList.map((val) => {
          return (
            <a
              // onClick={(e) => handleOpenLink(e, `/pokemon/${val.name}`)}
              href={`/pokemon/${val.name}`}
              className="inline-flex w-full p-3 border border-neutral-700 rounded-md gap-4"
              key={val.name}
            >
              <div className="rounded-lg bg-white">
                {val.details && (
                  <img
                    src={val.details.sprites.front_default}
                    style={{ viewTransitionName: `card-${val.name}` }}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h5
                  className="font-black text-3xl capitalize"
                  style={{ viewTransitionName: `title-${val.name}` }}
                >
                  {val.name}
                </h5>
                <div className="inline-flex gap-2 mt-auto">
                  {val.details &&
                    val.details.types.map((type: any) => (
                      <Badge text={type.type.name} />
                    ))}
                </div>
              </div>
            </a>
          );
        })}
      </section>
      <Navbar />
    </main>
  );
};
