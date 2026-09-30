export type Badge = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  icono: string;
  competencia: string;
  requisito: string;
  colorGradiente: string;
  criterioId: string;
};

export const BADGES: Badge[] = [
  {
    id: "badge-branding",
    nombre: "Branding Shield",
    categoria: "Signos Distintivos",
    descripcion: "Domina la diferenciación entre marcas nominativas, figurativas, mixtas, nombres comerciales y causales de irregistrabilidad (Decisión 486 CAN).",
    icono: "🛡️",
    competencia: "C1 Identificar / C7 Relacionar",
    requisito: "Completar el Dominio D06 o resolver el CrossIP de Signos Distintivos con 100% de coherencia.",
    colorGradiente: "from-amber-400 via-orange-500 to-rose-600",
    criterioId: "D06",
  },
  {
    id: "badge-copyright",
    nombre: "Copyright Vanguard",
    categoria: "Derecho de Autor & IA",
    descripcion: "Resuelve con rigor la titularidad en obras por encargo, protección de código fuente de software y delimitación de obras asistidas por Inteligencia Artificial.",
    icono: "📜",
    competencia: "C5 Explicar / C11 Decidir",
    requisito: "Completar el Dominio D05 de Derecho de Autor y Software.",
    colorGradiente: "from-blue-500 via-indigo-600 to-purple-700",
    criterioId: "D05",
  },
  {
    id: "badge-secrets",
    nombre: "Trade Secret Sentinel",
    categoria: "Secretos Empresariales",
    descripcion: "Implementa las tres condiciones de protección del secreto: valor comercial por secreto, no accesibilidad y medidas razonables de seguridad física/digital (NDAs).",
    icono: "🔐",
    competencia: "C13 Implementar",
    requisito: "Completar el Dominio D11 y aplicar medidas de mitigación en el laboratorio.",
    colorGradiente: "from-emerald-400 via-teal-600 to-cyan-700",
    criterioId: "D11",
  },
  {
    id: "badge-patents",
    nombre: "Patent & FTO Navigator",
    categoria: "Patentes & Vigilancia",
    descripcion: "Evalúa los tres requisitos de patentabilidad (novedad, nivel inventivo y aplicación industrial) y construye árboles de libertad de operación (Clearance).",
    icono: "⚙️",
    competencia: "C9 Analizar / C10 Evaluar",
    requisito: "Superar el desafío CrossIP de Patentes vs. Secreto con cero colisiones legales.",
    colorGradiente: "from-cyan-400 via-blue-600 to-violet-800",
    criterioId: "D09",
  },
  {
    id: "badge-master",
    nombre: "Master IAM 360",
    categoria: "Estrategia Integral",
    descripcion: "Acreditación suprema de articulación tecnológica: orquesta inventario de activos, medición de madurez IARL y hoja de ruta de transferencia tecnológica.",
    icono: "🏆",
    competencia: "C14 Crear / C15 Mejorar",
    requisito: "Obtener las 4 insignias previas y generar el diagnóstico integral de tu emprendimiento.",
    colorGradiente: "from-amber-300 via-yellow-500 to-yellow-700",
    criterioId: "ALL",
  },
];
