import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex.",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message.",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next page of location areas.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the Previous page of location areas.",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description:
        "Displays pokemon information about the specified location. Usage: explore [area name]",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Gotta catch them all!",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Gotta catch them all!",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Shows all caught pokemon.",
      callback: commandPokedex,
    },
  };
}
