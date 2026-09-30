import React, { useState } from "react";
import type { InventarioIAMState, ActivoIAM } from "@/lib/progress";

interface IAM360LabProps {
  inventario: InventarioIAMState;
  onActualizarInventario: (nuevo: InventarioIAMState) => void;
  perfil: string | null;
  objeto: string | null;
}

export function IAM360Lab({
  inventario,
  onActualizarInventario,
  perfil,
  objeto,
}: IAM360LabProps) {
  const [nombreProyecto, setNombreProyecto] = useState(
    inventario.nombreProyecto || `${objeto || "Emprendimiento"} Innovador IQ-2026`
  );
  const [nuevoNombreActivo, setNuevoNombreActivo] = useState("");
  const [nuevaNaturaleza, setNuevaNaturaleza] = useState<ActivoIAM["naturaleza"]>("Signo Distintivo");
  const [nuevaVia, setNuevaVia] = useState("Registro de Marca");
  const [nuevoRiesgo, setNuevoRiesgo] = useState<ActivoIAM["riesgo"]>("Medio");
  const [nuevoIarl, setNuevoIarl] = useState(4);

  function agregarActivo() {
    if (!nuevoNombreActivo.trim()) return;
    const nuevo: ActivoIAM = {
      id: `act-${Date.now()}`,
      nombre: nuevoNombreActivo,
      naturaleza: nuevaNaturaleza,
      derechoAsociado: nuevaVia,
      titularidad: "Propia",
      riesgo: nuevoRiesgo,
      iarl: nuevoIarl,
    };

    const nuevosActivos = [...inventario.activos, nuevo];
    const avgIarl = Math.round(
      nuevosActivos.reduce((acc, curr) => acc + curr.iarl, 0) / nuevosActivos.length
    );

    const actualizado: InventarioIAMState = {
      ...inventario,
      nombreProyecto,
      activos: nuevosActivos,
      iarlGlobal: avgIarl,
    };

    onActualizarInventario(actualizado);
    setNuevoNombreActivo("");
  }

  function eliminarActivo(id: string) {
    const filtrados = inventario.activos.filter((a) => a.id !== id);
    const avgIarl = filtrados.length
      ? Math.round(filtrados.reduce((acc, curr) => acc + curr.iarl, 0) / filtrados.length)
      : 1;

    onActualizarInventario({
      ...inventario,
      activos: filtrados,
      iarlGlobal: avgIarl,
    });
  }

  function imprimirReporte() {
    window.print();
  }

  return (
    <div className="space-y-6">
      {/* PANEL DE CONTROL DEL PROYECTO */}
      <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 border border-white/60">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
          <div>
            <span className="rounded-full bg-accent-cyan/30 px-3 py-1 text-[11px] font-extrabold tracking-wider text-ink uppercase">
              IAM-360 · Intangible Asset Management Lab
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">
              Diagnóstico e Inventario de Activos Intangibles
            </h2>
            <p className="text-xs text-ink-soft">
              Aplica los conocimientos adquiridos a tu propio proyecto real para generar tu evidencia de aprendizaje.
            </p>
          </div>

          <button
            type="button"
            onClick={imprimirReporte}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all"
          >
            <span>🖨️</span> Descargar / Imprimir Reporte (PDF)
          </button>
        </div>

        {/* METADATOS DEL PROYECTO */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-[11px] font-bold text-ink-mute uppercase tracking-wider block mb-1">
              Nombre de tu Organización / Proyecto
            </label>
            <input
              type="text"
              value={nombreProyecto}
              onChange={(e) => {
                setNombreProyecto(e.target.value);
                onActualizarInventario({ ...inventario, nombreProyecto: e.target.value });
              }}
              className="w-full rounded-xl border border-slate-300 bg-white/90 p-2.5 text-xs font-semibold text-ink shadow-sm focus:border-brand focus:outline-none"
              placeholder="Ej. BioQuito Labs, App AgroTech..."
            />
          </div>

          <div className="rounded-2xl bg-white/60 p-3.5 border border-slate-200/60 text-center">
            <span className="text-[10px] font-bold text-ink-mute uppercase tracking-wider block">
              Perfil / Rol de Estudio
            </span>
            <p className="font-display font-bold text-sm text-brand mt-1">{perfil || "Emprendedor"}</p>
            <span className="text-[10px] text-ink-soft">Objeto: {objeto || "EMPRENDIMIENTO"}</span>
          </div>

          <div className="rounded-2xl bg-white/60 p-3.5 border border-slate-200/60 text-center">
            <span className="text-[10px] font-bold text-ink-mute uppercase tracking-wider block">
              Madurez Intangible (IARL Global)
            </span>
            <p className="font-display font-extrabold text-2xl text-emerald-600 mt-0.5">
              Nivel {inventario.iarlGlobal} / 9
            </p>
            <span className="text-[10px] text-ink-soft">Intangible Asset Readiness Level</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO PARA REGISTRAR NUEVO ACTIVO */}
      <div className="glass rounded-3xl p-6 shadow-md shadow-brand/5 border border-slate-200/60">
        <h3 className="font-display text-base font-bold text-ink mb-4">
          + Agregar Nuevo Activo Intangible al Inventario
        </h3>
        <div className="grid gap-3 sm:grid-cols-5">
          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-ink-mute uppercase block mb-1">
              Descripción del Activo
            </label>
            <input
              type="text"
              value={nuevoNombreActivo}
              onChange={(e) => setNuevoNombreActivo(e.target.value)}
              placeholder="Ej. Algoritmo de visión artificial, Marca, Receta..."
              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-ink-mute uppercase block mb-1">Naturaleza</label>
            <select
              value={nuevaNaturaleza}
              onChange={(e) => setNuevaNaturaleza(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs text-ink focus:border-brand focus:outline-none"
            >
              <option value="Signo Distintivo">Signo Distintivo</option>
              <option value="Creación Técnica">Creación Técnica</option>
              <option value="Obra Autoral">Obra Autoral</option>
              <option value="Información Confidencial">Información Confidencial</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-ink-mute uppercase block mb-1">Nivel IARL (1-9)</label>
            <select
              value={nuevoIarl}
              onChange={(e) => setNuevoIarl(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs text-ink focus:border-brand focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  IARL {n} {n >= 7 ? "(Consolidado)" : n >= 4 ? "(En desarrollo)" : "(Temprano)"}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={agregarActivo}
              className="w-full rounded-xl bg-brand py-2 px-3 font-display text-xs font-bold text-brand-foreground shadow-md shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
            >
              + Agregar
            </button>
          </div>
        </div>
      </div>

      {/* TABLA DE INVENTARIO Y MATRIZ DE RIESGOS */}
      <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 border border-slate-200/60 overflow-x-auto">
        <h3 className="font-display text-base font-bold text-ink mb-3">
          Inventario Activo de Intangibles y Matriz de Riesgo Legal
        </h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-ink-mute uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Activo Intangible</th>
              <th className="py-2.5 px-3">Naturaleza</th>
              <th className="py-2.5 px-3">Vía de Protección Sugerida</th>
              <th className="py-2.5 px-3">Nivel IARL</th>
              <th className="py-2.5 px-3">Semáforo de Riesgo</th>
              <th className="py-2.5 px-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventario.activos.map((act) => (
              <tr key={act.id} className="hover:bg-white/40 transition-colors">
                <td className="py-3 px-3 font-bold text-ink">{act.nombre}</td>
                <td className="py-3 px-3 text-ink-soft">{act.naturaleza}</td>
                <td className="py-3 px-3 text-brand font-medium">{act.derechoAsociado}</td>
                <td className="py-3 px-3 font-mono font-bold text-ink">Nivel {act.iarl}/9</td>
                <td className="py-3 px-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                      act.riesgo === "Alto"
                        ? "bg-rose-100 text-rose-800"
                        : act.riesgo === "Medio"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {act.riesgo}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => eliminarActivo(act.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors font-bold text-sm"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
