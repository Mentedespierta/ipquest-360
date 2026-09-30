import { useCallback, useEffect, useState } from "react";
import { DOMINIOS, XP_POR_ACIERTO, XP_POR_NIVEL, type Objeto, type Perfil } from "./content";
import { BADGES } from "./badgesData";

export { XP_POR_ACIERTO, XP_POR_NIVEL };

export type ActivoIAM = {
  id: string;
  nombre: string;
  naturaleza: "Creación Técnica" | "Signo Distintivo" | "Obra Autoral" | "Información Confidencial";
  derechoAsociado: string;
  titularidad: "Propia" | "Tercero" | "En Coautoría / Cotitularidad";
  riesgo: "Bajo" | "Medio" | "Alto";
  iarl: number; // 1 a 9
};

export type InventarioIAMState = {
  nombreProyecto: string;
  descripcion: string;
  activos: ActivoIAM[];
  iarlGlobal: number;
};

export type Estado = {
  nombreEstudiante: string;
  identificacion: string;
  institucion: string;
  fechaRegistro: string;
  perfil: Perfil | null;
  objeto: Objeto | null;
  xp: number;
  racha: number;
  ultimoDia: string | null;
  respuestas: Record<string, { ok: boolean; repaso: number }>;
  tablerosResueltos: string[];
  crossmathResueltos: string[];
  dueloVictorias: number;
  dueloPartidas: number;
  dueloPuntajeMaximo: number;
  badgesDesbloqueados: string[];
  inventarioIAM: InventarioIAMState;
};

const CLAVE = "ipquest360:v3";

const inicial: Estado = {
  nombreEstudiante: "",
  identificacion: "",
  institucion: "",
  fechaRegistro: "",
  perfil: null,
  objeto: null,
  xp: 0,
  racha: 0,
  ultimoDia: null,
  respuestas: {},
  tablerosResueltos: [],
  crossmathResueltos: [],
  dueloVictorias: 0,
  dueloPartidas: 0,
  dueloPuntajeMaximo: 0,
  badgesDesbloqueados: [],
  inventarioIAM: {
    nombreProyecto: "",
    descripcion: "",
    activos: [
      {
        id: "act-1",
        nombre: "Marca y Logo del Emprendimiento",
        naturaleza: "Signo Distintivo",
        derechoAsociado: "Marca Mixta (Clase 35/42)",
        titularidad: "Propia",
        riesgo: "Medio",
        iarl: 4,
      },
      {
        id: "act-2",
        nombre: "Código Fuente de la Plataforma",
        naturaleza: "Obra Autoral",
        derechoAsociado: "Derechos de Autor (Soporte Lógico)",
        titularidad: "Propia",
        riesgo: "Bajo",
        iarl: 6,
      },
      {
        id: "act-3",
        nombre: "Base de Clientes y Algoritmo de Scoring",
        naturaleza: "Información Confidencial",
        derechoAsociado: "Secreto Empresarial (Art. 260 D486)",
        titularidad: "Propia",
        riesgo: "Alto",
        iarl: 5,
      },
    ],
    iarlGlobal: 5,
  },
};

function leer(): Estado {
  if (typeof window === "undefined") return inicial;
  try {
    // Intentar leer v3, fallback v2
    let raw = window.localStorage.getItem(CLAVE);
    if (!raw) {
      raw = window.localStorage.getItem("ipquest360:v2");
    }
    if (!raw) return inicial;
    const parseado = JSON.parse(raw);
    return {
      ...inicial,
      ...parseado,
      nombreEstudiante: parseado.nombreEstudiante || "",
      identificacion: parseado.identificacion || "",
      institucion: parseado.institucion || "",
      fechaRegistro: parseado.fechaRegistro || hoyISO(),
      tablerosResueltos: parseado.tablerosResueltos || [],
      crossmathResueltos: parseado.crossmathResueltos || [],
      dueloVictorias: parseado.dueloVictorias || 0,
      dueloPartidas: parseado.dueloPartidas || 0,
      dueloPuntajeMaximo: parseado.dueloPuntajeMaximo || 0,
      badgesDesbloqueados: parseado.badgesDesbloqueados || [],
      inventarioIAM: parseado.inventarioIAM || inicial.inventarioIAM,
    };
  } catch {
    return inicial;
  }
}

export function useProgreso() {
  const [estado, setEstado] = useState<Estado>(inicial);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setEstado(leer());
    setListo(true);
  }, []);

  const guardar = useCallback((siguiente: Estado) => {
    setEstado(siguiente);
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(siguiente));
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const actualizar = useCallback(
    (fn: (prev: Estado) => Estado) => {
      setEstado((prev) => {
        const siguiente = verificarLogrosAutomaticos(fn(prev));
        try {
          window.localStorage.setItem(CLAVE, JSON.stringify(siguiente));
        } catch {
          /* almacenamiento no disponible */
        }
        return siguiente;
      });
    },
    [],
  );

  return { estado, listo, guardar, actualizar };
}

