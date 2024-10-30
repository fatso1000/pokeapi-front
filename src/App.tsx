import useSWR from "swr";
import { apiFetch, fetcher } from "./constants";
import { PokemonList, Result } from "./types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import Navbar from "./components/Navbar";

export const Badge = (props: { text: string }) => {
  return (
    <div className="flex items-center justify-center p-2 text-center bg-lime-900 rounded-full">
      <span className="font-medium leading-none">{props.text}</span>
    </div>
  );
};

function App() {
  const [pokemonsList, setPokemonsList] = useState<Result[]>([]);
  const { data, error, isLoading } = useSWR<PokemonList>(
    apiFetch.pokemonList,
    fetcher
  );
  const navigate = useNavigate();
  const handleOpenLink = (e: any, link: string) => {
    e.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(link);
      });
    });
  };

  useEffect(() => {
    if (data && data.data) {
      const promises = [
        ...data.data.map(async (poke) => {
          const petition = await fetch(poke.url);
          const response = await petition.json();
          return { ...poke, details: response };
        }),
      ];
      Promise.all(promises).then((result) => {
        setPokemonsList(result);
      });
    }
  }, [data?.results]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="h-[100vh] w-[100vw] flex flex-col overflow-hidden">
      <section className="h-full w-full flex flex-col p-4 gap-4 overflow-auto">
        {pokemonsList.map((val, i) => {
          return (
            <a
              onClick={(e) => handleOpenLink(e, `/pokemon/${val.identifier}`)}
              href={`/pokemon/${val.identifier}`}
              className="inline-flex w-full p-3 border lol border-neutral-700 rounded-md gap-4"
              style={{ animationDelay: `${i * 0.1}s` }}
              key={val.identifier}
            >
              <div className="rounded-lg bg-white">
                {val.details && (
                  <img
                    src={val.details.sprites.front_default}
                    style={{ viewTransitionName: `card-${val.identifier}` }}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h5
                  className="font-black text-3xl capitalize"
                  style={{ viewTransitionName: `title-${val.identifier}` }}
                >
                  {val.identifier}
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
}

export default App;
