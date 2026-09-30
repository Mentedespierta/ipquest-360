import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DOMINIOS, OBJETOS, PERFILES, XP_POR_NIVEL, type Objeto, type Perfil } from "@/lib/content";
import {
  dominioPct,
  estaDesbloqueado,
  etiquetaRepaso,
  nivel,
  pendientesRepaso,
  registrarRespuesta,
  completarTableroCrossIP,
  useProgreso,
  xpEnNivel,
  rangoTitulo,
} from "@/lib/progress";
import { CrossIPGame } from "@/components/CrossIPGame";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { IAM360Lab } from "@/components/IAM360Lab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IP QUEST 360 · Serious Game & IAM Lab · Transfertech" },
      {
        name: "description",
        content:
          "Serious learning game para dominar propiedad intelectual, signos distintivos, derechos de autor, patentes, FTO y gestión de activos intangibles.",
      },
      { property: "og:title", content: "IP QUEST 360 · Motor de aprendizaje en Propiedad Intelectual" },
      {
        property: "og:description",
        content:
          "CrossIP matricial, microaprendizaje, insignias de competencia Trophy UI y laboratorio IAM-360 para emprendedores.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Orbes() {
  return (
    <>
      <div className="orb pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-accent-cyan/40 blur-3xl" />
      <div className="orb2 pointer-events-none absolute top-1/3 -right-32 size-[460px] rounded-full bg-brand/30 blur-3xl" />
      <div className="orb pointer-events-none absolute bottom-0 left-1/4 size-[360px] rounded-full bg-violet-400/30 blur-3xl" />
    </>
  );
}

