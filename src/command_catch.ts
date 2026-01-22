import type { State } from "./state.js";

export async function commandCatch(s: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Usage: catch [pokemon name]");
  }
  const n = args[0];

  let p;
  try {
    p = await s.pokeapi.fetchPokemon(n);
  } catch (e) {
    console.log(`Failed to find pokemon: ${n}`);
    return;
  }
  console.log(`Throwing a Pokeball at ${n}...`);

  const chance: boolean = chMod(p.base_experience) > Math.random();

  if (chance) {
    console.log(p.name + " was caught!");
    console.log("You may now inspect it with the inspect command.");
    s.pokedex[p.name] = p;
  } else {
    console.log(p.name + " escaped!");
  }
}

function chMod(base: number) {
  //chance modifier
  const maxBaseExp = 300;
  const normalized = Math.min(base / maxBaseExp, 1);
  return 1 - normalized * 0.85; //so no catch is impossible
}
