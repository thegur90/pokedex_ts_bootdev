import type { State } from "./state.js";

export function commandPokedex(s: State, ...args: string[]): void {
  console.log("");
  console.log("Your Pokedex:");
  for (const p in s.pokedex) {
    console.log(` - ${p}`);
  }
  console.log("");
}
