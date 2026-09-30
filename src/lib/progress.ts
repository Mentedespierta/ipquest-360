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
  perfil: Perfil | null;
  objeto: Objeto | null;
  xp: number;
  racha: number;
  ultimoDia: string | null;
  respuestas: Record<string, { ok: boolean; repaso: number }>;
  tablerosResueltos: string[];
  badgesDesbloqueados: string[];
  inventarioIAM: InventarioIAMState;
};

const CLAVE = "ipquest360:v2";

const inicial: Estado = {
  perfil: null,
  objeto: null,
  xp: 0,
  racha: 0,
  ultimoDia: null,
  respuestas: {},
  tablerosResueltos: [],
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
    const raw = window.localStorage.getItem(CLAVE);
    if (!raw) return inicial;
    const parseado = JSON.parse(raw);
    return {
      ...inicial,
      ...parseado,
      tablerosResueltos: parseado.tablerosResueltos || [],
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
