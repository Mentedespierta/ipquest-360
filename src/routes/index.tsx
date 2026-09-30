import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DOMINIOS, OBJETOS, PERFILES, XP_POR_NIVEL, type Objeto, type Perfil } from "@/lib/content";
import {
  dominioPct,
  estaDesbloqueado,
  nivel,
  pendientesRepaso,
  registrarRespuesta,
  completarTableroCrossIP,
  completarCrossmath,
  registrarResultadoDuelo,
  actualizarDatosEstudiante,
  calcularNotaDetallada,
  useProgreso,
  rangoTitulo,
} from "@/lib/progress";
import { CrossIPGame } from "@/components/CrossIPGame";
import { CrossmathGame } from "@/components/CrossmathGame";
import { TugOfWarGame } from "@/components/TugOfWarGame";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { IAM360Lab } from "@/components/IAM360Lab";
import { InfoSection } from "@/components/InfoSection";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { GamificationPillars } from "@/components/GamificationPillars";
import { GradeEvaluationReport } from "@/components/GradeEvaluationReport";
import { HeroSection } from "@/components/HeroSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IP QUEST 360 · Serious Game & CITT Lab · CONQUITO" },
      {
        name: "description",
        content:
          "Serious learning game para dominar propiedad intelectual, signos distintivos, derechos de autor, patentes, FTO, TRL y gestión de activos intangibles con evaluación sobre 10 puntos.",
      },
      { property: "og:title", content: "IP QUEST 360 · Motor de aprendizaje en Propiedad Intelectual" },
      {
        property: "og:description",
        content:
          "CrossIP matricial, Crossmath numérico, Duelo Tug of War, fichas temáticas y laboratorio IAM-360 con calificación oficial ponderada sobre 10.",
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

type PestañaPrincipal =
  | "info"
  | "fichas"
  | "crucigramas"
  | "duelo"
  | "misiones"
  | "iam360"
  | "calificacion"
  | "badges";

function Index() {
  const { estado, listo, actualizar } = useProgreso();
  const [pestañaActiva, setPestañaActiva] = useState<PestañaPrincipal>("info");
  const [subPestañaCrucigramas, setSubPestañaCrucigramas] = useState<"crossmath" | "crossip">("crossmath");
  const [dominioActivo, setDominioActivo] = useState("D06");
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);

  const dominio = DOMINIOS.find((d) => d.id === dominioActivo) ?? DOMINIOS[0]!;
  const pregunta = dominio.preguntas[indice % dominio.preguntas.length]!;

  const desbloqueados = DOMINIOS.filter((d) => estaDesbloqueado(estado, d.id)).length;
  const evaluacion = useMemo(() => calcularNotaDetallada(estado), [estado]);

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
    setPestañaActiva("misiones");
  }

  if (!listo) {
    return <div className="min-h-screen" />;
  }

  if (!estado.perfil || !estado.objeto) {
    return (
      <Onboarding
        onListo={(nombreEstudiante, identificacion, institucion, perfil, objeto) =>
          actualizar((p) =>
            actualizarDatosEstudiante(p, {
              nombreEstudiante,
              identificacion,
              institucion,
              perfil,
              objeto,
            })
          )
        }
      />
    );
  }

  const iniciales = (estado.nombreEstudiante
    ? estado.nombreEstudiante.slice(0, 2)
    : estado.perfil.slice(0, 2)
  ).toUpperCase();
  const lvl = nivel(estado.xp);
  const rango = rangoTitulo(lvl);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/60 pb-16">
      <Orbes />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* NAV PRINCIPAL DE ALTO IMPACTO */}
        <nav className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-4 shadow-xl shadow-brand/10 border border-white/80">
          {/* LOGO E IDENTIDAD INSTITUCIONAL */}
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-display text-xl font-extrabold text-white shadow-md shadow-brand/30">
              IP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display leading-none font-black tracking-tight text-ink text-base">
                  IP QUEST 360
                </p>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-extrabold text-brand uppercase tracking-wider">
                  CITT · CONQUITO
                </span>
              </div>
              <p className="text-[11px] text-ink-mute font-medium mt-0.5">
                Serious Learning Game & Laboratorio de Intangibles
              </p>
            </div>
          </div>

          {/* BADGE DE CALIFICACIÓN OFICIAL EN VIVO (SOBRE 10 PUNTOS) */}
          <button
            type="button"
            onClick={() => setPestañaActiva("calificacion")}
            className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-2 border border-emerald-500/30 hover:bg-emerald-50 transition-all shadow-sm"
          >
            <span className="text-base">⭐</span>
            <div className="text-left">
              <p className="text-[10px] uppercase font-black text-emerald-800 tracking-wider">
                Calificación Oficial
              </p>
              <p className="font-display text-xs font-black text-emerald-950">
                {evaluacion.notaFinal.toFixed(2)} / 10.0 ({evaluacion.equivalenciaCualitativa})
              </p>
            </div>
          </button>

          {/* ESTADÍSTICAS RÁPIDAS DEL ALUMNO & AVATAR */}
          <div className="flex items-center gap-3.5">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-mute">Racha</p>
              <p className="font-display text-xs font-bold text-ink">
                {estado.racha} {estado.racha === 1 ? "día" : "días"} 🔥
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-mute">XP</p>
              <p className="font-display text-xs font-extrabold text-brand">
                {estado.xp.toLocaleString("es-CO")}
              </p>
            </div>

            <div
              onClick={() => setPestañaActiva("calificacion")}
              title={`${estado.nombreEstudiante || estado.perfil} · ${rango} (Nivel ${lvl}) - Clic para ver ficha`}
              className="flex items-center gap-2 rounded-2xl bg-white/80 p-1.5 border border-slate-200 shadow-sm cursor-pointer hover:bg-white transition-all"
            >
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-bold text-xs text-white shadow-sm">
                {iniciales}
              </div>
              <div className="text-left pr-2 hidden md:block">
                <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[120px]">
                  {estado.nombreEstudiante || estado.perfil}
                </p>
                <p className="text-[10px] text-slate-500">Nivel {lvl} · {rango.split("/")[0]}</p>
              </div>
            </div>
          </div>
        </nav>

        {/* SELECTOR DE PESTAÑAS INTEGRAL */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setPestañaActiva("info")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "info"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            🚀 Inicio & Hero
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("fichas")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "fichas"
                ? "bg-brand text-brand-foreground shadow-md shadow-brand/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            📖 Fichas Temáticas
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("crucigramas")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "crucigramas"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            🧩 Crucigramas (CrossIP & Crossmath)
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("duelo")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "duelo"
                ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-blue-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            ⚔️ Duelo Tug of War
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("misiones")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "misiones"
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            📚 Cuestionario Diagnóstico
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("iam360")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "iam360"
                ? "bg-purple-700 text-white shadow-md shadow-purple-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            📊 Laboratorio IAM-360
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("calificacion")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "calificacion"
                ? "bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white font-extrabold"
            }`}
          >
            📋 Calificación (10.0) & Registro
          </button>

          <button
            type="button"
            onClick={() => setPestañaActiva("badges")}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              pestañaActiva === "badges"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-102"
                : "glass text-ink-soft hover:bg-white"
            }`}
          >
            🏆 Trofeos ({estado.badgesDesbloqueados.length})
          </button>
        </div>

        {/* CONTENIDO SEGÚN LA PESTAÑA SELECCIONADA */}
        <div className="mt-4">
          {/* PESTAÑA: INICIO, HERO & MARCO PEDAGÓGICO */}
          {pestañaActiva === "info" && (
            <div className="space-y-8">
              <HeroSection
                estado={estado}
                evaluacion={evaluacion}
                onEmpezar={() => setPestañaActiva("crucigramas")}
                onNavegar={(p) => setPestañaActiva(p)}
                onEditarPerfil={() => setPestañaActiva("calificacion")}
              />
              <InfoSection
                onIrAprender={() => setPestañaActiva("fichas")}
                onIrEvaluacion={() => setPestañaActiva("calificacion")}
              />
            </div>
          )}

          {/* PESTAÑA: FICHAS TEMÁTICAS PARALELAS */}
          {pestañaActiva === "fichas" && (
            <KnowledgeBase onIrAlDominio={abrirDominio} />
          )}

          {/* PESTAÑA: CRUCIGRAMAS (SUB-PESTAÑAS ENTRE CROSSMATH E IMAGEN 3 Y CROSSIP) */}
          {pestañaActiva === "crucigramas" && (
            <div className="space-y-6">
              {/* SUB-NAV ENTRE CRUCIGRAMA MATEMÁTICO (IMAGEN 3) Y CRUCIGRAMA MATRICIAL */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSubPestañaCrucigramas("crossmath")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      subPestañaCrucigramas === "crossmath"
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
                        : "glass text-slate-700 hover:bg-white"
                    }`}
                  >
                    ⭕ Crossmath Numérico de Plazos (Imagen 3)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubPestañaCrucigramas("crossip")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      subPestañaCrucigramas === "crossip"
                        ? "bg-violet-700 text-white shadow-md shadow-violet-500/25"
                        : "glass text-slate-700 hover:bg-white"
                    }`}
                  >
                    🧩 CrossIP Matricial (Signos & Patentes)
                  </button>
                </div>

                <span className="text-xs font-bold text-slate-500 hidden sm:block">
                  Ponderación: 3.0 / 10.0 Puntos de la Nota Final
                </span>
              </div>

              {subPestañaCrucigramas === "crossmath" ? (
                <CrossmathGame
                  tablerosResueltos={estado.crossmathResueltos || []}
                  onCompletarTablero={(id, xp) => {
                    actualizar((prev) => completarCrossmath(prev, id, xp));
                  }}
                />
              ) : (
                <CrossIPGame
                  tablerosResueltos={estado.tablerosResueltos}
                  onCompletarTablero={(tableroId, xp, badgeId) => {
                    actualizar((prev) => completarTableroCrossIP(prev, tableroId, xp, badgeId));
                  }}
                />
              )}
            </div>
          )}

          {/* PESTAÑA: DUELO TUG OF WAR (INSPIRADO EN IMAGEN 2) */}
          {pestañaActiva === "duelo" && (
            <TugOfWarGame
              nombreEstudiante={estado.nombreEstudiante}
              duelosGanados={estado.dueloVictorias || 0}
              duelosJugados={estado.dueloPartidas || 0}
              onFinalizarPartida={(gano, puntaje, xp) => {
                actualizar((prev) => registrarResultadoDuelo(prev, gano, puntaje, xp));
              }}
            />
          )}

          {/* PESTAÑA: CUESTIONARIOS Y MICROAPRENDIZAJE */}
          {pestañaActiva === "misiones" && (
            <div>
              {/* MAPA DE DOMINIOS */}
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                    Mapa de evaluación diagnóstica
                  </p>
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
                      Fundamento Teórico
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
                      Cuestionario Formativo
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

          {/* PESTAÑA: CALIFICACIÓN OFICIAL (10 PUNTOS) & REGISTRO DE PARTICIPANTE */}
          {pestañaActiva === "calificacion" && (
            <GradeEvaluationReport
              estado={estado}
              onActualizarEstado={actualizar}
              onNavegarActividad={(tab) => setPestañaActiva(tab as PestañaPrincipal)}
            />
          )}

          {/* PESTAÑA: LABORATORIO IAM-360 */}
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

          {/* PESTAÑA: TROFEOS & PILARES DE GAMIFICACIÓN */}
          {pestañaActiva === "badges" && (
            <div className="space-y-8">
              <GamificationPillars
                estado={estado}
                onNavegar={(tab) => setPestañaActiva(tab as PestañaPrincipal)}
                onEditarPerfil={() => setPestañaActiva("calificacion")}
              />

              <BadgeShowcase
                badgesDesbloqueados={estado.badgesDesbloqueados}
                xp={estado.xp}
                perfil={estado.perfil}
                racha={estado.racha}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Onboarding({
  onListo,
}: {
  onListo: (
    nombreEstudiante: string,
    identificacion: string,
    institucion: string,
    perfil: Perfil,
    objeto: Objeto
  ) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [objeto, setObjeto] = useState<Objeto | null>(null);

  const puedeContinuar = Boolean(nombre.trim() && perfil && objeto);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <Orbes />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-brand/15 border border-white/70">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand via-violet-600 to-accent-cyan font-display text-xl font-extrabold text-white shadow-lg shadow-brand/30">
              IP
            </div>
            <div>
              <p className="font-display leading-none font-bold tracking-tight text-ink text-lg">
                IP QUEST 360 · SERIOUS LEARNING GAME
              </p>
              <p className="text-xs text-ink-mute">
                Corporación de Promoción Económica CONQUITO · CITT
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-2xl bg-brand/5 p-4 border border-brand/15 text-xs text-ink-soft leading-relaxed">
            <strong className="text-brand">Registro de Participación para Acreditación Docente:</strong>{" "}
            Ingresa tus datos personales e institucionales para que tus actividades web queden registradas con tu nombre y puedas obtener tu nota oficial sobre 10.0 puntos.
          </div>

          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Paso 1 de 3 · Identificación del Estudiante
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Nombres y Apellidos Completos *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Ing. Carlos Andrés Morales"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Cédula / Código de Estudiante
              </label>
              <input
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                placeholder="Ej: 1719283746"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Institución / Emprendimiento / Carrera
              </label>
              <input
                type="text"
                value={institucion}
                onChange={(e) => setInstitucion(e.target.value)}
                placeholder="Ej: Universidad Central / Lab Biotec"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
          </div>

          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase mt-6">
            Paso 2 de 3 · Rol o Perfil
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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

          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mt-6">
            Paso 3 de 3 · Objeto Tecnológico de Diagnóstico
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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
            disabled={!puedeContinuar}
            onClick={() =>
              puedeContinuar &&
              perfil &&
              objeto &&
              onListo(nombre.trim(), identificacion.trim(), institucion.trim(), perfil, objeto)
            }
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-brand via-violet-600 to-accent-cyan px-4 py-4 font-display font-bold text-white shadow-xl shadow-brand/30 disabled:opacity-40 transition-all hover:scale-102 active:scale-98"
          >
            Iniciar Serious Learning Game & Laboratorio de Competencias 🚀
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-mute">
            CONQUITO · CITT · Tu progreso se almacena de forma segura en tu navegador y es auditable por el docente.
          </p>
        </div>
      </div>
    </div>
  );
}
