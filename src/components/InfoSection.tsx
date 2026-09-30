import React from "react";

interface InfoSectionProps {
  onIrAprender: () => void;
  onIrEvaluacion: () => void;
}

export function InfoSection({ onIrAprender, onIrEvaluacion }: InfoSectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HERO INFORMATIVO INSTITUCIONAL */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-accent-cyan/20 px-3 py-1 text-[11px] font-extrabold tracking-wider text-accent-cyan uppercase border border-accent-cyan/30">
              Marco Institucional CONQUITO · CITT
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">
              Subdominio de Formación Activa
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
            ¿En qué consiste este espacio y cuál es su finalidad formativa?
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Este entorno digital no es un simple juego recreativo: constituye un <strong>Serious Learning Game & Sandbox Experimental</strong> concebido para la <strong>formación complementaria, entrenamiento situacional y consolidación de competencias técnicas</strong> en Propiedad Intelectual, Vigilancia Tecnológica, Valoración y Gestión de Activos Intangibles (IAM).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onIrAprender}
              className="rounded-2xl bg-gradient-to-r from-accent-cyan via-teal-400 to-emerald-400 px-5 py-3 font-display text-xs font-black text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              📖 Abrir Campo de Conocimiento (Fichas)
            </button>
            <button
              type="button"
              onClick={onIrEvaluacion}
              className="rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 font-display text-xs font-bold text-white transition-all"
            >
              📋 Ver Rúbrica y Calificación (Escala 10.0)
            </button>
          </div>
        </div>
      </div>

      {/* PROPÓSITO PEDAGÓGICO Y ROL COMPLEMENTARIO */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="size-12 rounded-2xl bg-blue-100 text-blue-700 grid place-items-center text-2xl font-bold mb-4">
              🎯
            </div>
            <h3 className="font-display text-lg font-bold text-ink">Finalidad Competencial</h3>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Superar la memorización pasiva tradicional. El estudiante se enfrenta a <strong>dilemas normativos reales</strong> (Decisión 486 CAN, Decisión 351, Código Ingenios) y aprende a clasificar marcas, redactar cláusulas de software, blindar secretos y proyectar niveles TRL.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700">
            Competencias C1 a C15 del TDR
          </div>
        </div>

        <div className="glass rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="size-12 rounded-2xl bg-purple-100 text-purple-700 grid place-items-center text-2xl font-bold mb-4">
              🧩
            </div>
            <h3 className="font-display text-lg font-bold text-ink">Entrenamiento Multimodal</h3>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Integra <strong>cuatro dinámicas complementarias</strong>: fichas temáticas de microaprendizaje, crucigramas de coherencia matricial (CrossIP), acertijos matemáticos de plazos (Crossmath) y duelos contrarreloj (Tug of War).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-purple-700">
            Gamificación & Economía TIC
          </div>
        </div>

        <div className="glass rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-700 grid place-items-center text-2xl font-bold mb-4">
              📊
            </div>
            <h3 className="font-display text-lg font-bold text-ink">Acreditación Docente</h3>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              La plataforma registra con nombre y cédula la participación de cada estudiante, evaluando automáticamente su desempeño con un <strong>promedio ponderado sobre 10.0 puntos</strong> para su reporte final imprimible.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
            Auditoría de cumplimiento en tiempo real
          </div>
        </div>
      </div>

      {/* ESTRUCTURA DE LA EXPERIENCIA PASO A PASO */}
      <div className="glass rounded-3xl p-6 border border-slate-200/70 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-wider text-brand uppercase">Ruta Metodológica</p>
          <h3 className="font-display text-2xl font-bold text-ink">¿Cómo transitar exitosamente este espacio?</h3>
          <p className="text-xs text-ink-soft">Sigue estos 5 pasos estructurados para asegurar tu nota de 10.0:</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              paso: "01",
              titulo: "Registro & Avatar",
              desc: "Ingresa tus datos completos (Nombre, Cédula, Institución) para que el docente identifique tu entrega.",
              icono: "👤",
            },
            {
              paso: "02",
              titulo: "Fichas Temáticas",
              desc: "Explora la fundamentación teórica y normativa de cada dominio antes de responder las preguntas.",
              icono: "📖",
            },
            {
              paso: "03",
              titulo: "Mallas & Crucigramas",
              desc: "Resuelve los tableros CrossIP (matrices legales) y Crossmath (operaciones matemáticas de plazos).",
              icono: "🧩",
            },
            {
              paso: "04",
              titulo: "Duelo Tug of War",
              desc: "Participa en el reto competitivo contrarreloj tirando de la cuerda con respuestas rápidas.",
              icono: "⚔️",
            },
            {
              paso: "05",
              titulo: "Reporte sobre 10.0",
              desc: "Verifica tu nota en vivo, genera tu informe oficial de cumplimiento y entrégalo a tu docente.",
              icono: "📜",
            },
          ].map((etapa) => (
            <div
              key={etapa.paso}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-sm font-black text-brand">{etapa.paso}</span>
                  <span className="text-xl">{etapa.icono}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900">{etapa.titulo}</h4>
                <p className="mt-1 text-xs text-slate-500 leading-snug">{etapa.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
