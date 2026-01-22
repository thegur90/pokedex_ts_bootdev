import type { State } from "./state.js";

export async function commandExplore(
  s: State,
  ...args: string[]
): Promise<void> {
  const n = args[0]; ///name

  if (!n) {
    console.log(`Usage: explore [area name]`);
    return;
  }
  console.log(`Exploring ${n}...`);

  const l = await s.pokeapi.fetchLocation(n);

  console.log(`Found Pokemon:`);
  for (const p of l.pokemon_encounters) {
    console.log(` - ${p.pokemon.name}`);
  }
  return;
}
