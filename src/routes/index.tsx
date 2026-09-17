import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/blind/Header";
import { Top5Board } from "@/components/blind/Top5Board";
import { ItemArt } from "@/components/blind/ItemArt";
import { useBlindTop5 } from "@/hooks/useBlindTop5";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BLIND TOP 5 — FARESFM Ranking Challenge" },
      {
        name: "description",
        content:
          "Blind Top 5 by FARESFM: reveal a random game, anime or anime character and rank it #1 to #5 without knowing what comes next.",
      },
      { property: "og:title", content: "BLIND TOP 5 — FARESFM Ranking Challenge" },
      {
        property: "og:description",
        content: "Reveal random games, anime and characters and build your blind Top 5 live on stream.",
      },
    ],
  }),
  component: BlindTop5Page,
});

function BlindTop5Page() {
  const g = useBlindTop5();
  const [phase, setPhase] = useState<"idle" | "rolling">("idle");
  const [confirmReset, setConfirmReset] = useState(false);

  const roll = () => {
    if (phase === "rolling" || g.isComplete) return;
    setPhase("rolling");
    setTimeout(() => {
      g.drawRandom();
      setPhase("idle");
    }, 850);
  };

  const current = g.round.current;

  return (
    <div className="min-h-screen hero-bg">
      <Header categories={g.categories} category={g.category} onSelect={g.setCategory} />

      <main className="mx-auto max-w-[1600px] px-4 py-6 md:px-8 md:py-10">
        {g.isComplete ? (
          <section className="animate-pop rounded-3xl border border-primary/40 bg-card/60 p-6 deep-shadow md:p-10">
            <h1 className="text-center text-4xl font-black uppercase tracking-tight gold-text md:text-6xl">
              Top 5 Complete
            </h1>
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {g.def.label}
            </p>
            <div className="mt-8">
              <Top5Board slots={g.round.slots} />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setConfirmReset(true)}
                className="rounded-2xl bg-primary px-8 py-4 text-lg font-black uppercase tracking-widest text-primary-foreground glow-primary transition-transform hover:scale-105"
              >
                New Round
              </button>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-10">
            {/* Reveal column */}
            <section className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-slot)] deep-shadow">
                {phase === "rolling" && (
                  <div className="flex h-full animate-shuffle items-center justify-center">
                    <span className="text-2xl font-black uppercase tracking-[0.3em] text-muted-foreground">
                      ???
                    </span>
                  </div>
                )}
                {phase === "idle" && current && (
                  <div className="h-full animate-reveal">
                    <ItemArt item={current} />
                  </div>
                )}
                {phase === "idle" && !current && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="text-6xl font-black text-muted-foreground">?</span>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                      Press {g.def.randomLabel}
                    </p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-y-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
              </div>

              {current && phase === "idle" && (
                <div className="animate-pop rounded-2xl border border-primary/40 bg-card p-4 text-center">
                  <p className="text-2xl font-black uppercase leading-tight md:text-3xl">
                    {current.name}
                  </p>
                  {current.source && (
                    <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">
                      {current.source}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={roll}
                disabled={!!current || phase === "rolling" || g.poolLeft === 0}
                className="rounded-3xl bg-primary px-6 py-6 text-2xl font-black uppercase tracking-widest text-primary-foreground glow-primary transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 md:text-3xl"
              >
                {phase === "rolling" ? "Rolling…" : g.def.randomLabel}
              </button>

              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>{g.poolLeft} left in pool</span>
                <span>{g.round.skippedIds.length} skipped</span>
              </div>

              <button
                onClick={() => setConfirmReset(true)}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                New Round
              </button>
            </section>

            {/* Board + ranking column */}
            <section className="flex flex-col gap-6">
              <h1 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                <span className="gold-text">Blind</span> Top 5 — {g.def.label}
              </h1>
              <Top5Board slots={g.round.slots} />

              <div className="rounded-3xl border border-border bg-card/70 p-4 md:p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {current ? "Place this item" : "Reveal an item to rank it"}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {g.round.slots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => g.rankCurrent(i)}
                      disabled={!current || !!slot}
                      className="rounded-2xl bg-secondary py-5 text-2xl font-black text-foreground transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-secondary disabled:hover:text-foreground md:text-3xl"
                    >
                      #{i + 1}
                    </button>
                  ))}
                  <button
                    onClick={g.skipCurrent}
                    disabled={!current}
                    className="rounded-2xl border border-border py-5 text-xl font-black uppercase tracking-widest text-muted-foreground transition-all hover:border-accent hover:text-accent disabled:opacity-30"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {confirmReset && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 p-4 backdrop-blur">
          <div className="w-full max-w-md animate-pop rounded-3xl border border-border bg-card p-6 deep-shadow">
            <h2 className="text-2xl font-black uppercase">Start a new round?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This clears the {g.def.label} board, skipped items and pool history.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  g.newRound();
                  setConfirmReset(false);
                }}
                className="flex-1 rounded-xl bg-primary px-4 py-3 font-black uppercase tracking-widest text-primary-foreground"
              >
                New Round
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 rounded-xl border border-border px-4 py-3 font-bold uppercase tracking-widest text-muted-foreground"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={() => {
                g.resetAll();
                setConfirmReset(false);
              }}
              className="mt-3 w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive"
            >
              Reset all categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
