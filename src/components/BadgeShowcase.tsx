import React from "react";
import { BADGES, type Badge } from "@/lib/badgesData";
import { nivel, rangoTitulo, xpEnNivel, XP_POR_NIVEL } from "@/lib/progress";

interface BadgeShowcaseProps {
  badgesDesbloqueados: string[];
  xp: number;
  perfil: string | null;
  racha: number;
}

export function BadgeShowcase({
  badgesDesbloqueados,
  xp,
  perfil,
  racha,
}: BadgeShowcaseProps) {
  const lvl = nivel(xp);
  const rango = rangoTitulo(lvl);
  const totalBadges = BADGES.length;
  const ganados = badgesDesbloqueados.length;
  const pctBadges = Math.round((ganados / totalBadges) * 100);

  return (
    <div className="space-y-6">
      {/* HERO DE RANGO Y NIVEL (ESTILO TROPHY UI) */}
      <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 border border-white/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 size-48 rounded-full bg-gradient-to-br from-amber-300/30 via-brand/20 to-transparent blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 via-brand to-accent-cyan p-0.5 shadow-lg shadow-brand/20">
              <div className="grid size-full place-items-center rounded-2xl bg-slate-900 text-2xl">
                {lvl >= 4 ? "👑" : lvl >= 3 ? "⭐" : "🎯"}
              </div>
              <span className="absolute -bottom-2 -right-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold text-slate-950 shadow-sm">
                LVL {lvl}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
                  Distintivo de Rango
                </span>
                <span className="text-xs text-ink-mute">· {perfil || "Participante"}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-ink">{rango}</h2>
              <p className="text-xs text-ink-soft">
                {xp.toLocaleString("es-CO")} XP acumulados · Racha activa: {racha} {racha === 1 ? "día" : "días"} 🔥
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="rounded-2xl bg-white/70 px-4 py-3 border border-slate-200/60 shadow-sm">
              <p className="text-[11px] font-bold text-ink-mute uppercase tracking-wider">Insignias Logradas</p>
              <p className="font-display text-xl font-extrabold text-brand">
                {ganados} / {totalBadges} ({pctBadges}%)
              </p>
            </div>
          </div>
        </div>

        {/* BARRA DE PROGRESO DE NIVEL */}
        <div className="mt-6 border-t border-slate-200/60 pt-4">
          <div className="flex justify-between text-xs font-semibold text-ink-soft mb-1.5">
            <span>Progreso hacia Nivel {lvl + 1}</span>
            <span>
              {xpEnNivel(xp)} / {XP_POR_NIVEL.toLocaleString("es-CO")} XP
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand via-accent-cyan to-amber-400 transition-all duration-500"
              style={{ width: `${(xpEnNivel(xp) / XP_POR_NIVEL) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* GALERÍA DE INSIGNIAS Y DISTINTIVOS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((b) => {
          const desbloqueado = badgesDesbloqueados.includes(b.id);

          return (
            <div
              key={b.id}
              className={`rounded-3xl p-5 transition-all relative overflow-hidden border ${
                desbloqueado
                  ? "glass border-amber-300/80 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1"
                  : "bg-slate-100/70 border-slate-200/70 opacity-70"
              }`}
            >
              {/* CINTA DE ESTADO */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className={`grid size-12 place-items-center rounded-2xl text-2xl shadow-md ${
                    desbloqueado
                      ? `bg-gradient-to-br ${b.colorGradiente} text-white shadow-brand/20`
                      : "bg-slate-300 text-slate-500"
                  }`}
                >
                  {desbloqueado ? b.icono : "🔒"}
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    desbloqueado
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {desbloqueado ? "Acreditado ✓" : "Bloqueado"}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                  {b.categoria}
                </span>
                <h3 className="font-display text-base font-bold text-ink">{b.nombre}</h3>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed line-clamp-3">
                  {b.descripcion}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-200/60 pt-3">
                <p className="text-[10px] font-semibold text-ink-mute uppercase tracking-wider">
                  Competencia Demostrada
                </p>
                <p className="text-xs font-semibold text-ink-soft">{b.competencia}</p>

                <p className="mt-2 text-[10px] font-semibold text-ink-mute uppercase tracking-wider">
                  Requisito
                </p>
                <p className="text-[11px] text-ink-soft leading-tight">{b.requisito}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
