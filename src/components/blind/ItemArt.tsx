import { useState } from "react";
import type { Item } from "@/data";

export function ItemArt({ item, className = "" }: { item: Item; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-[image:var(--gradient-slot)] p-3 text-center ${className}`}
      >
        <span className="text-lg font-extrabold uppercase leading-tight tracking-wide text-foreground/90">
          {item.name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover object-top ${className}`}
    />
  );
}
