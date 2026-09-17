import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES, getCategory, type CategoryId, type Item } from "@/data";

export interface RoundState {
  /** slots[0] is #1 */
  slots: (Item | null)[];
  usedIds: string[];
  skippedIds: string[];
  current: Item | null;
}

const emptyRound = (): RoundState => ({
  slots: [null, null, null, null, null],
  usedIds: [],
  skippedIds: [],
  current: null,
});

type AllRounds = Record<CategoryId, RoundState>;

const STORAGE_KEY = "faresfm-blind-top5-v1";

const initialRounds = (): AllRounds => ({
  games: emptyRound(),
  anime: emptyRound(),
  characters: emptyRound(),
});

export function useBlindTop5() {
  const [category, setCategory] = useState<CategoryId>("games");
  const [rounds, setRounds] = useState<AllRounds>(initialRounds);
  const [hydrated, setHydrated] = useState(false);

  // Restore session after mount (avoids SSR/hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { category: CategoryId; rounds: AllRounds };
        if (parsed.rounds) setRounds({ ...initialRounds(), ...parsed.rounds });
        if (parsed.category) setCategory(parsed.category);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ category, rounds }));
    } catch {
      /* ignore */
    }
  }, [category, rounds, hydrated]);

  const round = rounds[category];
  const def = useMemo(() => getCategory(category), [category]);

  const pool = useMemo(
    () => def.items.filter((i) => !round.usedIds.includes(i.id)),
    [def, round.usedIds],
  );

  const isComplete = round.slots.every((s) => s !== null);

  const update = useCallback(
    (fn: (r: RoundState) => RoundState) =>
      setRounds((prev) => ({ ...prev, [category]: fn(prev[category]) })),
    [category],
  );

  const drawRandom = useCallback((): Item | null => {
    if (isComplete || pool.length === 0) return null;
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    update((r) => ({ ...r, current: pick, usedIds: [...r.usedIds, pick.id] }));
    return pick;
  }, [isComplete, pool, update]);

  const rankCurrent = useCallback(
    (slotIndex: number) =>
      update((r) => {
        if (!r.current || r.slots[slotIndex]) return r;
        const slots = [...r.slots];
        slots[slotIndex] = r.current;
        return { ...r, slots, current: null };
      }),
    [update],
  );

  const skipCurrent = useCallback(
    () =>
      update((r) =>
        r.current ? { ...r, skippedIds: [...r.skippedIds, r.current.id], current: null } : r,
      ),
    [update],
  );

  const clearCurrent = useCallback(() => update((r) => ({ ...r, current: null })), [update]);

  const newRound = useCallback(() => update(() => emptyRound()), [update]);

  const resetAll = useCallback(() => setRounds(initialRounds()), []);

  return {
    categories: CATEGORIES,
    category,
    setCategory,
    def,
    round,
    poolLeft: pool.length,
    isComplete,
    drawRandom,
    rankCurrent,
    skipCurrent,
    clearCurrent,
    newRound,
    resetAll,
    hydrated,
  };
}
