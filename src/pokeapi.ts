import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(interval: number = 5000) {
    this.#cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch locations: ${res.status}`);
    }
    const data = (await res.json()) as ShallowLocations;
    this.#cache.add<ShallowLocations>(url, data);
    return data;
  }

  async fetchLocation(name: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${name}/`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch location: ${res.status}`);
    }

    const data = (await res.json()) as Location;
    this.#cache.add<Location>(url, data);
    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}/`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch pokemon: ${res.status}`);
    }

    const data = (await res.json()) as Pokemon;
    this.#cache.add<Pokemon>(url, data);
    return data;
  }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type PokemonRef = {
  name: string;
  url: string;
};

export type PokemonEncounter = {
  pokemon: PokemonRef;
};

export type Location = {
  name: string;
  pokemon_encounters: PokemonEncounter[];
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