export function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function verificarLogrosAutomaticos(estado: Estado): Estado {
  const badgesNuevos = new Set(estado.badgesDesbloqueados);

  // Dominio D06 (Signos) o CrossIP 1
  if (dominioPct(estado, "D06") >= 60 || estado.tablerosResueltos.includes("crossip-01")) {
    badgesNuevos.add("badge-branding");
  }
  // Dominio D05 (Derecho de autor)
  if (dominioPct(estado, "D05") >= 60) {
    badgesNuevos.add("badge-copyright");
  }
  // Dominio D06 (Secretos/Propiedad industrial)
  if (dominioPct(estado, "D06") >= 100) {
    badgesNuevos.add("badge-secrets");
  }
  // CrossIP 2 o Dominio D07/D08
  if (estado.tablerosResueltos.includes("crossip-02") || dominioPct(estado, "D07") >= 60) {
    badgesNuevos.add("badge-patents");
  }
  // Master IAM si tiene los 4 anteriores y más de 300 XP
  if (
    badgesNuevos.has("badge-branding") &&
    badgesNuevos.has("badge-copyright") &&
    badgesNuevos.has("badge-secrets") &&
    badgesNuevos.has("badge-patents") &&
    estado.xp >= 300
  ) {
    badgesNuevos.add("badge-master");
  }

  return {
    ...estado,
    badgesDesbloqueados: Array.from(badgesNuevos),
  };
}

export function registrarRespuesta(prev: Estado, preguntaId: string, ok: boolean): Estado {
  const dia = hoyISO();
  let racha = prev.racha;
  if (prev.ultimoDia !== dia) {
    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    racha = prev.ultimoDia === ayer ? prev.racha + 1 : 1;
  }
  const dias = ok ? 3 : 1;
  return {
    ...prev,
    xp: prev.xp + (ok ? XP_POR_ACIERTO : 0),
    racha,
    ultimoDia: dia,
    respuestas: {
      ...prev.respuestas,
      [preguntaId]: { ok, repaso: Date.now() + dias * 86400000 },
    },
  };
}

export function completarTableroCrossIP(
  prev: Estado,
  tableroId: string,
  recompensaXP: number,
  badgeId?: string,
): Estado {
  const yaResuelto = prev.tablerosResueltos.includes(tableroId);
  const sumXP = yaResuelto ? Math.round(recompensaXP * 0.3) : recompensaXP;
  const nuevosResueltos = yaResuelto ? prev.tablerosResueltos : [...prev.tablerosResueltos, tableroId];
  const nuevosBadges = badgeId && !prev.badgesDesbloqueados.includes(badgeId)
    ? [...prev.badgesDesbloqueados, badgeId]
    : prev.badgesDesbloqueados;

  return {
    ...prev,
    xp: prev.xp + sumXP,
    tablerosResueltos: nuevosResueltos,
    badgesDesbloqueados: nuevosBadges,
  };
}

export function dominioPct(estado: Estado, dominioId: string) {
  const dom = DOMINIOS.find((d) => d.id === dominioId);
  if (!dom) return 0;
  const ok = dom.preguntas.filter((p) => estado.respuestas[p.id]?.ok).length;
  return Math.round((ok / dom.preguntas.length) * 100);
}

export function estaDesbloqueado(estado: Estado, dominioId: string) {
  const dom = DOMINIOS.find((d) => d.id === dominioId);
  if (!dom) return false;
  if (!dom.requiere) return true;
  return dominioPct(estado, dom.requiere.id) >= dom.requiere.pct;
}

export function nivel(xp: number) {
  return Math.floor(xp / XP_POR_NIVEL) + 1;
}

export function rangoTitulo(lvl: number) {
  if (lvl >= 5) return "Master IAM 360 / Estratega Tecnológico";
  if (lvl >= 4) return "Auditor Senior de Intangibles";
  if (lvl >= 3) return "Especialista en Protección de PI";
  if (lvl >= 2) return "Detective de Signos y Activos";
  return "Explorador de Intangibles";
}

export function xpEnNivel(xp: number) {
  return xp % XP_POR_NIVEL;
}

export function pendientesRepaso(estado: Estado) {
  const ahora = Date.now();
  const res: { pregunta: (typeof DOMINIOS)[number]["preguntas"][number]; dominio: (typeof DOMINIOS)[number] }[] = [];
  for (const dom of DOMINIOS) {
    for (const p of dom.preguntas) {
      const reg = estado.respuestas[p.id];
      if (reg && reg.repaso <= ahora) {
        res.push({ pregunta: p, dominio: dom });
      }
    }
  }
  return res;
}

