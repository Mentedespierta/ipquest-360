import React, { useState } from "react";
import {
  calcularNotaDetallada,
  actualizarDatosEstudiante,
  type Estado,
  type NotaEvaluacion,
} from "@/lib/progress";

interface GradeEvaluationReportProps {
  estado: Estado;
  onActualizarEstado: (fn: (prev: Estado) => Estado) => void;
  onNavegarActividad: (pestaña: string) => void;
}

export function GradeEvaluationReport({
  estado,
  onActualizarEstado,
  onNavegarActividad,
}: GradeEvaluationReportProps) {
  const [modoEdicion, setModoEdicion] = useState(!estado.nombreEstudiante);
  const [nombre, setNombre] = useState(estado.nombreEstudiante || "");
  const [identificacion, setIdentificacion] = useState(estado.identificacion || "");
  const [institucion, setInstitucion] = useState(estado.institucion || "");

  const evaluacion: NotaEvaluacion = calcularNotaDetallada(estado);

  function guardarDatos() {
    onActualizarEstado((prev) =>
      actualizarDatosEstudiante(prev, {
        nombreEstudiante: nombre.trim(),
        identificacion: identificacion.trim(),
        institucion: institucion.trim(),
      })
    );
    setModoEdicion(false);
  }

  function imprimirReporte() {
    window.print();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* TARJETA SUPERIOR: REGISTRO DEL ESTUDIANTE / PARTICIPANTE */}
      <div className="glass rounded-3xl p-6 border border-slate-200/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-brand bg-brand/10 px-2.5 py-1 rounded-md">
              Registro Oficial de Participación
            </span>
            <h3 className="font-display text-xl font-bold text-ink mt-1">
              Ficha del Estudiante & Acreditación de Cumplimiento
            </h3>
            <p className="text-xs text-ink-soft">
              Datos registrados para la asignación y validación de nota por el docente instructor.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModoEdicion(!modoEdicion)}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {modoEdicion ? "Cerrar edición ✕" : "Modificar mis datos ✏️"}
          </button>
        </div>

        {modoEdicion ? (
          <div className="grid gap-4 sm:grid-cols-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Nombres y Apellidos Completos *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Ing. María José Pérez"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Cédula / Identificación / Matrícula
              </label>
              <input
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                placeholder="Ej: 1718293041"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Institución / Laboratorio / Carrera
              </label>
              <input
                type="text"
                value={institucion}
                onChange={(e) => setInstitucion(e.target.value)}
                placeholder="Ej: EPN - Laboratorio de Biotecnología"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={guardarDatos}
                className="rounded-xl bg-brand text-brand-foreground px-5 py-2 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Guardar y Vincular a mis Actividades ✓
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Estudiante</p>
              <p className="font-display text-sm font-extrabold text-slate-900 line-clamp-1">
                {estado.nombreEstudiante || "Sin registrar"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Identificación</p>
              <p className="font-display text-sm font-bold text-slate-800">
                {estado.identificacion || "No especificada"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Institución / Rol</p>
              <p className="font-display text-sm font-bold text-slate-800 line-clamp-1">
                {estado.institucion || estado.perfil || "Participante"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Código Verificación</p>
              <p className="font-mono text-xs font-bold text-brand">{evaluacion.codigoVerificacion}</p>
            </div>
          </div>
        )}
      </div>

      {/* DASHBOARD PRINCIPAL DE CALIFICACIÓN PONDERADA (ESCALA SOBRE 10 PUNTOS) */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* SCORE CARD CENTRAL */}
        <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 p-6 text-white shadow-xl border border-white/10 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="rounded-full bg-accent-cyan/20 text-accent-cyan px-3 py-1 text-[10px] font-black uppercase tracking-wider border border-accent-cyan/30">
              Calificación Oficial Automática
            </span>

            <div className="my-6">
              <div className="inline-block relative">
                <span className="font-display text-6xl font-black text-white tracking-tighter">
                  {evaluacion.notaFinal.toFixed(2)}
                </span>
                <span className="font-display text-xl font-bold text-slate-300 ml-1">/ 10.0</span>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    evaluacion.notaFinal >= 9.0
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : evaluacion.notaFinal >= 8.0
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      : evaluacion.notaFinal >= 7.0
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  }`}
                >
                  Nivel: {evaluacion.equivalenciaCualitativa}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed px-2">
              Promedio ponderado calculado a partir del cumplimiento de las actividades interactivas en la plataforma web.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 relative z-10 space-y-2">
            <button
              type="button"
              onClick={imprimirReporte}
              className="w-full rounded-2xl bg-gradient-to-r from-accent-cyan via-teal-400 to-emerald-400 py-3 font-display text-xs font-black text-slate-950 shadow-lg hover:scale-102 active:scale-98 transition-all"
            >
              🖨️ Imprimir / Guardar Reporte PDF
            </button>
            <p className="text-[10px] text-slate-400">
              Nota oficial homologable para evaluación del módulo docente
            </p>
          </div>
        </div>

        {/* DESGLOSE DE LOS 4 COMPONENTES PONDERADOS */}
        <div className="lg:col-span-8 glass rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-brand">
                Rúbrica de Ponderación
              </p>
              <h4 className="font-display text-lg font-bold text-ink">
                Desglose por Componente Formativo
              </h4>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Total ponderable: 10.0 Puntos
            </span>
          </div>

          <div className="space-y-3">
            {/* COMPONENTE 1: MICROAPRENDIZAJE */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📚</span>
                  <div>
                    <h5 className="font-display text-xs font-extrabold text-slate-900">
                      {evaluacion.componentes.microaprendizaje.nombre}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {evaluacion.componentes.microaprendizaje.detalle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-sm font-black text-brand">
                    {evaluacion.componentes.microaprendizaje.puntosObtenidos.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {" "}
                    / {evaluacion.componentes.microaprendizaje.pesoMaximo.toFixed(1)} pts
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-300"
                    style={{ width: `${evaluacion.componentes.microaprendizaje.porcentaje}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {evaluacion.componentes.microaprendizaje.porcentaje}%
                </span>
                <button
                  type="button"
                  onClick={() => onNavegarActividad("misiones")}
                  className="text-[10px] font-bold text-brand hover:underline"
                >
                  Ir al cuestionario →
                </button>
              </div>
            </div>

            {/* COMPONENTE 2: CRUCIGRAMAS Y MATRICES */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧩</span>
                  <div>
                    <h5 className="font-display text-xs font-extrabold text-slate-900">
                      {evaluacion.componentes.crucigramas.nombre}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {evaluacion.componentes.crucigramas.detalle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-sm font-black text-emerald-600">
                    {evaluacion.componentes.crucigramas.puntosObtenidos.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {" "}
                    / {evaluacion.componentes.crucigramas.pesoMaximo.toFixed(1)} pts
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${evaluacion.componentes.crucigramas.porcentaje}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {evaluacion.componentes.crucigramas.porcentaje}%
                </span>
                <button
                  type="button"
                  onClick={() => onNavegarActividad("crucigramas")}
                  className="text-[10px] font-bold text-emerald-600 hover:underline"
                >
                  Ir a resolver →
                </button>
              </div>
            </div>

            {/* COMPONENTE 3: DUELO TUG OF WAR */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚔️</span>
                  <div>
                    <h5 className="font-display text-xs font-extrabold text-slate-900">
                      {evaluacion.componentes.duelo.nombre}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {evaluacion.componentes.duelo.detalle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-sm font-black text-sky-600">
                    {evaluacion.componentes.duelo.puntosObtenidos.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {" "}
                    / {evaluacion.componentes.duelo.pesoMaximo.toFixed(1)} pts
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-300"
                    style={{ width: `${evaluacion.componentes.duelo.porcentaje}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {evaluacion.componentes.duelo.porcentaje}%
                </span>
                <button
                  type="button"
                  onClick={() => onNavegarActividad("duelo")}
                  className="text-[10px] font-bold text-sky-600 hover:underline"
                >
                  Jugar duelo →
                </button>
              </div>
            </div>

            {/* COMPONENTE 4: LABORATORIO IAM-360 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📊</span>
                  <div>
                    <h5 className="font-display text-xs font-extrabold text-slate-900">
                      {evaluacion.componentes.laboratorioIAM.nombre}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {evaluacion.componentes.laboratorioIAM.detalle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-sm font-black text-purple-600">
                    {evaluacion.componentes.laboratorioIAM.puntosObtenidos.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {" "}
                    / {evaluacion.componentes.laboratorioIAM.pesoMaximo.toFixed(1)} pts
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${evaluacion.componentes.laboratorioIAM.porcentaje}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {evaluacion.componentes.laboratorioIAM.porcentaje}%
                </span>
                <button
                  type="button"
                  onClick={() => onNavegarActividad("iam360")}
                  className="text-[10px] font-bold text-purple-600 hover:underline"
                >
                  Abrir laboratorio →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VISTA OFICIAL DE IMPRESIÓN (SOLO APARECE AL IMPRIMIR O EN REPORTE) */}
      <div className="p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-slate-900 font-display text-xl font-black text-white">
              CITT
            </div>
            <div>
              <p className="font-display text-base font-black text-slate-950 uppercase tracking-tight">
                Corporación de Promoción Económica CONQUITO · CITT
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Red Metropolitana de Laboratorios · Certificación de Cumplimiento en Serious Learning Game
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Código de Emisión</p>
            <p className="font-mono text-xs font-black text-slate-900">{evaluacion.codigoVerificacion}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
          <div>
            <p><strong>Estudiante / Evaluado:</strong> {estado.nombreEstudiante || "—"}</p>
            <p className="mt-1"><strong>Documento de Identidad:</strong> {estado.identificacion || "—"}</p>
            <p className="mt-1"><strong>Entidad / Carrera:</strong> {estado.institucion || estado.perfil || "—"}</p>
          </div>
          <div>
            <p><strong>Objeto Tecnológico Diagnosticado:</strong> {estado.objeto || "TECNOLOGÍA"}</p>
            <p className="mt-1"><strong>Fecha de Registro / Evaluación:</strong> {estado.fechaRegistro || "Hoy"}</p>
            <p className="mt-1">
              <strong>Calificación Final Acreditada:</strong>{" "}
              <span className="font-bold text-slate-950 text-sm">
                {evaluacion.notaFinal.toFixed(2)} / 10.00 ({evaluacion.equivalenciaCualitativa})
              </span>
            </p>
          </div>
        </div>

        {/* TABLA DE FIRMAS PARA EL DOCENTE */}
        <div className="grid grid-cols-2 gap-12 pt-10 mt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="border-b border-slate-400 w-48 mx-auto mb-2" />
            <p className="font-bold text-xs text-slate-900">{estado.nombreEstudiante || "Firma del Estudiante"}</p>
            <p className="text-[10px] text-slate-500">Participante Evaluado</p>
          </div>
          <div className="text-center">
            <div className="border-b border-slate-400 w-48 mx-auto mb-2" />
            <p className="font-bold text-xs text-slate-900">Docente / Instructor Especialista</p>
            <p className="text-[10px] text-slate-500">Articulación Tecnológica & PI · CITT</p>
          </div>
        </div>
      </div>
    </div>
  );
}
