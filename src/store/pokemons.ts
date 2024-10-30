import { create } from "zustand";

export const pokemonStore = create((set) => ({
  pokemons: [],
  selectedPokemon: undefined,
  updateSelectedPokemon: (pokemon: any) => set({ selectedPokemon: pokemon }),
  removeAllBears: () => set({ bears: 0 }),
  updatePokemons: (pokemonsList: any) => set({ pokemons: pokemonsList }),
}));
