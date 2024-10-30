import useSWR from "swr";
import { apiFetch, fetcher } from "../constants";
import { IPokemonDetail } from "../types";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import { ColorExtractor } from "react-color-extractor";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { flushSync } from "react-dom";

export const PokemonDetail = () => {
  const { name } = useParams();
  const { data, error, isLoading } = useSWR<IPokemonDetail>(
    apiFetch.pokemonByName + name,
    fetcher
  );
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<{ light: string; dark: string }>({
    light: "",
    dark: "",
  });

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  const handleOpenLink = (e: any) => {
    e.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => {
        navigate("/");
      });
    });
  };

  const BackButton = () => {
    return (
      <a
        href="/"
        onClick={handleOpenLink}
        className="z-10 absolute top-0 left-0 ml-3 mt-4 rounded-full w-12 h-12 flex items-center justify-center text-white bg-[#242424] shadow-md"
      >
        <IoChevronBack className="w-7 h-7" />
      </a>
    );
  };

  return (
    <main className="h-[100vh] w-[100vw]">
      <section
        className="h-full w-full flex flex-col"
        style={{
          background: `linear-gradient(315deg, ${bgColor.dark} 30%, ${bgColor.light} 100%)`,
        }}
      >
        <BackButton />
        <ColorExtractor
          src={data?.sprites.front_default}
          getColors={(colors: any) =>
            setBgColor({ light: colors[1], dark: colors[0] })
          }
        />
        <div className="w-full h-80 flex">
          <img
            className="w-full drop-shadow-xl object-cover"
            src={data?.sprites.front_default}
            style={{ viewTransitionName: `card-${name}` }}
          />
        </div>
        <div className="rounded-t-3xl bg-[#242424] flex h-full w-full test">
          <div className="flex flex-col w-full gap-5 px-5 py-2">
            <h1
              className="font-black text-4xl capitalize mt-5"
              style={{ viewTransitionName: `title-${name}` }}
            >
              {name}
            </h1>
            <div className="inline-flex gap-2 justify-between">
              <div>
                <h5 className="font-bold text-xl">{data?.weight}</h5>
                <span>Peso</span>
              </div>
              <div>
                <h5 className="font-bold text-xl">
                  {data?.types.map((type) => (
                    <span>{type.type.name}</span>
                  ))}
                </h5>
                <span>Tipos</span>
              </div>
              <div>
                <h5 className="font-bold text-xl">{data?.height}</h5>
                <span>Altura</span>
              </div>
            </div>
            <div className="w-full h-0 border border-neutral-700"></div>
            <div></div>
          </div>
        </div>
      </section>
    </main>
  );
};
