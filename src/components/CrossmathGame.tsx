import React, { useState, useMemo } from "react";
import { TABLEROS_CROSSMATH, type TableroCrossmath, type CrossmathNode } from "@/lib/crossmathData";

interface CrossmathGameProps {
  onCompletarTablero: (tableroId: string, xp: number) => void;
  tablerosResueltos: string[];
}

export function CrossmathGame({ onCompletarTablero, tablerosResueltos }: CrossmathGameProps) {
  const [tableroActivoId, setTableroActivoId] = useState<string>("crossmath-01");
  const tablero = useMemo(
    () => TABLEROS_CROSSMATH.find((t) => t.id === tableroActivoId) || TABLEROS_CROSSMATH[0],
    [tableroActivoId]
  );

  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [celdaSeleccionadaId, setCeldaSeleccionadaId] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const yaCompletado = tablerosResueltos.includes(tablero.id);

  // Obtener valor actual de un nodo
  function getValorNodo(nodo: CrossmathNode): string {
    if (nodo.tipo === "fijo") return nodo.valorInicial || nodo.valorEsperado;
    if (nodo.tipo === "operador") return nodo.valorEsperado;
    return respuestas[nodo.id] || "";
  }

  // Comprobar estado de cada ecuación
  const estadoEcuaciones = useMemo(() => {
    return tablero.ecuaciones.map((eq) => {
      const celdas = eq.celdasIds.map((id) => tablero.nodos.find((n) => n.id === id)!);
      const valores = celdas.map((c) => getValorNodo(c));
      const estanCompletas = valores.every((v) => v !== "" && v !== undefined);

      if (!estanCompletas) {
        return { eq, estado: "incompleta" as const, valores };
      }

      // Evaluar la ecuación: num1 op num2 = resultado
      const n1 = parseFloat(valores[0]);
      const op = valores[1];
      const n2 = parseFloat(valores[2]);
      const res = parseFloat(valores[4]);

      let calculo = 0;
      if (op === "+") calculo = n1 + n2;
      else if (op === "-") calculo = n1 - n2;
      else if (op === "x" || op === "*") calculo = n1 * n2;
      else if (op === "/" || op === "÷") calculo = n2 !== 0 ? n1 / n2 : NaN;

      const esValida = Math.abs(calculo - res) < 0.01;
      return {
        eq,
        estado: (esValida ? "valida" : "error") as "valida" | "error",
        valores,
      };
    });
  }, [tablero, respuestas]);

  // Verificar si todo el tablero está resuelto
  const variables = useMemo(() => tablero.nodos.filter((n) => n.tipo === "variable"), [tablero]);
  const variablesCorrectas = useMemo(() => {
    return variables.filter((n) => respuestas[n.id] === n.valorEsperado).length;
  }, [variables, respuestas]);

  const pctProgreso = Math.round((variablesCorrectas / variables.length) * 100);
  const todasEcuacionesValidas = estadoEcuaciones.length > 0 && estadoEcuaciones.every((e) => e.estado === "valida");

  function ingresarDigito(numStr: string) {
    if (!celdaSeleccionadaId) return;
    const actual = respuestas[celdaSeleccionadaId] || "";
    if (actual.length >= 3) return; // Máximo 3 dígitos
    const nuevo = actual + numStr;
    setRespuestas((prev) => ({ ...prev, [celdaSeleccionadaId]: nuevo }));
  }

  function borrarDigito() {
    if (!celdaSeleccionadaId) return;
    const actual = respuestas[celdaSeleccionadaId] || "";
    if (actual.length > 0) {
      setRespuestas((prev) => ({ ...prev, [celdaSeleccionadaId]: actual.slice(0, -1) }));
    }
  }

  function limpiarCelda() {
    if (!celdaSeleccionadaId) return;
    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[celdaSeleccionadaId];
      return copy;
    });
  }

  function asignarValorDirecto(val: string) {
    if (!celdaSeleccionadaId) return;
    setRespuestas((prev) => ({ ...prev, [celdaSeleccionadaId]: val }));
  }

  function verificarYGuardar() {
    if (todasEcuacionesValidas) {
      onCompletarTablero(tablero.id, tablero.recompensaXP);
      setMensajeExito(`¡Crossmath Superado! Has integrado todas las ecuaciones de Propiedad Intelectual ganando +${tablero.recompensaXP} XP.`);
    }
  }

  const nodoSeleccionado = tablero.nodos.find((n) => n.id === celdaSeleccionadaId);

  return (
    <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 transition-all border border-white/70">
      {/* HEADER DEL RETO CROSSMATH */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-sm">
              Crossmath · Rompecabezas Numérico de PI
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
              Dificultad: {tablero.dificultad}
            </span>
            {yaCompletado && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                ✓ Resuelto
              </span>
            )}
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">{tablero.titulo}</h2>
          <p className="text-xs text-ink-soft">{tablero.subtitulo}</p>
        </div>

        {/* SELECTOR DE TABLEROS */}
        <div className="flex items-center gap-2">
          {TABLEROS_CROSSMATH.map((t, idx) => {
            const activo = t.id === tablero.id;
            const resuelto = tablerosResueltos.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTableroActivoId(t.id);
                  setRespuestas({});
                  setCeldaSeleccionadaId(null);
                  setMensajeExito(null);
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activo
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
                    : "glass text-ink-soft hover:bg-white/80"
                }`}
              >
                Malla 0{idx + 1} {resuelto ? "🏆" : "⭕"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* COLUMNA IZQUIERDA: MATRIZ CIRCULAR ESTILO CROSSMATH (IDÉNTICA A LA IMAGEN) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100/90 p-6 shadow-inner border border-slate-200/80 w-full max-w-lg">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center mb-4">
              Entrena tu cerebro a diario · Completa los círculos vacíos
            </p>

            {/* TABLERO DE CÍRCULOS */}
            <div className="grid grid-cols-5 gap-3 place-items-center my-2">
              {Array.from({ length: tablero.filas }).map((_, f) =>
                Array.from({ length: tablero.columnas }).map((_, c) => {
                  const nodo = tablero.nodos.find((n) => n.fila === f && n.col === c);
                  if (!nodo) {
                    return <div key={`${f}-${c}`} className="size-12" />;
                  }

                  if (nodo.tipo === "operador") {
                    return (
                      <div
                        key={nodo.id}
                        className="grid size-10 place-items-center text-xl font-black text-slate-700 select-none"
                      >
                        {nodo.valorEsperado}
                      </div>
                    );
                  }

                  const esFijo = nodo.tipo === "fijo";
                  const val = getValorNodo(nodo);
                  const estaSeleccionado = celdaSeleccionadaId === nodo.id;
                  const esCorrecto = val === nodo.valorEsperado;

                  return (
                    <button
                      key={nodo.id}
                      type="button"
                      disabled={esFijo}
                      onClick={() => setCeldaSeleccionadaId(nodo.id)}
                      className={`relative grid size-14 place-items-center rounded-full font-display text-lg font-black transition-all ${
                        esFijo
                          ? "border-2 border-slate-700 bg-white text-slate-900 shadow-md cursor-default"
                          : estaSeleccionado
                          ? "border-3 border-emerald-500 bg-emerald-50 text-emerald-950 shadow-lg scale-110 ring-4 ring-emerald-200"
                          : val
                          ? esCorrecto
                            ? "border-2 border-emerald-500 bg-emerald-100/70 text-emerald-900 shadow-sm"
                            : "border-2 border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                          : "border-2 border-dashed border-sky-400 bg-sky-50/60 text-sky-900 hover:bg-sky-100 hover:scale-105"
                      }`}
                    >
                      {val ? val : "?"}
                    </button>
                  );
                })
              )}
            </div>

            {/* BARRA DE PROGRESO DEL TABLERO */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Coherencia Matemática & Legal</span>
                <span>{pctProgreso}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 transition-all duration-300"
                  style={{ width: `${pctProgreso}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TECLADO TÁCTIL, INTERPRETACIÓN LEGAL Y VALIDACIÓN */}
        <div className="lg:col-span-5 space-y-4">
          {/* PANEL DE INGRESO / TECLADO VIRTUAL */}
          <div className="glass rounded-2xl p-5 border border-slate-200/70 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-mute">
                {celdaSeleccionadaId ? "Ingreso de Cifra" : "Selecciona un círculo"}
              </p>
              {nodoSeleccionado && nodoSeleccionado.pista && (
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  💡 Pista disponible
                </span>
              )}
            </div>

            {nodoSeleccionado ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100">
                  <div>
                    <p className="text-[11px] text-slate-500 font-semibold">Valor ingresado:</p>
                    <p className="font-display text-2xl font-black text-slate-900">
                      {respuestas[nodoSeleccionado.id] || "—"}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={borrarDigito}
                      className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      ⌫ Borrar
                    </button>
                    <button
                      type="button"
                      onClick={limpiarCelda}
                      className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                    >
                      ✕ Vaciar
                    </button>
                  </div>
                </div>

                {nodoSeleccionado.pista && (
                  <p className="text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                    <strong>Pista:</strong> {nodoSeleccionado.pista}
                  </p>
                )}

                {/* TECLADO NUMÉRICO TÁCTIL (ESTILO DE LA IMAGEN 2 / TUG OF WAR) */}
                <div className="grid grid-cols-5 gap-1.5 pt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => ingresarDigito(num.toString())}
                      className="rounded-xl border border-slate-200 bg-white py-2 font-display text-sm font-bold text-slate-800 shadow-sm hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition-all"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* SUGERENCIAS RÁPIDAS DE VALORES COMUNES EN PI */}
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Atajos de cifras clave en PI:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["6", "8", "10", "11", "12", "16", "20", "24", "25", "50", "70"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => asignarValorDirecto(val)}
                        className="rounded-lg bg-slate-200/80 hover:bg-emerald-600 hover:text-white px-2 py-1 text-xs font-semibold text-slate-700 transition-colors"
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center italic">
                Toca cualquier círculo con signo de interrogación (<strong>?</strong>) para ingresar la cifra que resuelva las ecuaciones.
              </p>
            )}
          </div>

          {/* LISTA DE ECUACIONES Y SU TRADUCCIÓN JURÍDICA */}
          <div className="glass rounded-2xl p-4 border border-slate-200/70 max-h-56 overflow-y-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-mute sticky top-0 bg-white/90 py-1">
              Verificación de Ecuaciones
            </p>
            {estadoEcuaciones.map((item) => (
              <div
                key={item.eq.id}
                className={`p-2.5 rounded-xl text-xs transition-colors border ${
                  item.estado === "valida"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : item.estado === "error"
                    ? "bg-rose-50 border-rose-200 text-rose-950"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{item.eq.descripcion}</span>
                  <span>
                    {item.estado === "valida" ? "✓ Cumplida" : item.estado === "error" ? "✕ Discrepancia" : "○ Incompleta"}
                  </span>
                </div>
                {item.estado === "valida" && (
                  <p className="mt-1 text-[11px] text-emerald-800 opacity-90">{item.eq.explicacion}</p>
                )}
              </div>
            ))}
          </div>

          {/* BOTÓN FINAL DE CONSOLIDACIÓN */}
          {mensajeExito ? (
            <div className="rounded-2xl bg-emerald-600 p-4 text-white text-center shadow-lg">
              <p className="text-base font-extrabold">🎉 {mensajeExito}</p>
            </div>
          ) : (
            <button
              type="button"
              disabled={!todasEcuacionesValidas}
              onClick={verificarYGuardar}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-3.5 font-display text-sm font-extrabold text-white shadow-xl shadow-emerald-500/20 disabled:opacity-40 transition-all hover:scale-102 active:scale-98"
            >
              {todasEcuacionesValidas
                ? `Consolidar Solución (+${tablero.recompensaXP} XP) 🚀`
                : "Resuelve todas las ecuaciones para acreditar nota"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
