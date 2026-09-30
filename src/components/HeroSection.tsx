import React from "react";
import { type Estado, type NotaEvaluacion, nivel, rangoTitulo } from "@/lib/progress";

interface HeroSectionProps {
  estado: Estado;
  evaluacion: NotaEvaluacion;
  onEmpezar: () => void;
  onNavegar: (pestaña: "info" | "fichas" | "crucigramas" | "duelo" | "misiones" | "iam360" | "calificacion" | "badges") => void;
  onEditarPerfil: () => void;
}

export function HeroSection({
  estado,
  evaluacion,
  onEmpezar,
  onNavegar,
  onEditarPerfil,
}: HeroSectionProps) {
  const lvl = nivel(estado.xp);
  const rango = rangoTitulo(lvl);
  const nombreEstudiante = estado.nombreEstudiante || "Estudiante";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 shadow-2xl shadow-brand/10 transition-all">
      {/* GLOW DECORATIVO DE FONDO */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-brand/20 via-accent-cyan/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-gradient-to-tr from-violet-500/15 via-teal-400/15 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* EYEBROW / TRUST PILL (ESTILO DESIGN ROCKET) */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3.5 py-1.5 border border-slate-900/10 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-slate-800 tracking-wide uppercase">
              CITT · CONQUITO | Serious Learning Game & IAM Sandbox
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-extrabold text-brand uppercase tracking-wider">
            ⚡ Escala Oficial 10.0 / 10.0
          </span>
        </div>

        {/* TITULAR PRINCIPAL H1 DE ALTO IMPACTO */}
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
            Aprende, compite y certifica tus competencias en{" "}
            <span className="bg-gradient-to-r from-brand via-violet-600 to-accent-cyan bg-clip-text text-transparent">
              Propiedad Intelectual
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
            Plataforma interactiva complementaria de la Red de Laboratorios del DMQ. Resuelve mallas lógicas matriciales, pon a prueba tu agilidad en el duelo <em>Tug of War</em> y obtén tu calificación ponderada oficial sobre 10 puntos para acreditación docente.
          </p>
        </div>

        {/* CALLS TO ACTION (CTAs) MODULARES */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={onEmpezar}
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand via-violet-600 to-accent-cyan px-7 py-3.5 font-display text-sm font-black text-white shadow-xl shadow-brand/25 transition-all hover:scale-102 hover:shadow-2xl hover:shadow-brand/35 active:scale-98"
          >
            <span>Iniciar Retos & Evaluación</span>
            <span className="text-base transition-transform group-hover:translate-x-1">🚀</span>
          </button>

          <button
            type="button"
            onClick={() => onNavegar("fichas")}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-6 py-3.5 font-display text-sm font-bold text-slate-800 border border-slate-200/90 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <span>📖 Fichas Temáticas (Teoría)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavegar("calificacion")}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-3.5 font-display text-xs font-black text-emerald-900 border border-emerald-200 shadow-sm hover:bg-emerald-100 transition-all"
          >
            <span>⭐ Mi Calificación: {evaluacion.notaFinal.toFixed(2)}/10.0</span>
          </button>
        </div>

        {/* BENTO-GRID MODULAR DEL HERO (DESIGN ROCKET FEATURE BLOCKS) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* BLOQUE 1: CALIFICACIÓN & ESTADO DOCENTE */}
          <div
            onClick={() => onNavegar("calificacion")}
            className="group cursor-pointer rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Nota Oficial
                </span>
                <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">↗</span>
              </div>
              <p className="font-display text-2xl font-black text-slate-900">
                {evaluacion.notaFinal.toFixed(2)}{" "}
                <span className="text-xs text-slate-400 font-semibold">/ 10.0</span>
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Estado: <strong>{evaluacion.equivalenciaCualitativa}</strong>
              </p>
            </div>
            <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (evaluacion.notaFinal / 10) * 100)}%` }}
              />
            </div>
          </div>

          {/* BLOQUE 2: CRUCIGRAMA MATEMÁTICO (IMAGEN 3) & CROSSIP */}
          <div
            onClick={() => onNavegar("crucigramas")}
            className="group cursor-pointer rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  Crossmath & CrossIP
                </span>
                <span className="text-slate-400 group-hover:text-teal-600 transition-colors">↗</span>
              </div>
              <p className="font-display text-base font-bold text-slate-900">
                Rompecabezas Numéricos
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {estado.crossmathResueltos?.length || 0} mallas resueltas · 3.0 pts
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-teal-700">
              <span>Resolver ecuaciones de PI</span>
              <span>→</span>
            </div>
          </div>

          {/* BLOQUE 3: DUELO TUG OF WAR (IMAGEN 2) */}
          <div
            onClick={() => onNavegar("duelo")}
            className="group cursor-pointer rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  Tug of War
                </span>
                <span className="text-slate-400 group-hover:text-sky-600 transition-colors">↗</span>
              </div>
              <p className="font-display text-base font-bold text-slate-900">
                Duelo de Conocimiento
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {estado.dueloVictorias || 0} victorias · Tracción contrarreloj
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-sky-700">
              <span>Entrar al duelo en vivo</span>
              <span>→</span>
            </div>
          </div>

          {/* BLOQUE 4: ESTUDIANTE / AVATAR & XP */}
          <div
            onClick={onEditarPerfil}
            className="group cursor-pointer rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold uppercase tracking-wider text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                  Ficha de Estudiante
                </span>
                <span className="text-slate-400 group-hover:text-brand transition-colors">✏️</span>
              </div>
              <p className="font-display text-base font-bold text-slate-900 line-clamp-1">
                {nombreEstudiante}
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Nivel {lvl} · {estado.xp} XP acumulados
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-brand">
              <span>{estado.institucion || estado.perfil || "Editar perfil"}</span>
              <span>Modificar ✎</span>
            </div>
          </div>
        </div>

        {/* TRUST STRIP INFERIOR / AVALES INSTITUCIONALES */}
        <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">Respaldado en:</span>
            <span>Decisión 486 CAN</span>
            <span>•</span>
            <span>Decisión 351 CAN</span>
            <span>•</span>
            <span>Código Ingenios (COESCOP)</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Red Metropolitana de Laboratorios</span>
            <span>•</span>
            <span>Quito Innovador 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
