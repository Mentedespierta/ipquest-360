import React from "react";
import { nivel, rangoTitulo, xpEnNivel, XP_POR_NIVEL, type Estado } from "@/lib/progress";

interface GamificationPillarsProps {
  estado: Estado;
  onNavegar: (pestaña: string) => void;
  onEditarPerfil: () => void;
}

export function GamificationPillars({ estado, onNavegar, onEditarPerfil }: GamificationPillarsProps) {
  const lvl = nivel(estado.xp);
  const rango = rangoTitulo(lvl);
  const xpProgreso = xpEnNivel(estado.xp);
  const pctNivel = Math.round((xpProgreso / XP_POR_NIVEL) * 100);

  return (
    <div className="space-y-6">
      {/* TARJETA MAESTRA DE GAMIFICACIÓN (INSPIRADA EN IMAGEN 1) */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-7 text-white shadow-2xl relative overflow-hidden border border-white/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-accent-cyan uppercase">
                Arquitectura Lúdica de Aprendizaje
              </span>
              <h2 className="font-display text-3xl font-black text-white tracking-tight">
                Gamificación & Juegos Serios
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Los 5 pilares estructurales para el desarrollo de competencias en Propiedad Intelectual
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-bold text-slate-200 border border-white/15">
                Economía TIC & Metodología Activa
              </span>
            </div>
          </div>

          {/* LOS 5 PILARES (IMAGEN 1: NIVEL, AVATAR, CONTROL, OBJETIVOS, PREMIOS) */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-6">
            {/* 1. NIVEL */}
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 grid place-items-center text-2xl shadow-lg mb-3">
                📊
              </div>
              <h4 className="font-display font-black text-sm text-white">Nivel {lvl}</h4>
              <p className="text-[11px] text-purple-200 font-semibold">{rango}</p>
              <div className="mt-2.5 w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent-cyan h-full rounded-full" style={{ width: `${pctNivel}%` }} />
              </div>
              <p className="text-[10px] text-slate-300 mt-1">{estado.xp} XP acumulados</p>
            </div>

            {/* 2. AVATAR */}
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 grid place-items-center text-2xl shadow-lg mb-3">
                👤
              </div>
              <h4 className="font-display font-black text-sm text-white line-clamp-1">
                {estado.nombreEstudiante || "Estudiante"}
              </h4>
              <p className="text-[11px] text-cyan-200 font-semibold">{estado.perfil || "Participante"}</p>
              <button
                type="button"
                onClick={onEditarPerfil}
                className="mt-3 text-[10px] font-bold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg transition-colors"
              >
                Editar Datos ✏️
              </button>
            </div>

            {/* 3. CONTROL */}
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 grid place-items-center text-2xl shadow-lg mb-3">
                🎮
              </div>
              <h4 className="font-display font-black text-sm text-white">Control D-Pad</h4>
              <p className="text-[11px] text-emerald-200 font-semibold">Navegación Táctil</p>
              <div className="mt-2 grid grid-cols-3 gap-1 size-14 place-items-center">
                <button
                  type="button"
                  title="Fichas Temáticas"
                  onClick={() => onNavegar("teoria")}
                  className="col-start-2 size-4 rounded bg-white/30 hover:bg-white/60 text-[9px] grid place-items-center"
                >
                  ▲
                </button>
                <button
                  type="button"
                  title="Crucigramas"
                  onClick={() => onNavegar("crucigramas")}
                  className="col-start-1 row-start-2 size-4 rounded bg-white/30 hover:bg-white/60 text-[9px] grid place-items-center"
                >
                  ◀
                </button>
                <div className="size-3 rounded-full bg-emerald-400" />
                <button
                  type="button"
                  title="Duelo"
                  onClick={() => onNavegar("duelo")}
                  className="col-start-3 row-start-2 size-4 rounded bg-white/30 hover:bg-white/60 text-[9px] grid place-items-center"
                >
                  ▶
                </button>
                <button
                  type="button"
                  title="Calificación"
                  onClick={() => onNavegar("calificacion")}
                  className="col-start-2 row-start-3 size-4 rounded bg-white/30 hover:bg-white/60 text-[9px] grid place-items-center"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* 4. OBJETIVOS */}
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 grid place-items-center text-2xl shadow-lg mb-3">
                🎯
              </div>
              <h4 className="font-display font-black text-sm text-white">Objetivos</h4>
              <p className="text-[11px] text-amber-200 font-semibold">5 Retos Formativos</p>
              <p className="mt-2 text-[10px] text-slate-300">
                Logra 7.0/10.0 mínimo para certificar competencias ante docente.
              </p>
            </div>

            {/* 5. PREMIOS */}
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-all">
              <div className="size-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 grid place-items-center text-2xl shadow-lg mb-3">
                ⭐
              </div>
              <h4 className="font-display font-black text-sm text-white">Premios</h4>
              <p className="text-[11px] text-rose-200 font-semibold">
                {estado.badgesDesbloqueados.length} Trofeos
              </p>
              <button
                type="button"
                onClick={() => onNavegar("badges")}
                className="mt-3 text-[10px] font-bold text-white bg-rose-500/40 hover:bg-rose-500/60 px-2.5 py-1 rounded-lg transition-colors"
              >
                Ver Salón 🏆
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* METODOLOGÍA INTEGRAL DE JUEGOS SERIOS (INSPIRADA EN IMAGEN 4) */}
      <div className="glass rounded-3xl p-6 border border-slate-200/70 shadow-sm">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">Marco Pedagógico</p>
          <h3 className="font-display text-xl font-bold text-ink">
            Los 8 Componentes de Juegos Serios (Serious Games Framework)
          </h3>
          <p className="text-xs text-ink-soft">
            Cada mecánica del subdominio responde a un propósito de adquisición de capacidades:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icono: "🗺️", titulo: "Plan", desc: "Estrategia de protección y hoja de ruta tecnológica." },
            { icono: "🚀", titulo: "Competition", desc: "Duelo Tug of War contra reloj con métricas de tracción." },
            { icono: "📈", titulo: "Personal Dev", desc: "Evolución de explorador a Master IAM 360." },
            { icono: "🎓", titulo: "Learning", desc: "Fichas temáticas paralelas con base legal andina." },
            { icono: "🧠", titulo: "Active Method", desc: "Resolución de crucigramas matemáticos y matrices." },
            { icono: "💰", titulo: "Reward", desc: "Puntaje XP acumulable y desbloqueo de niveles." },
            { icono: "🏆", titulo: "Achievement", desc: "Insignias de competencia Trophy UI." },
            { icono: "🎯", titulo: "Goal", desc: "Calificación automática ponderada sobre 10.0 puntos." },
          ].map((item) => (
            <div
              key={item.titulo}
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{item.icono}</span>
              <p className="font-display font-bold text-xs text-slate-900 mt-1">{item.titulo}</p>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
