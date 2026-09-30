import React, { useState } from "react";
import { DOMINIOS, type Dominio } from "@/lib/content";

interface KnowledgeBaseProps {
  onIrAlDominio: (dominioId: string) => void;
}

type FichaDetalle = {
  dominioId: string;
  subtitulo: string;
  articulosClave: string;
  conceptosClave: { termino: string; definicion: string }[];
  casoPractico: { titulo: string; situacion: string; resolucion: string };
  erroresComunes: string[];
};

const FICHAS_EXTENDIDAS: Record<string, FichaDetalle> = {
  D01: {
    dominioId: "D01",
    subtitulo: "De los registros primarios a la capacidad tecnológica organizacional",
    articulosClave: "Modelo Nonaka-Takeuchi · Norma UNE 166002 (Gestión de la I+D+i)",
    conceptosClave: [
      {
        termino: "Dato vs. Información",
        definicion:
          "El dato es una observación aislada sin contexto (ej: 42°C). La información le añade contexto, propósito y relación operativa (ej: la caldera alcanzó 42°C durante la reacción química).",
      },
      {
        termino: "Conocimiento Tácito vs. Explícito",
        definicion:
          "El conocimiento tácito reside en la mente y destreza de las personas; no está codificado. El conocimiento explícito está documentado en manuales, planos, fórmulas y bases de datos.",
      },
      {
        termino: "Recurso vs. Activo Intangible",
        definicion:
          "Un recurso intangible es una capacidad o elemento no monetario. Se convierte en activo intangible cuando la entidad ejerce control exclusivo sobre él y espera beneficios económicos futuros demostrables.",
      },
    ],
    casoPractico: {
      titulo: "Caso: La fuga de conocimiento en un laboratorio de alimentos",
      situacion:
        "Una ingeniera química diseñó un protocolo de fermentación único pero no lo documentó en bitácoras formales. Al cambiar de empleo, el laboratorio no pudo replicar los lotes estándar.",
      resolucion:
        "Se debió implementar un proceso deliberado de externalización del conocimiento tácito (protocolos operativos estándar SOPs y bitácoras auditables) antes de la desvinculación.",
    },
    erroresComunes: [
      "Creer que comprar maquinaria de última generación equivale a poseer capacidad tecnológica.",
      "Asumir que toda base de datos o idea es automáticamente un activo intangible protegido.",
    ],
  },
  D04: {
    dominioId: "D04",
    subtitulo: "Principios rectores de la Propiedad Intelectual: Territorialidad y Temporalidad",
    articulosClave: "Convenio de París (Art. 4) · Decisión 486 CAN · Código Ingenios",
    conceptosClave: [
      {
        termino: "Principio de Territorialidad",
        definicion:
          "Los derechos de propiedad industrial solo confieren monopolio dentro de las fronteras del Estado que los otorgó. Una patente en Ecuador no protege en Colombia salvo trámite en la fase nacional respectiva.",
      },
      {
        termino: "Principio de Temporalidad",
        definicion:
          "Los monopolios sobre invenciones tienen un plazo perentorio fijado por la ley (20 años patentes, 10 años modelos de utilidad). Cumplido el plazo, la tecnología pasa al dominio público irreversiblemente.",
      },
      {
        termino: "Cadena de Titularidad",
        definicion:
          "Rastreo jurídico documentado que acredita cómo los derechos patrimoniales se transfirieron desde los inventores/autores personas naturales hacia la universidad, empresa o consorcio.",
      },
    ],
    casoPractico: {
      titulo: "Caso: Venta de tecnología con titularidad fragmentada",
      situacion:
        "Un consorcio universitario desarrolló un biorreactor con financiamiento de un fondo público y tres pasantes que no firmaron cesión de derechos.",
      resolucion:
        "Para licenciar o transferir la patente, el licenciatario exigió subsanar la cadena de titularidad requiriendo contratos de cesión firmados por cada uno de los inventores nombrados.",
    },
    erroresComunes: [
      "Creer que existe una «patente mundial» que protege automáticamente en todos los países.",
      "Omitir la firma de convenios de cesión de derechos con pasantes, tesistas y prestadores de servicios.",
    ],
  },
  D05: {
    dominioId: "D05",
    subtitulo: "Régimen Autoral, Protección de Software y Licenciamiento",
    articulosClave: "Decisión 351 CAN · Código Ingenios (Arts. 100-140) · Convenio de Berna",
    conceptosClave: [
      {
        termino: "Nacimiento Declarativo del Derecho",
        definicion:
          "El derecho de autor nace con el acto mismo de la creación plasmada en soporte material. El registro en SENADI es declarativo y actúa como medio de prueba calificada, no como condición constitutiva.",
      },
      {
        termino: "Derechos Morales vs. Patrimoniales",
        definicion:
          "Los derechos morales (paternidad e integridad) son perpetuos, inalienables e irrenunciables. Los patrimoniales (reproducción, distribución, transformación) son transferibles y negociables.",
      },
      {
        termino: "Protección del Software (Soporte Lógico)",
        definicion:
          "El software se protege como obra literaria. Quedan amparados el código fuente, el código objeto y la documentación técnica, pero no los principios matemáticos o ideas subyacentes.",
      },
    ],
    casoPractico: {
      titulo: "Caso: Licenciamiento dual en un SaaS universitario",
      situacion:
        "Un equipo creó una plataforma SaaS con componentes bajo licencia GPL v3 y componentes propietarios propios.",
      resolucion:
        "Al integrar librerías con copyleft fuerte (GPL), el equipo debió aislar el núcleo propietario mediante APIs desacopladas para evitar la obligación de liberar todo su código comercial.",
    },
    erroresComunes: [
      "Creer que el software se patenta de forma automática como cualquier máquina física en la CAN.",
      "Confundir la compra de una licencia de uso con la cesión definitiva de la titularidad del software.",
    ],
  },
  D06: {
    dominioId: "D06",
    subtitulo: "Propiedad Industrial: Signos Distintivos, Marcas y Secretos Empresariales",
    articulosClave: "Decisión 486 CAN (Arts. 134, 190, 260) · Clasificación de Niza",
    conceptosClave: [
      {
        termino: "Aptitud Distintiva (Art. 134 D486)",
        definicion:
          "Cualidad esencial que permite al consumidor distinguir un producto o servicio de sus competidores en el mercado, sin inducir a confusión sobre su origen empresarial.",
      },
      {
        termino: "Lema Comercial vs. Nombre Comercial",
        definicion:
          "El lema comercial es accesorio a una marca solicitada o registrada. El nombre comercial identifica la actividad económica de la empresa y se adquiere por su primer uso público continuo.",
      },
      {
        termino: "Secreto Empresarial (Art. 260 D486)",
        definicion:
          "Información no generalmente conocida ni fácilmente accesible, con valor comercial efectivo o potencial por ser secreta, y sobre la cual se han adoptado medidas razonables de confidencialidad (NDAs, encriptación).",
      },
    ],
    casoPractico: {
      titulo: "Caso: Marca descriptiva rechazada por la autoridad",
      situacion:
        "Una empresa intentó registrar «AGUA PURA NATURAL» para la clase 32. La oficina denegó la solicitud de oficio.",
      resolucion:
        "El signo describe la naturaleza y calidad del producto. Para obtener registro, debió añadirse un elemento de fantasía o diseño figurativo distintivo (marca mixta).",
    },
    erroresComunes: [
      "No renovar la marca antes del vencimiento del decenio o dentro de los 6 meses de gracia.",
      "Divulgar una fórmula o proceso secreto a un inversionista sin un Acuerdo de Confidencialidad (NDA) previo.",
    ],
  },
  D07: {
    dominioId: "D07",
    subtitulo: "Vigilancia Tecnológica, Ecuaciones de Búsqueda y Libertad de Operación (FTO)",
    articulosClave: "Bases de Datos de Patentes (Espacenet, Patentscope) · Clasificación CPC/IPC",
    conceptosClave: [
      {
        termino: "Ecuaciones Booleanas de Búsqueda",
        definicion:
          "Estructuración de términos usando operadores lógicos: AND (intersección restrictiva), OR (unión de sinónimos para mayor recobrado) y NOT (exclusión de ruido temático).",
      },
      {
        termino: "Estado de la Técnica (Novedad Mundial)",
        definicion:
          "Todo aquello que haya sido accesible al público en cualquier lugar del mundo por una descripción escrita, oral, comercialización o uso antes de la fecha de presentación o prioridad.",
      },
      {
        termino: "Estudio de Libertad de Operación (FTO)",
        definicion:
          "Análisis que determina si la comercialización de un producto o proceso específico infringe patentes vigentes de terceros en el territorio de destino.",
      },
    ],
    casoPractico: {
      titulo: "Caso: Lanzamiento comercial con infracción involuntaria",
      situacion:
        "Una startup desarrolló un dispositivo de telemedicina novedoso en Ecuador. Al exportar a Colombia, una multinacional les notificó por infracción de una patente vigente en ese país.",
      resolucion:
        "Se debió ejecutar un informe FTO en los países de destino antes del lanzamiento comercial para identificar reclamaciones activas y diseñar alternativas no infractoras (design around).",
    },
    erroresComunes: [
      "Buscar patentes únicamente en Google general en vez de bases especializadas con códigos CPC.",
      "Confundir patentabilidad (si mi invento es nuevo) con FTO (si mi producto invade derechos ajenos).",
    ],
  },
  D08: {
    dominioId: "D08",
    subtitulo: "Madurez Tecnológica (TRL), Contratos de Licencia y Valoración de Intangibles",
    articulosClave: "Escala TRL NASA/Horizonte 2020 · Normas Internacionales de Valoración (IVS)",
    conceptosClave: [
      {
        termino: "Escala TRL (Niveles 1 al 9)",
        definicion:
          "Métrica objetiva de maduración: TRL 1-3 (principios y prueba analítica), TRL 4-6 (validación en laboratorio y entorno relevante), TRL 7-9 (demostración operativa y despliegue comercial).",
      },
      {
        termino: "Licencia Exclusiva vs. No Exclusiva",
        definicion:
          "En la exclusiva, el titular no puede explotar la tecnología por sí mismo ni otorgar licencias a otros en ese territorio. En la no exclusiva, el titular conserva la facultad de seguir licenciando a terceros.",
      },
      {
        termino: "Método de Valoración por Ingresos",
        definicion:
          "Estima el valor presente neto de los flujos de caja futuros descontados (DCF) atribuibles directamente a la explotación comercial del activo intangible protegido.",
      },
    ],
    casoPractico: {
      titulo: "Caso: Negociación prematura de licencia en TRL bajo",
      situacion:
        "Un centro de I+D intentó vender una patente en TRL 3 exigiendo regalías comerciales del 10% a una farmacéutica.",
      resolucion:
        "El alto riesgo tecnológico impidió el acuerdo. Se reorientó hacia un contrato de codesarrollo colaborativo para llevar la tecnología a TRL 6 antes de pactar la regalía definitiva.",
    },
    erroresComunes: [
      "Intentar valorar un intangible sumando únicamente los gastos contables históricos de desarrollo (costo hundido).",
      "Firmar licencias exclusivas sin fijar metas mínimas de ventas anuales o causales de reversión por inactividad.",
    ],
  },
};

