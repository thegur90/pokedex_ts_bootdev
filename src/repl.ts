import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((x) => x.length > 0);
}

async function handleCommand(words: string[], s: State): Promise<void> {
  const commandName = words[0];
  const commands = s.commands;
  const cmd = commands[commandName];
  if (!cmd) {
    console.log(
      `Unknown command: "${commandName}". Type "help" for a list of commands.`,
    );
    return;
  }

  try {
    await cmd.callback(s, ...words.slice(1));
  } catch (e) {
    console.log(e);
  }
}

export async function startREPL(s: State) {
  async function handleInput(line: string) {
    const words = cleanInput(line);
    if (words.length > 0) {
      await handleCommand(words, s);
    } else {
      //empty prompt
    }
    s.rl.prompt();
  }

  s.rl.on("line", await handleInput);
  s.rl.prompt();
}
