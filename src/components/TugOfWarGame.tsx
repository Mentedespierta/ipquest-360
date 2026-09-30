import React, { useState, useEffect, useCallback, useMemo } from "react";

interface TugOfWarProps {
  onFinalizarPartida: (gano: boolean, puntaje: number, xp: number) => void;
  duelosGanados: number;
  duelosJugados: number;
  nombreEstudiante?: string;
}

type PreguntaDuelo = {
  id: string;
  pregunta: string;
  respuestaEsperada: number;
  pista: string;
  tema: string;
};

const BANCO_DUELO: PreguntaDuelo[] = [
  {
    id: "tw-1",
    pregunta: "¿Cuántos años dura el monopolio de una Patente de Invención en la CAN?",
    respuestaEsperada: 20,
    pista: "Plazo estándar improrrogable desde la solicitud.",
    tema: "Patentes",
  },
  {
    id: "tw-2",
    pregunta: "¿Años de vigencia de un Modelo de Utilidad según la Decisión 486?",
    respuestaEsperada: 10,
    pista: "La mitad del plazo de una patente de invención.",
    tema: "Modelos de Utilidad",
  },
  {
    id: "tw-3",
    pregunta: "¿Años de vigencia de una Marca registrada antes de requerir renovación?",
    respuestaEsperada: 10,
    pista: "Período renovable indefinidamente por decenios.",
    tema: "Signos Distintivos",
  },
  {
    id: "tw-4",
    pregunta: "¿Plazo de gracia en meses para divulgaciones previas antes de solicitar patente?",
    respuestaEsperada: 12,
    pista: "Un año calendario según el Art. 17 D486.",
    tema: "Novedad",
  },
  {
    id: "tw-5",
    pregunta: "¿Nivel TRL en el que se valida un componente tecnológico en laboratorio?",
    respuestaEsperada: 4,
    pista: "Escala NASA/Horizonte 2020: Validación básica en lab.",
    tema: "Madurez TRL",
  },
  {
    id: "tw-6",
    pregunta: "¿Nivel TRL correspondiente a demostración de prototipo en entorno operativo real?",
    respuestaEsperada: 7,
    pista: "Demostración de sistema integrado previo a calificación.",
    tema: "Madurez TRL",
  },
  {
    id: "tw-7",
    pregunta: "¿Nivel TRL máximo que certifica un sistema probado y comercialmente operativo?",
    respuestaEsperada: 9,
    pista: "Cúspide de la escala de madurez tecnológica.",
    tema: "Madurez TRL",
  },
  {
    id: "tw-8",
    pregunta: "¿Cuántas clases en total tiene la Clasificación Internacional de Niza?",
    respuestaEsperada: 45,
    pista: "34 clases de productos + 11 de servicios.",
    tema: "Signos Distintivos",
  },
  {
    id: "tw-9",
    pregunta: "¿Años mínimos de protección post-mortem de derecho de autor en la CAN (Decisión 351)?",
    respuestaEsperada: 50,
    pista: "Plazo comunitario mínimo tras el deceso del autor.",
    tema: "Derecho de Autor",
  },
  {
    id: "tw-10",
    pregunta: "¿Años de protección patrimonial post-mortem en Ecuador (Código Ingenios)?",
    respuestaEsperada: 70,
    pista: "Plazo nacional extendido en el art. 116 COESCOP.",
    tema: "Derecho de Autor",
  },
  {
    id: "tw-11",
    pregunta: "¿Plazo de prioridad en meses para solicitar una patente en el extranjero (CUP)?",
    respuestaEsperada: 12,
    pista: "Convenio de París para la Protección de la Propiedad Industrial.",
    tema: "Vigilancia & Prioridad",
  },
  {
    id: "tw-12",
    pregunta: "¿Plazo de prioridad en meses para solicitar una marca en el extranjero (CUP)?",
    respuestaEsperada: 6,
    pista: "La mitad del plazo de patentes.",
    tema: "Signos Distintivos",
  },
];

