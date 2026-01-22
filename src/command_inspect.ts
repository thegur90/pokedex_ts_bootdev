import type { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js";

export function commandInspect(s: State, ...args: string[]): void {
  if (args.length !== 1) {
    console.log("Usage: inspect [pokemon]");
    return;
  }
  const name = args[0];
  if (!s.pokedex[name]) {
    console.log("Pokemon must be recorded in your pokedex to inspect!");
    return;
  }
  //for testing
  displayInfo(s.pokedex[name]);
}

function displayInfo(p: Pokemon): void {
  console.log(``);
  console.log(`Name: ${p.name}`);
  console.log(`Height: ${p.height}`);
  console.log(`Weight: ${p.weight}`);
  console.log(`Stats:`);
  for (const entry of p.stats) {
    console.log(`  -${entry.stat.name}: ${entry.base_stat}`);
  }
  console.log(`Types:`);
  for (const entry of p.types) {
    console.log(`  -${entry.type.name}`);
  }
  console.log(``);
}
