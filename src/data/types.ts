export type CategoryId = "games" | "anime" | "characters";

export interface Item {
  id: string;
  name: string;
  category: CategoryId;
  /** Poster / cover / character art. Null-safe: UI falls back to a styled card. */
  image: string | null;
  /** Source anime for characters (optional for other categories). */
  source?: string;
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  randomLabel: string;
  items: Item[];
}
