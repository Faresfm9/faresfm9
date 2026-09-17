import type { CategoryDef, CategoryId } from "./types";
import { games } from "./games";
import { anime } from "./anime";
import { characters } from "./characters";

export type { CategoryDef, CategoryId, Item } from "./types";

export const CATEGORIES: CategoryDef[] = [
  { id: "games", label: "Games", randomLabel: "Random Game", items: games },
  { id: "anime", label: "Anime", randomLabel: "Random Anime", items: anime },
  { id: "characters", label: "Anime Characters", randomLabel: "Random Character", items: characters },
];

export const getCategory = (id: CategoryId): CategoryDef =>
  (CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0])!;