export function TugOfWarGame({
  onFinalizarPartida,
  duelosGanados,
  duelosJugados,
  nombreEstudiante,
}: TugOfWarProps) {
  const [enJuego, setEnJuego] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(40);
  const [posicionCuerda, setPosicionCuerda] = useState(0); // -100 (Gana Alumno) a +100 (Gana Rival)
  const [scoreAlumno, setScoreAlumno] = useState(0);
  const [scoreRival, setScoreRival] = useState(0);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [valorIngresado, setValorIngresado] = useState("");
  const [feedback, setFeedback] = useState<"correcto" | "error" | null>(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [ganador, setGanador] = useState<"alumno" | "rival" | "empate" | null>(null);

  // Barajar preguntas al iniciar
  const preguntasPartida = useMemo(() => {
    return [...BANCO_DUELO].sort(() => Math.random() - 0.5);
  }, [enJuego]);

  const preguntaActual = preguntasPartida[indicePregunta % preguntasPartida.length];

  // Iniciar partida
  function iniciarPartida() {
    setEnJuego(true);
    setSegundosRestantes(40);
    setPosicionCuerda(0);
    setScoreAlumno(0);
    setScoreRival(0);
    setIndicePregunta(0);
    setValorIngresado("");
    setFeedback(null);
    setJuegoTerminado(false);
    setGanador(null);
  }

  // Finalizar juego
  const terminarPartida = useCallback(
    (ganadorFinal: "alumno" | "rival" | "empate") => {
      setEnJuego(false);
      setJuegoTerminado(true);
      setGanador(ganadorFinal);

      const gano = ganadorFinal === "alumno";
      const xpGanada = gano ? 250 : 80;
      onFinalizarPartida(gano, scoreAlumno * 10, xpGanada);
    },
    [onFinalizarPartida, scoreAlumno]
  );

  // Timer del juego y simulación de tracción del rival
  useEffect(() => {
    if (!enJuego) return;

    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Evaluar por posición o score
          if (posicionCuerda < 0 || scoreAlumno > scoreRival) {
            terminarPartida("alumno");
          } else if (posicionCuerda > 0 || scoreRival > scoreAlumno) {
            terminarPartida("rival");
          } else {
            terminarPartida("empate");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // El rival tira de la cuerda de forma esporádica si el alumno se demora
    const rivalPull = setInterval(() => {
      if (Math.random() > 0.45) {
        setPosicionCuerda((prev) => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(rivalPull);
            terminarPartida("rival");
          }
          return next;
        });
        setScoreRival((s) => s + 1);
      }
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(rivalPull);
    };
  }, [enJuego, posicionCuerda, scoreAlumno, scoreRival, terminarPartida]);

  // Manejar teclado táctil
  function ingresarDigito(digito: string) {
    if (!enJuego) return;
    if (valorIngresado.length >= 3) return;
    setValorIngresado((prev) => prev + digito);
  }

  function borrar() {
    setValorIngresado("");
  }

  function comprobarRespuesta() {
    if (!enJuego || valorIngresado.trim() === "") return;
    const num = parseInt(valorIngresado, 10);
    const acerto = num === preguntaActual.respuestaEsperada;

    if (acerto) {
      setFeedback("correcto");
      setScoreAlumno((s) => s + 1);
      // Tirar cuerda hacia el alumno (-30)
      setPosicionCuerda((prev) => {
        const next = prev - 30;
        if (next <= -100) {
          terminarPartida("alumno");
        }
        return next;
      });
    } else {
      setFeedback("error");
      // Penalización: rival tira cuerda hacia la derecha (+15)
      setPosicionCuerda((prev) => {
        const next = prev + 15;
        if (next >= 100) {
          terminarPartida("rival");
        }
        return next;
      });
    }

    setTimeout(() => {
      setFeedback(null);
      setValorIngresado("");
      setIndicePregunta((i) => i + 1);
    }, 600);
  }

  return (
    <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 transition-all border border-white/70">
      {/* HEADER DE ESTILO EDUGAMES (INSPIRADO EN IMAGEN 2) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-sky-500 to-blue-700 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-sm">
              ⚔️ Duelo Tug of War · Batalla de Conocimiento
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
              Victorias: {duelosGanados} / {duelosJugados} partidas
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">
            Tug of War: CITT Intellectual Property Challenge
          </h2>
          <p className="text-xs text-ink-soft">
            Demuestra agilidad de cálculo y precisión en plazos de PI. ¡Tira de la cuerda hacia tu lado respondiendo antes que el rival!
          </p>
        </div>

        {!enJuego && !juegoTerminado && (
          <button
            type="button"
            onClick={iniciarPartida}
            className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 font-display text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            ¡Comenzar Duelo! 🚀
          </button>
        )}
      </div>

      {/* ARENA CENTRAL DE LA CUERDA (INSPIRADA EN IMAGEN 2) */}
      <div className="rounded-3xl bg-gradient-to-b from-sky-50 via-slate-50 to-blue-50/40 p-6 border border-sky-100 shadow-inner relative overflow-hidden">
        {/* MARCADOR DE CABECERA */}
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-blue-600 grid place-items-center text-white font-extrabold text-base shadow-md">
              1
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
                {nombreEstudiante || "Equipo Alumno"}
              </p>
              <p className="font-display text-xl font-black text-blue-600">{scoreAlumno} pts</p>
            </div>
          </div>

          <div className="text-center bg-white/90 backdrop-blur px-5 py-2 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tiempo</p>
            <p className="font-display text-2xl font-black text-slate-900">
              ⏱ 00:{segundosRestantes.toString().padStart(2, "0")}
            </p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-rose-900">
                Equipo Rival (IA CITT)
              </p>
              <p className="font-display text-xl font-black text-rose-600">{scoreRival} pts</p>
            </div>
            <div className="size-10 rounded-2xl bg-rose-600 grid place-items-center text-white font-extrabold text-base shadow-md">
              2
            </div>
          </div>
        </div>

        {/* ESCENARIO DE TRACCIÓN VISUAL (TIRAR DE LA CUERDA) */}
        <div className="relative my-8 py-10 px-4 bg-white/70 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Línea central punteada */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-slate-300 pointer-events-none" />

          {/* Cuerda horizontal continua */}
          <div className="absolute top-1/2 left-8 right-8 h-2.5 bg-amber-700/80 rounded-full -translate-y-1/2 shadow-inner" />

          {/* Pañuelo rojo central móvil según posicionCuerda (-100 a +100) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-10"
            style={{
              left: `calc(50% + ${posicionCuerda * 0.38}%)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div className="size-6 rounded-full bg-rose-600 border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider bg-rose-900 text-white px-1.5 py-0.5 rounded shadow">
                Nivel
              </div>
            </div>
          </div>

          {/* FIGURAS DE EQUIPO AZUL (IZQUIERDA) Y EQUIPO ROJO (DERECHA) */}
          <div className="flex items-center justify-between relative z-5">
            {/* Equipo 1: Azul */}
            <div
              className="flex items-center gap-1 transition-all duration-300"
              style={{
                transform: `translateX(${posicionCuerda * 0.3}px)`,
              }}
            >
              <span className="text-4xl filter drop-shadow">🏃‍♂️</span>
              <span className="text-4xl filter drop-shadow -ml-2">🧑‍💻</span>
              <div className="ml-2 hidden sm:block">
                <span className="text-[11px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                  ¡Fuerza Alumno!
                </span>
              </div>
            </div>

            {/* Equipo 2: Rojo */}
            <div
              className="flex items-center gap-1 transition-all duration-300"
              style={{
                transform: `translateX(${posicionCuerda * 0.3}px)`,
              }}
            >
              <div className="mr-2 hidden sm:block">
                <span className="text-[11px] font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
                  Defensa CITT
                </span>
              </div>
              <span className="text-4xl filter drop-shadow">🤖</span>
              <span className="text-4xl filter drop-shadow -ml-2">🧑‍🏫</span>
            </div>
          </div>
        </div>

        {/* PANTALLA DE JUEGO TERMINADO */}
        {juegoTerminado && (
          <div className="p-6 rounded-2xl bg-white text-center shadow-lg border border-slate-200 my-4 animate-in fade-in">
            {ganador === "alumno" ? (
              <div className="space-y-2">
                <span className="text-5xl">🏆</span>
                <h3 className="font-display text-2xl font-black text-emerald-600">
                  ¡Victoria Absoluta! Tiraste la Cuerda a tu Favor
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Has demostrado dominio rápido de plazos y métricas clave de PI. Ganaste +250 XP y sumaste puntos para tu nota final de 10.0.
                </p>
              </div>
            ) : ganador === "rival" ? (
              <div className="space-y-2">
                <span className="text-5xl">⚡</span>
                <h3 className="font-display text-2xl font-black text-rose-600">
                  ¡El Equipo Rival Jaló la Cuerda!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Estuviste cerca. Repasa las fichas de conocimiento de plazos y vuelve a intentarlo para superar al contrincante.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-5xl">🤝</span>
                <h3 className="font-display text-2xl font-black text-amber-600">
                  ¡Empate Técnico de Tracción!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Ambos equipos mantuvieron el equilibrio. ¡Juega una ronda de desempate!
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={iniciarPartida}
              className="mt-4 rounded-xl bg-blue-600 px-6 py-2.5 font-display text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-all"
            >
              Jugar Nueva Partida 🔄
            </button>
          </div>
        )}

        {/* PANELES DE JUEGO EN ACCIÓN (TEAM 1 VS PREGUNTA) */}
        {enJuego && (
          <div className="grid gap-6 md:grid-cols-12 items-start mt-4">
            {/* PREGUNTA ACTUAL (CENTRO / IZQUIERDA) */}
            <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {preguntaActual.tema}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Pregunta {(indicePregunta % preguntasPartida.length) + 1} de {preguntasPartida.length}
                </span>
              </div>

              <h4 className="font-display text-lg font-black text-slate-900 leading-snug">
                {preguntaActual.pregunta}
              </h4>

              <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                💡 Pista: {preguntaActual.pista}
              </p>

              {/* CASILLA DE ENTRADA Y FEEDBACK */}
              <div className="flex items-center gap-3 pt-2">
                <div
                  className={`flex-1 rounded-xl p-3 border-2 text-center font-display text-2xl font-black transition-all ${
                    feedback === "correcto"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : feedback === "error"
                      ? "border-rose-500 bg-rose-50 text-rose-800"
                      : "border-slate-300 bg-slate-50 text-slate-900"
                  }`}
                >
                  {valorIngresado ? valorIngresado : <span className="text-slate-300">Respuesta...</span>}
                </div>

                <button
                  type="button"
                  onClick={comprobarRespuesta}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-sm font-extrabold px-5 py-3.5 shadow-md active:scale-95 transition-all"
                >
                  ✓ Enviar
                </button>
              </div>

              {feedback === "correcto" && (
                <p className="text-xs font-bold text-emerald-700">
                  ¡Correcto! ¡Tiraste la cuerda con potencia hacia tu lado! (+30 px)
                </p>
              )}
              {feedback === "error" && (
                <p className="text-xs font-bold text-rose-700">
                  Incorrecto. El rival aprovechó el titubeo para jalar la cuerda.
                </p>
              )}
            </div>

            {/* TECLADO TÁCTIL ESTILO PANTALLA EDUGAMES (IMAGEN 2) */}
            <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center mb-2">
                Teclado Numérico Táctil
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => ingresarDigito(d)}
                    className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 py-3 font-display text-lg font-black text-slate-800 shadow-sm active:scale-95 transition-all"
                  >
                    {d}
                  </button>
                ))}
                {/* Botón Borrar (X roja) */}
                <button
                  type="button"
                  onClick={borrar}
                  className="rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 py-3 font-display text-base font-black text-rose-700 shadow-sm active:scale-95 transition-all"
                >
                  ✕
                </button>
                {/* Cero */}
                <button
                  type="button"
                  onClick={() => ingresarDigito("0")}
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 py-3 font-display text-lg font-black text-slate-800 shadow-sm active:scale-95 transition-all"
                >
                  0
                </button>
                {/* Botón Enter (Check azul/verde) */}
                <button
                  type="button"
                  onClick={comprobarRespuesta}
                  className="rounded-xl border border-blue-500 bg-blue-600 hover:bg-blue-700 py-3 font-display text-base font-black text-white shadow-sm active:scale-95 transition-all"
                >
                  ✓
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
