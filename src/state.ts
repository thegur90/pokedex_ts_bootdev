import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    rl,
    commands: getCommands(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokeapi: new PokeAPI(),
    pokedex: {},
  };
}
