import logo from "@/assets/faresfm-logo.png.asset.json";
import type { CategoryDef, CategoryId } from "@/data";

export function Header({
  categories,
  category,
  onSelect,
}: {
  categories: CategoryDef[];
  category: CategoryId;
  onSelect: (id: CategoryId) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="FARESFM"
            width={56}
            height={56}
            className="h-12 w-12 rounded-xl object-contain md:h-14 md:w-14"
          />
          <div className="leading-tight">
            <p className="text-xl font-black uppercase tracking-[0.18em] md:text-2xl">FARESFM</p>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary">
              Blind Top 5
            </p>
          </div>
        </div>

        <nav className="order-3 flex w-full gap-2 md:order-none md:ml-6 md:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all md:flex-none md:text-base ${
                category === c.id
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://www.tiktok.com/@faresfm9"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
              <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.1v12.3a2.6 2.6 0 1 1-1.84-2.49V9.66a5.72 5.72 0 1 0 4.94 5.66V8.9a7.3 7.3 0 0 0 4.06 1.24V7.05a4.28 4.28 0 0 1-3-1.23z" />
            </svg>
            <span className="hidden sm:inline">FARESFM9</span>
          </a>
          <a
            href="https://www.youtube.com/@FARESFM9"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
              <path d="M23 12s0-3.4-.43-5.03a2.6 2.6 0 0 0-1.83-1.84C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.74.43a2.6 2.6 0 0 0-1.83 1.84C1 8.6 1 12 1 12s0 3.4.43 5.03c.24.9.94 1.6 1.83 1.84 1.64.43 8.74.43 8.74.43s7.1 0 8.74-.43a2.6 2.6 0 0 0 1.83-1.84C23 15.4 23 12 23 12zM9.8 15.5v-7l6 3.5-6 3.5z" />
            </svg>
            <span className="hidden sm:inline">FARESFM9</span>
          </a>
        </div>
      </div>
    </header>
  );
}