export function etiquetaRepaso(ts: number) {
  const delta = ts - Date.now();
  if (delta <= 0) return "Hoy";
  const dias = Math.ceil(delta / 86400000);
  return `En ${dias} d`;
}

export function completarCrossmath(prev: Estado, id: string, xp: number): Estado {
  const ya = prev.crossmathResueltos.includes(id);
  const sumXP = ya ? Math.round(xp * 0.3) : xp;
  return {
    ...prev,
    xp: prev.xp + sumXP,
    crossmathResueltos: ya ? prev.crossmathResueltos : [...prev.crossmathResueltos, id],
  };
}

export function registrarResultadoDuelo(prev: Estado, gano: boolean, puntaje: number, xp: number): Estado {
  return {
    ...prev,
    xp: prev.xp + xp,
    dueloPartidas: prev.dueloPartidas + 1,
    dueloVictorias: gano ? prev.dueloVictorias + 1 : prev.dueloVictorias,
    dueloPuntajeMaximo: Math.max(prev.dueloPuntajeMaximo, puntaje),
  };
}

export function actualizarDatosEstudiante(
  prev: Estado,
  datos: {
    nombreEstudiante?: string;
    identificacion?: string;
    institucion?: string;
    perfil?: Perfil | null;
    objeto?: Objeto | null;
  },
): Estado {
  return {
    ...prev,
    nombreEstudiante: datos.nombreEstudiante !== undefined ? datos.nombreEstudiante : prev.nombreEstudiante,
    identificacion: datos.identificacion !== undefined ? datos.identificacion : prev.identificacion,
    institucion: datos.institucion !== undefined ? datos.institucion : prev.institucion,
    perfil: datos.perfil !== undefined ? datos.perfil : prev.perfil,
    objeto: datos.objeto !== undefined ? datos.objeto : prev.objeto,
    fechaRegistro: prev.fechaRegistro || hoyISO(),
  };
}

export type ComponenteNota = {
  nombre: string;
  pesoMaximo: number;
  puntosObtenidos: number;
  porcentaje: number;
  descripcion: string;
  completado: boolean;
  detalle: string;
};

export type NotaEvaluacion = {
  notaFinal: number;
  escalaMax: 10;
  equivalenciaCualitativa: "Sobresaliente" | "Muy Bueno" | "Bueno" | "En Desarrollo" | "Inicial";
  aprobado: boolean;
  totalActividadesCompletadas: number;
  totalActividadesPosibles: number;
  componentes: {
    microaprendizaje: ComponenteNota;
    crucigramas: ComponenteNota;
    duelo: ComponenteNota;
    laboratorioIAM: ComponenteNota;
  };
  codigoVerificacion: string;
};