function Index() {
  const { estado, listo, actualizar } = useProgreso();
  const [pestañaActiva, setPestañaActiva] = useState<"crossip" | "misiones" | "badges" | "iam360">("crossip");
  const [dominioActivo, setDominioActivo] = useState("D06");
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);

  const dominio = DOMINIOS.find((d) => d.id === dominioActivo) ?? DOMINIOS[0]!;
  const pregunta = dominio.preguntas[indice % dominio.preguntas.length]!;

  const repasos = useMemo(() => pendientesRepaso(estado), [estado]);
  const desbloqueados = DOMINIOS.filter((d) => estaDesbloqueado(estado, d.id)).length;

  function responder(i: number) {
    if (elegida !== null) return;
    setElegida(i);
    actualizar((prev) => registrarRespuesta(prev, pregunta.id, i === pregunta.correcta));
  }

  function siguiente() {
    setElegida(null);
    setIndice((n) => n + 1);
  }

  function abrirDominio(id: string) {
    setDominioActivo(id);
    setIndice(0);
    setElegida(null);
  }

  if (!listo) {
    return <div className="min-h-screen" />;
  }

  if (!estado.perfil || !estado.objeto) {
    return <Onboarding onListo={(perfil, objeto) => actualizar((p) => ({ ...p, perfil, objeto }))} />;
  }

  const iniciales = estado.perfil.slice(0, 2).toUpperCase();
  const lvl = nivel(estado.xp);
  const rango = rangoTitulo(lvl);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Orbes />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        {/* NAV PRINCIPAL DE ALTO IMPACTO */}
        <nav className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-4 shadow-xl shadow-brand/10 border border-white/70">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-display text-xl font-extrabold text-white shadow-md shadow-brand/30">
              IP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display leading-none font-extrabold tracking-tight text-ink text-base">
                  IP QUEST 360
                </p>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-extrabold text-brand uppercase tracking-wider">
                  Transfertech IP Value
                </span>
              </div>
              <p className="text-[11px] text-ink-mute font-medium mt-0.5">
                Serious Learning Game & Intangible Asset Management Lab
              </p>
            </div>
          </div>

          {/* SELECTOR DE PESTAÑAS PRINCIPALES */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-white/80 p-1.5 border border-slate-200/60 shadow-inner">
            <button
              type="button"
              onClick={() => setPestañaActiva("crossip")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                pestañaActiva === "crossip"
                  ? "bg-gradient-to-r from-violet-600 to-brand text-white shadow-md shadow-brand/20 scale-105"
                  : "text-ink-soft hover:bg-slate-100"
              }`}
            >
              🧩 CrossIP Lab
            </button>

            <button
              type="button"
              onClick={() => setPestañaActiva("misiones")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                pestañaActiva === "misiones"
                  ? "bg-brand text-brand-foreground shadow-md shadow-brand/20 scale-105"
                  : "text-ink-soft hover:bg-slate-100"
              }`}
            >
              📚 Microaprendizaje
            </button>

            <button
              type="button"
              onClick={() => setPestañaActiva("badges")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                pestañaActiva === "badges"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 scale-105"
                  : "text-ink-soft hover:bg-slate-100"
              }`}
            >
              🏆 Trofeos ({estado.badgesDesbloqueados.length})
            </button>

            <button
              type="button"
              onClick={() => setPestañaActiva("iam360")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                pestañaActiva === "iam360"
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "text-ink-soft hover:bg-slate-100"
              }`}
            >
              📊 Diagnóstico IAM-360
            </button>
          </div>

          {/* ESTADÍSTICAS RÁPIDAS DEL ALUMNO */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-mute">Racha</p>
              <p className="font-display text-sm font-bold text-ink">
                {estado.racha} {estado.racha === 1 ? "día" : "días"} 🔥
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-mute">XP</p>
              <p className="font-display text-sm font-extrabold text-brand">
                {estado.xp.toLocaleString("es-CO")}
              </p>
            </div>

            <div
              title={`${rango} - Nivel ${lvl}`}
              className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-bold text-white shadow-md shadow-brand/20 cursor-pointer"
            >
              {iniciales}
            </div>
          </div>
        </nav>

        {/* CONTENIDO SEGÚN LA PESTAÑA SELECCIONADA */}
        <div className="mt-8">
          {/* PESTAÑA 1: CROSSIP LAB */}
          {pestañaActiva === "crossip" && (
            <div className="space-y-6">
              <CrossIPGame
                tablerosResueltos={estado.tablerosResueltos}
                onCompletarTablero={(tableroId, xp, badgeId) => {
                  actualizar((prev) => completarTableroCrossIP(prev, tableroId, xp, badgeId));
                }}
              />
            </div>
          )}

          {/* PESTAÑA 2: MICROAPRENDIZAJE Y MISIONES */}
          {pestañaActiva === "misiones" && (
            <div>
              {/* MAPA DE DOMINIOS */}
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Mapa de misiones</p>
                  <h2 className="font-display text-3xl font-bold text-ink">Dominios del Curso</h2>
                </div>
                <p className="text-sm text-ink-mute">
                  {desbloqueados} de {DOMINIOS.length} dominios desbloqueados
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {DOMINIOS.map((d) => {
                  const pct = dominioPct(estado, d.id);
                  const abierto = estaDesbloqueado(estado, d.id);
                  const activo = d.id === dominioActivo;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      disabled={!abierto}
                      onClick={() => abrirDominio(d.id)}
                      className={`glass rounded-2xl p-4 text-left shadow-md shadow-brand/5 transition-all ${
                        activo ? "border-accent-cyan ring-2 ring-brand/30 shadow-lg" : ""
                      } ${abierto ? "hover:shadow-lg hover:-translate-y-0.5" : "cursor-not-allowed opacity-60"}`}
                    >
                      <span
                        className={`text-[11px] font-bold ${
                          !abierto ? "text-ink-mute" : activo ? "text-accent-cyan" : "text-brand"
                        }`}
                      >
                        {d.id}
                      </span>
                      <p
                        className={`mt-1 font-display leading-tight font-semibold text-xs line-clamp-2 ${
                          abierto ? "text-ink" : "text-ink-mute"
                        }`}
                      >
                        {d.nombre}
                      </p>
                      {abierto ? (
                        <>
                          <div className="mt-3 h-1.5 rounded-full bg-slate-200/70">
                            <div
                              className={`h-full rounded-full ${activo ? "bg-accent-cyan" : "bg-brand"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="mt-1.5 text-[10px] text-ink-mute font-medium">
                            {pct}% · {pct === 100 ? "Dominado" : pct === 0 ? "Sin iniciar" : "En curso"}
                          </p>
                        </>
                      ) : (
                        <p className="mt-3 text-[10px] text-ink-mute">
                          🔒 Requiere {d.requiere?.id} ({d.requiere?.pct}%)
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* DETALLE DEL DOMINIO + MICROJUEGO */}
              <div className="mt-6 grid gap-5 lg:grid-cols-5">
                <div className="glass rounded-3xl p-6 shadow-lg shadow-brand/10 lg:col-span-3 border border-white/60">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand-foreground uppercase">
                      Microaprendizaje
                    </span>
                    <span className="text-[11px] font-semibold text-ink-mute">
                      {dominio.id} · {dominio.nombre}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-ink">{dominio.micro.titulo}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-ink-soft">{dominio.micro.concepto}</p>
                  <div className="glass mb-4 rounded-xl border border-accent-cyan/30 p-4">
                    <p className="mb-1 text-[11px] font-semibold tracking-wider text-accent-cyan uppercase">
                      Ejemplo Real
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">{dominio.micro.ejemplo}</p>
                  </div>
                  <div className="rounded-xl border border-brand/15 bg-brand/5 p-4">
                    <p className="mb-2 text-[11px] font-semibold tracking-wider text-brand uppercase">
                      Mini-actividad · {estado.objeto}
                    </p>
                    <p className="mb-1 text-sm text-ink-soft">{dominio.micro.actividad}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/20 text-sm">
                        🔖
                      </span>
                      <span className="text-slate-300">→</span>
                      <span className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink">
                        {dominio.micro.actividadPista}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MICROJUEGO FORMATIVO */}
                <div className="glass rounded-3xl p-6 shadow-lg shadow-brand/10 lg:col-span-2 border border-white/60">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-accent-cyan px-2.5 py-1 text-[11px] font-bold tracking-wider text-ink uppercase">
                      Microjuego Formativo
                    </span>
                    <span className="text-xs font-semibold text-ink-mute">
                      Pregunta {(indice % dominio.preguntas.length) + 1}/{dominio.preguntas.length}
                    </span>
                  </div>
                  <p className="mb-4 font-display text-sm leading-snug font-semibold text-ink">
                    {pregunta.enunciado}
                  </p>
                  <div className="space-y-2.5">
                    {pregunta.opciones.map((op, i) => {
                      const esCorrecta = i === pregunta.correcta;
                      const revelada = elegida !== null;
                      const marcar = revelada && (esCorrecta || i === elegida);
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => responder(i)}
                          className={`w-full rounded-xl px-4 py-3 text-left text-xs font-medium transition-colors ${
                            marcar
                              ? esCorrecta
                                ? "bg-emerald-600 font-semibold text-white shadow-md"
                                : "border border-destructive/30 bg-destructive/10 text-destructive"
                              : "glass text-ink-soft shadow-sm hover:bg-white"
                          }`}
                        >
                          {op}
                        </button>
                      );
                    })}
                  </div>
                  {elegida !== null && (
                    <>
                      <div
                        className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-xs ${
                          elegida === pregunta.correcta
                            ? "border border-emerald-200 bg-emerald-50/80 text-emerald-950"
                            : "border border-amber-200 bg-amber-50/80 text-amber-950"
                        }`}
                      >
                        <span className="text-base leading-none font-bold">
                          {elegida === pregunta.correcta ? "✓" : "!"}
                        </span>
                        <div>
                          <p className="font-bold">
                            {elegida === pregunta.correcta ? "¡Correcto! +50 XP" : "Fundamentación Jurídica"}
                          </p>
                          <p className="mt-0.5 opacity-90">{pregunta.explicacion}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={siguiente}
                        className="mt-4 w-full rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-brand-foreground shadow-md shadow-brand/30 hover:scale-105 active:scale-95 transition-all"
                      >
                        Siguiente pregunta
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA 3: SALÓN DE TROFEOS Y BADGES (TROPHY UI) */}
          {pestañaActiva === "badges" && (
            <BadgeShowcase
              badgesDesbloqueados={estado.badgesDesbloqueados}
              xp={estado.xp}
              perfil={estado.perfil}
              racha={estado.racha}
            />
          )}

          {/* PESTAÑA 4: DIAGNÓSTICO IAM-360 */}
          {pestañaActiva === "iam360" && (
            <IAM360Lab
              inventario={estado.inventarioIAM}
              onActualizarInventario={(nuevo) => {
                actualizar((p) => ({ ...p, inventarioIAM: nuevo }));
              }}
              perfil={estado.perfil}
              objeto={estado.objeto}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onListo }: { onListo: (perfil: Perfil, objeto: Objeto) => void }) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [objeto, setObjeto] = useState<Objeto | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Orbes />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-brand/15 border border-white/70">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-display text-xl font-extrabold text-white shadow-lg shadow-brand/30">
              IP
            </div>
            <div>
              <p className="font-display leading-none font-bold tracking-tight text-ink text-lg">
                IP QUEST 360
              </p>
              <p className="text-xs text-ink-mute">
                Serious Learning Game & Intangible Asset Management Lab
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Paso 1 de 2 · Perfil</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink">¿Cuál es tu rol en el curso?</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {PERFILES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPerfil(p)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  perfil === p
                    ? "bg-brand text-brand-foreground shadow-md shadow-brand/30 scale-105"
                    : "glass-soft text-ink-soft hover:bg-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mt-8">Paso 2 de 2 · Objeto</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">¿Sobre qué objeto trabajarás tu diagnóstico?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {OBJETOS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setObjeto(o)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all ${
                  objeto === o
                    ? "bg-accent-cyan text-ink shadow-md shadow-brand/20 scale-105"
                    : "glass-soft text-ink-soft hover:bg-white"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!perfil || !objeto}
            onClick={() => perfil && objeto && onListo(perfil, objeto)}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-brand via-violet-600 to-accent-cyan px-4 py-4 font-display font-bold text-white shadow-xl shadow-brand/30 disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
          >
            Iniciar el Laboratorio de Competencias 🚀
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-mute">
            Transfertech IP Value · Tu progreso se almacena de forma segura en tu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
