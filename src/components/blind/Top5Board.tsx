import type { Item } from "@/data";
import { ItemArt } from "./ItemArt";

const SIZES = ["h-40 md:h-56", "h-36 md:h-48", "h-32 md:h-44", "h-30 md:h-40", "h-28 md:h-36"];

export function Top5Board({ slots }: { slots: (Item | null)[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:items-end">
      {slots.map((item, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-3xl font-black md:text-4xl ${i === 0 ? "gold-text" : "text-muted-foreground"}`}
            >
              #{i + 1}
            </span>
            {i === 0 && (
              <span className="rounded-md bg-[image:var(--gradient-gold)] px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-widest text-background">
                Top
              </span>
            )}
          </div>
          <div
            className={`relative overflow-hidden rounded-2xl border ${SIZES[i]} ${
              item
                ? `border-primary/40 deep-shadow ${i === 0 ? "glow-primary" : ""} animate-pop`
                : "border-dashed border-border bg-[image:var(--gradient-slot)]"
            }`}
          >
            {item ? (
              <>
                <ItemArt item={item} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-2">
                  <p className="truncate text-sm font-bold md:text-base">{item.name}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Empty
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