export function calcularNotaDetallada(estado: Estado): NotaEvaluacion {
  // 1. Microaprendizaje: Total preguntas correctas en los 6 dominios
  const totalPreguntas = DOMINIOS.reduce((acc, d) => acc + d.preguntas.length, 0); // 18 preguntas
  const aciertos = DOMINIOS.reduce((acc, d) => {
    return acc + d.preguntas.filter((p) => estado.respuestas[p.id]?.ok).length;
  }, 0);
  const pctMicro = totalPreguntas > 0 ? aciertos / totalPreguntas : 0;
  const notaMicro = Number((pctMicro * 3.0).toFixed(2));

  // 2. Crucigramas y Lógica Matricial: CrossIP (2 tableros) + Crossmath (3 tableros) = 5 retos
  const TOTAL_RETOS_LOGICA = 5;
  const retosLogicaResueltos = (estado.tablerosResueltos?.length || 0) + (estado.crossmathResueltos?.length || 0);
  const pctLogica = Math.min(1, retosLogicaResueltos / TOTAL_RETOS_LOGICA);
  const notaLogica = Number((pctLogica * 3.0).toFixed(2));

  // 3. Duelo Tug of War (Agilidad de cálculo y conceptos):
  // 1 victoria da 1.2 pts, 2 victorias dan 2.0 pts. Al menos haber participado en 1 da 0.6 pts.
  let notaDuelo = 0;
  if (estado.dueloVictorias >= 2) {
    notaDuelo = 2.0;
  } else if (estado.dueloVictorias === 1) {
    notaDuelo = 1.4;
  } else if (estado.dueloPartidas >= 1) {
    notaDuelo = 0.7;
  }
  const pctDuelo = notaDuelo / 2.0;

  // 4. Laboratorio IAM-360:
  // Proyecto con nombre y al menos 3 activos con IARL asignado
  const tieneProyecto = Boolean(estado.inventarioIAM?.nombreProyecto?.trim());
  const numActivos = estado.inventarioIAM?.activos?.length || 0;
  let notaIAM = 0;
  if (tieneProyecto && numActivos >= 3) {
    notaIAM = 2.0;
  } else if (numActivos >= 3 || (tieneProyecto && numActivos >= 1)) {
    notaIAM = 1.3;
  } else if (numActivos >= 1) {
    notaIAM = 0.8;
  }
  const pctIAM = notaIAM / 2.0;

  // Suma total
  const notaFinalRaw = notaMicro + notaLogica + notaDuelo + notaIAM;
  const notaFinal = Number(Math.min(10, Math.max(0, notaFinalRaw)).toFixed(2));

  let equivalenciaCualitativa: NotaEvaluacion["equivalenciaCualitativa"] = "Inicial";
  if (notaFinal >= 9.0) equivalenciaCualitativa = "Sobresaliente";
  else if (notaFinal >= 8.0) equivalenciaCualitativa = "Muy Bueno";
  else if (notaFinal >= 7.0) equivalenciaCualitativa = "Bueno";
  else if (notaFinal >= 4.0) equivalenciaCualitativa = "En Desarrollo";
  else equivalenciaCualitativa = "Inicial";

  const totalActividadesCompletadas =
    (aciertos >= 12 ? 1 : 0) +
    (estado.tablerosResueltos.length >= 1 ? 1 : 0) +
    (estado.crossmathResueltos.length >= 1 ? 1 : 0) +
    (estado.dueloVictorias >= 1 ? 1 : 0) +
    (tieneProyecto && numActivos >= 3 ? 1 : 0);

  // Hash simple y determinístico para auditoría docente
  const hashSeed = `${estado.nombreEstudiante}|${estado.identificacion}|${estado.xp}|${notaFinal}|${estado.fechaRegistro || hoyISO()}`;
  let hashNum = 0;
  for (let i = 0; i < hashSeed.length; i++) {
    hashNum = (hashNum << 5) - hashNum + hashSeed.charCodeAt(i);
    hashNum |= 0;
  }
  const codigoVerificacion = `CITT-VAL-${Math.abs(hashNum).toString(16).toUpperCase().padStart(8, "0")}`;

  return {
    notaFinal,
    escalaMax: 10,
    equivalenciaCualitativa,
    aprobado: notaFinal >= 7.0,
    totalActividadesCompletadas,
    totalActividadesPosibles: 5,
    componentes: {
      microaprendizaje: {
        nombre: "Cuestionarios de Microaprendizaje (6 Dominios)",
        pesoMaximo: 3.0,
        puntosObtenidos: notaMicro,
        porcentaje: Math.round(pctMicro * 100),
        descripcion: "Evaluación formativa de conceptos normativos y de gestión técnica.",
        completado: pctMicro >= 0.7,
        detalle: `${aciertos} de ${totalPreguntas} preguntas acertadas`,
      },
      crucigramas: {
        nombre: "Lógica Matricial (CrossIP & Crossmath)",
        pesoMaximo: 3.0,
        puntosObtenidos: notaLogica,
        porcentaje: Math.round(pctLogica * 100),
        descripcion: "Resolución de matrices jurídicas y crucigramas numéricos de PI/TRL.",
        completado: pctLogica >= 0.6,
        detalle: `${retosLogicaResueltos} de ${TOTAL_RETOS_LOGICA} retos superados (${estado.tablerosResueltos.length} CrossIP, ${estado.crossmathResueltos.length} Crossmath)`,
      },
      duelo: {
        nombre: "Duelo de Agilidad & Competencias (Tug of War)",
        pesoMaximo: 2.0,
        puntosObtenidos: Number(notaDuelo.toFixed(2)),
        porcentaje: Math.round(pctDuelo * 100),
        descripcion: "Reto de respuesta rápida contra reloj en fórmulas y plazos de PI.",
        completado: estado.dueloVictorias >= 1,
        detalle: `${estado.dueloVictorias} victorias en ${estado.dueloPartidas} partidas (Máx: ${estado.dueloPuntajeMaximo} pts)`,
      },
      laboratorioIAM: {
        nombre: "Laboratorio IAM-360 de Activos Intangibles",
        pesoMaximo: 2.0,
        puntosObtenidos: Number(notaIAM.toFixed(2)),
        porcentaje: Math.round(pctIAM * 100),
        descripcion: "Identificación, clasificación y valoración de madurez (IARL) de activos.",
        completado: tieneProyecto && numActivos >= 3,
        detalle: `${numActivos} activos inventariados · ${tieneProyecto ? "Proyecto identificado" : "Sin título de proyecto"}`,
      },
    },
    codigoVerificacion,
  };
}
