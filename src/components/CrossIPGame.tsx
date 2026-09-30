import React, { useState, useMemo } from "react";
import { TABLEROS_CROSSIP, type TableroCrossIP, type CrossCell } from "@/lib/crossipData";
import { BADGES } from "@/lib/badgesData";

interface CrossIPGameProps {
  onCompletarTablero: (tableroId: string, xp: number, badgeId?: string) => void;
  tablerosResueltos: string[];
}

export function CrossIPGame({ onCompletarTablero, tablerosResueltos }: CrossIPGameProps) {
  const [tableroActivoId, setTableroActivoId] = useState<string>("crossip-01");
  const tablero = useMemo(
    () => TABLEROS_CROSSIP.find((t) => t.id === tableroActivoId) || TABLEROS_CROSSIP[0],
    [tableroActivoId]
  );

  // Estado local de las respuestas en el tablero actual
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const yaCompletado = tablerosResueltos.includes(tablero.id);

  // Manejar cambio de valor en una celda
  function handleSeleccion(celdaId: string, valor: string) {
    setRespuestas((prev) => ({
      ...prev,
      [celdaId]: valor,
    }));
  }

  // Evaluar estado de cada celda
  function getValorCelda(celda: CrossCell): string {
    if (celda.tipo === "fijo") return celda.etiqueta || celda.valorEsperado;
    return respuestas[celda.id] || "";
  }

  // Evaluación de filas
  const estadoFilas = useMemo(() => {
    return tablero.restriccionesFilas.map((rf) => {
      const celdasFila = tablero.celdas.filter((c) => c.fila === rf.fila);
      const variablesFila = celdasFila.filter((c) => c.tipo === "variable");
      const contestadas = variablesFila.every((c) => !!respuestas[c.id]);
      if (!contestadas) return { fila: rf.fila, estado: "incompleta", rf };

      const todasCorrectas = variablesFila.every((c) => respuestas[c.id] === c.valorEsperado);
      return {
        fila: rf.fila,
        estado: todasCorrectas ? "valida" : "conflicto",
        rf,
      };
    });
  }, [tablero, respuestas]);

  // Evaluación de columnas
  const estadoColumnas = useMemo(() => {
    return tablero.restriccionesColumnas.map((rc) => {
      const celdasCol = tablero.celdas.filter((c) => c.col === rc.col);
      const variablesCol = celdasCol.filter((c) => c.tipo === "variable");
      if (variablesCol.length === 0) return { col: rc.col, estado: "valida", rc };

      const contestadas = variablesCol.every((c) => !!respuestas[c.id]);
      if (!contestadas) return { col: rc.col, estado: "incompleta", rc };

      const todasCorrectas = variablesCol.every((c) => respuestas[c.id] === c.valorEsperado);
      return {
        col: rc.col,
        estado: todasCorrectas ? "valida" : "conflicto",
        rc,
      };
    });
  }, [tablero, respuestas]);

  // Porcentaje de coherencia sistémica
  const variablesTotales = useMemo(() => tablero.celdas.filter((c) => c.tipo === "variable"), [tablero]);
  const variablesCorrectas = useMemo(() => {
    return variablesTotales.filter((c) => respuestas[c.id] === c.valorEsperado).length;
  }, [variablesTotales, respuestas]);

  const pctCoherencia = Math.round((variablesCorrectas / variablesTotales.length) * 100);
  const esTableroCompletado = pctCoherencia === 100;

  function verificarYGuardar() {
    if (esTableroCompletado) {
      onCompletarTablero(tablero.id, tablero.recompensaXP, tablero.badgeRelacionado);
      const badgeInfo = BADGES.find((b) => b.id === tablero.badgeRelacionado);
      setMensajeExito(`¡Excelente razonamiento sistémico! Has superado el desafío matricial y ganado ${tablero.recompensaXP} XP ${badgeInfo ? `e insignia "${badgeInfo.nombre}"` : ""}.`);
    }
  }

  function reiniciarTablero() {
    setRespuestas({});
    setMensajeExito(null);
  }

  return (
    <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 transition-all">
      {/* HEADER DEL RETO */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gradient-to-r from-violet-600 to-brand px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-sm">
              CrossIP · Lógica Matricial
            </span>
            {yaCompletado && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                ✓ Resuelto previamente
              </span>
            )}
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">{tablero.titulo}</h2>
          <p className="text-xs text-ink-soft">{tablero.subtitulo}</p>
        </div>

        {/* SELECTOR DE TABLEROS */}
        <div className="flex items-center gap-2">
          {TABLEROS_CROSSIP.map((t, idx) => {
            const activo = t.id === tablero.id;
            const resuelto = tablerosResueltos.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTableroActivoId(t.id);
                  setRespuestas({});
                  setMensajeExito(null);
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activo
                    ? "bg-brand text-brand-foreground shadow-md shadow-brand/25"
                    : "glass text-ink-soft hover:bg-white/80"
                }`}
              >
                Reto 0{idx + 1} {resuelto ? "🏆" : "🧩"}
              </button>
            );
          })}
        </div>
      </div>

      {/* BARRA DE COHERENCIA SISTÉMICA */}
      <div className="mb-6 flex items-center justify-between rounded-2xl bg-white/70 p-4 shadow-sm border border-slate-200/50">
        <div className="flex-1 pr-6">
          <div className="flex justify-between text-xs font-semibold text-ink mb-1.5">
            <span>Coherencia Sistémica y Normativa</span>
            <span className={pctCoherencia === 100 ? "text-emerald-600 font-bold" : "text-brand"}>
              {pctCoherencia}% ({variablesCorrectas} de {variablesTotales.length} restricciones resueltas)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pctCoherencia === 100
                  ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "bg-gradient-to-r from-brand to-accent-cyan"
              }`}
              style={{ width: `${pctCoherencia}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] uppercase tracking-wider text-ink-mute font-bold">Recompensa</span>
          <p className="font-display text-base font-extrabold text-brand">+{tablero.recompensaXP} XP</p>
        </div>
      </div>

      {/* MENSAJE DE ÉXITO */}
      {mensajeExito && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 text-emerald-900 shadow-md">
          <span className="text-3xl">🎉</span>
          <div>
            <p className="font-display font-bold text-sm">¡Malla de Restricciones Validada!</p>
            <p className="text-xs text-emerald-800">{mensajeExito}</p>
          </div>
        </div>
      )}

      {/* TABLERO MATRICIAL TIPO CROSSMATH */}
      <div className="overflow-x-auto pb-4">
        <table className="w-full border-separate border-spacing-3 text-left">
          <thead>
            <tr>
              <th className="p-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-mute">
                Eje de Análisis
              </th>
              {tablero.columnasEncabezado.map((col, idx) => (
                <th
                  key={idx}
                  className="rounded-xl bg-slate-100/90 p-3 text-xs font-bold text-ink shadow-sm border border-slate-200/60"
                >
                  <span className="text-brand text-[10px] block font-mono">COLUMNA 0{idx + 1}</span>
                  {col}
                </th>
              ))}
              <th className="p-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-mute">
                Estado Fila
              </th>
            </tr>
          </thead>
          <tbody>
            {tablero.filasEncabezado.map((filaEncabezado, fIndex) => {
              const celdasFila = tablero.celdas.filter((c) => c.fila === fIndex);
              const estFila = estadoFilas.find((ef) => ef.fila === fIndex);

              return (
                <tr key={fIndex}>
                  {/* Encabezado Fila */}
                  <td className="w-48 rounded-xl bg-slate-50/90 p-3 text-xs font-semibold text-ink-soft border border-slate-200/50">
                    <span className="text-accent-cyan text-[10px] block font-mono">FILA 0{fIndex + 1}</span>
                    {filaEncabezado}
                  </td>

                  {/* Celdas de la Fila */}
                  {celdasFila.map((celda) => {
                    const esFijo = celda.tipo === "fijo";
                    const valorActual = getValorCelda(celda);
                    const tieneValor = !!valorActual;
                    const esCorrecto = valorActual === celda.valorEsperado;

                    return (
                      <td
                        key={celda.id}
                        className={`rounded-2xl p-3.5 transition-all min-w-[200px] border ${
                          esFijo
                            ? "bg-slate-100/80 text-ink font-semibold text-xs border-slate-200"
                            : tieneValor
                              ? esCorrecto
                                ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                                : "bg-rose-50/90 border-rose-300 text-rose-950"
                              : "bg-white/80 border-dashed border-brand/30 hover:border-brand"
                        }`}
                      >
                        {esFijo ? (
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 text-[10px] font-mono mt-0.5">🔒</span>
                            <span className="text-xs leading-snug">{celda.etiqueta}</span>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                                Variable #{celda.id}
                              </span>
                              {tieneValor && (
                                <span className={`text-xs font-bold ${esCorrecto ? "text-emerald-600" : "text-rose-600"}`}>
                                  {esCorrecto ? "✓ Coincide" : "✗ Conflicto"}
                                </span>
                              )}
                            </div>

                            <select
                              value={valorActual}
                              onChange={(e) => handleSeleccion(celda.id, e.target.value)}
                              className="w-full rounded-xl border border-slate-300/80 bg-white/95 p-2 text-xs font-medium text-ink shadow-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
                            >
                              <option value="">-- Elige la variable --</option>
                              {celda.opciones?.map((op) => (
                                <option key={op} value={op}>
                                  {op}
                                </option>
                              ))}
                            </select>

                            {celda.pista && (
                              <p className="mt-1.5 text-[10px] text-ink-mute leading-tight">
                                💡 {celda.pista}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}

                  {/* Estado Fila */}
                  <td className="w-36 p-2 text-xs">
                    {estFila?.estado === "valida" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                        ✓ Sin colisión
                      </span>
                    )}
                    {estFila?.estado === "conflicto" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-800">
                        ✗ Incompatible
                      </span>
                    )}
                    {estFila?.estado === "incompleta" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                        ⏳ En curso
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FEEDBACK Y AUDITORÍA DE RESTRICCIONES */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-brand mb-2">
            Restricciones de Filas (Rutas de Protección)
          </p>
          <ul className="space-y-2 text-xs">
            {estadoFilas.map((ef) => (
              <li
                key={ef.fila}
                className={`flex items-start gap-2 rounded-xl p-2.5 ${
                  ef.estado === "valida"
                    ? "bg-emerald-50/80 text-emerald-900 border border-emerald-200"
                    : ef.estado === "conflicto"
                      ? "bg-rose-50/80 text-rose-900 border border-rose-200"
                      : "bg-slate-50 text-ink-mute"
                }`}
              >
                <span>{ef.estado === "valida" ? "✓" : ef.estado === "conflicto" ? "!" : "○"}</span>
                <div>
                  <p className="font-semibold">{ef.rf.descripcion}</p>
                  <p className="text-[11px] mt-0.5 opacity-90">
                    {ef.estado === "valida"
                      ? ef.rf.explicacionExito
                      : ef.estado === "conflicto"
                        ? ef.rf.explicacionFallo
                        : "Completa las celdas de esta fila para validar la restricción."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2">
            Restricciones de Columnas (Condiciones Legales)
          </p>
          <ul className="space-y-2 text-xs">
            {estadoColumnas.map((ec) => (
              <li
                key={ec.col}
                className={`flex items-start gap-2 rounded-xl p-2.5 ${
                  ec.estado === "valida"
                    ? "bg-emerald-50/80 text-emerald-900 border border-emerald-200"
                    : ec.estado === "conflicto"
                      ? "bg-rose-50/80 text-rose-900 border border-rose-200"
                      : "bg-slate-50 text-ink-mute"
                }`}
              >
                <span>{ec.estado === "valida" ? "✓" : ec.estado === "conflicto" ? "!" : "○"}</span>
                <div>
                  <p className="font-semibold">{ec.rc.descripcion}</p>
                  <p className="text-[11px] mt-0.5 opacity-90">
                    {ec.estado === "valida"
                      ? ec.rc.explicacionExito
                      : ec.estado === "conflicto"
                        ? ec.rc.explicacionFallo
                        : "Completa las celdas de esta columna para contrastar coherencia."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200/60 pt-4">
        <button
          type="button"
          onClick={reiniciarTablero}
          className="rounded-xl px-4 py-2.5 text-xs font-semibold text-ink-soft hover:bg-slate-100 transition-colors"
        >
          Limpiar Tablero
        </button>

        <button
          type="button"
          disabled={!esTableroCompletado}
          onClick={verificarYGuardar}
          className="rounded-xl bg-gradient-to-r from-brand to-accent-cyan px-6 py-3 font-display text-xs font-bold text-white shadow-lg shadow-brand/25 disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
        >
          {esTableroCompletado ? "Consolidar Solución & Reclamar XP 🏆" : "Resuelve todas las colisiones para validar"}
        </button>
      </div>
    </div>
  );
}