export function KnowledgeBase({ onIrAlDominio }: KnowledgeBaseProps) {
  const [dominioSeleccionadoId, setDominioSeleccionadoId] = useState("D01");

  const dominio = DOMINIOS.find((d) => d.id === dominioSeleccionadoId) || DOMINIOS[0];
  const ficha = FICHAS_EXTENDIDAS[dominio.id] || FICHAS_EXTENDIDAS["D01"];

  return (
    <div className="glass rounded-3xl p-6 shadow-xl shadow-brand/10 border border-white/70 space-y-6">
      {/* HEADER DE LA BIBLIOTECA */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <span className="rounded-full bg-brand/10 text-brand px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase">
            Biblioteca de Conocimiento Especializado
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">
            Fichas Temáticas & Fundamentación Teórica
          </h2>
          <p className="text-xs text-ink-soft">
            Explora a profundidad los conceptos normativos, ejemplos prácticos y doctrina antes de resolver los desafíos evaluativos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onIrAlDominio(dominio.id)}
          className="rounded-2xl bg-gradient-to-r from-brand via-violet-600 to-accent-cyan px-5 py-2.5 font-display text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Practicar este tema en el Cuestionario 🚀
        </button>
      </div>

      {/* SELECTOR DE TEMAS HORIZONTAL */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {DOMINIOS.map((d) => {
          const activo = d.id === dominioSeleccionadoId;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setDominioSeleccionadoId(d.id)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                activo
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-102"
                  : "bg-white/80 hover:bg-white text-slate-700 border-slate-200/70"
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider ${activo ? "text-accent-cyan" : "text-brand"}`}>
                {d.id}
              </span>
              <p className="font-display text-xs font-bold leading-tight mt-1 line-clamp-2">
                {d.nombre}
              </p>
            </button>
          );
        })}
      </div>

      {/* DETALLE COMPLETO DE LA FICHA SELECCIONADA */}
      <div className="grid gap-6 lg:grid-cols-12 items-start mt-4">
        {/* COLUMNA IZQUIERDA: CONCEPTOS FUNDAMENTALES Y BASE LEGAL */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Dominio {dominio.id}
              </span>
              <span className="text-[11px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                {ficha.articulosClave}
              </span>
            </div>
            <h3 className="font-display text-xl font-black text-slate-900">{dominio.nombre}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ficha.subtitulo}</p>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                Conceptos Clave de la Materia:
              </h4>
              <div className="space-y-3">
                {ficha.conceptosClave.map((c) => (
                  <div key={c.termino} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-display text-xs font-extrabold text-brand">{c.termino}</p>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{c.definicion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ERRORES FRECUENTES */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <span>⚠️</span> Errores frecuentes detectados en la práctica:
            </p>
            <ul className="space-y-1.5 text-xs text-amber-950">
              {ficha.erroresComunes.map((err, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COLUMNA DERECHA: CASO PRÁCTICO REAL Y MICROAPRENDIZAJE DIRECTO */}
        <div className="lg:col-span-5 space-y-5">
          {/* CASO PRÁCTICO APLICADO */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 shadow-md border border-white/10">
            <span className="rounded-full bg-accent-cyan/20 text-accent-cyan px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border border-accent-cyan/30">
              Caso de Estudio Real
            </span>
            <h4 className="font-display text-base font-bold text-white mt-2">
              {ficha.casoPractico.titulo}
            </h4>
            <div className="mt-3 space-y-2.5 text-xs text-slate-200">
              <div>
                <p className="font-bold text-accent-cyan">Situación:</p>
                <p className="leading-relaxed opacity-90">{ficha.casoPractico.situacion}</p>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="font-bold text-emerald-400">Dictamen Técnico & Solución:</p>
                <p className="leading-relaxed opacity-90">{ficha.casoPractico.resolucion}</p>
              </div>
            </div>
          </div>

          {/* SÍNTESIS PEDAGÓGICA Y MICROEJEMPLO */}
          <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Microconcepto Destacado
            </p>
            <h5 className="font-display text-sm font-bold text-brand">
              {dominio.micro.titulo}
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dominio.micro.concepto}
            </p>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-950">
              <span className="font-bold text-sky-800">Ejemplo en entorno real:</span>{" "}
              {dominio.micro.ejemplo}
            </div>

            <button
              type="button"
              onClick={() => onIrAlDominio(dominio.id)}
              className="w-full mt-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 text-center transition-colors"
            >
              Comenzar Evaluación Formativa de este Tema →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
