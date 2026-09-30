export type CrossCell = {
  id: string; // ej: "c00", "c01"
  fila: number;
  col: number;
  tipo: "fijo" | "variable";
  etiqueta?: string;
  valorEsperado: string;
  valorActual?: string;
  opciones?: string[];
  pista?: string;
};

export type RestriccionFila = {
  fila: number;
  descripcion: string;
  explicacionExito: string;
  explicacionFallo: string;
};

export type RestriccionColumna = {
  col: number;
  descripcion: string;
  explicacionExito: string;
  explicacionFallo: string;
};

export type TableroCrossIP = {
  id: string;
  titulo: string;
  subtitulo: string;
  dominioId: string;
  badgeRelacionado: string;
  columnasEncabezado: string[];
  filasEncabezado: string[];
  celdas: CrossCell[];
  restriccionesFilas: RestriccionFila[];
  restriccionesColumnas: RestriccionColumna[];
  recompensaXP: number;
};

export const TABLEROS_CROSSIP: TableroCrossIP[] = [
  {
    id: "crossip-01",
    titulo: "CrossIP 01: El Enigma de los Signos Distintivos",
    subtitulo: "Articula la relación entre Naturaleza del Signo, Requisito de Protección y Consecuencia Jurídica sin violar la Decisión 486 CAN.",
    dominioId: "D06",
    badgeRelacionado: "badge-branding",
    columnasEncabezado: ["Activo Intangible", "Mecanismo Legal", "Requisito Sustancial", "Efecto Jurídico"],
    filasEncabezado: [
      "Fila 1: Signo que identifica un producto o servicio",
      "Fila 2: Frase que complementa la promesa de marca",
      "Fila 3: Signo que identifica la actividad mercantil del local",
    ],
    celdas: [
      // Fila 0: Marca
      { id: "c00", fila: 0, col: 0, tipo: "fijo", etiqueta: "Marca de Producto", valorEsperado: "Marca de Producto" },
      {
        id: "c01",
        fila: 0,
        col: 1,
        tipo: "variable",
        valorEsperado: "Registro en SENADI (10 años renovables)",
        opciones: [
          "Registro en SENADI (10 años renovables)",
          "Protección automática sin registro",
          "Depósito Notarial no renovable",
        ],
        pista: "¿Cuál es el trámite formal constitutivo ante la autoridad nacional competente?",
      },
      {
        id: "c02",
        fila: 0,
        col: 2,
        tipo: "variable",
        valorEsperado: "Aptitud Distintiva (Art. 134 D486)",
        opciones: [
          "Aptitud Distintiva (Art. 134 D486)",
          "Novedad Absoluta Mundial",
          "Originalidad en la forma de expresión",
        ],
        pista: "¿Qué cualidad intrínseca exige la Decisión 486 para evitar confundibilidad?",
      },
      { id: "c03", fila: 0, col: 3, tipo: "fijo", etiqueta: "Derecho Exclusivo de Uso en Mercado", valorEsperado: "Derecho Exclusivo de Uso en Mercado" },

      // Fila 1: Lema Comercial
      { id: "c10", fila: 1, col: 0, tipo: "fijo", etiqueta: "Lema Comercial (Slogan)", valorEsperado: "Lema Comercial (Slogan)" },
      {
        id: "c11",
        fila: 1,
        col: 1,
        tipo: "variable",
        valorEsperado: "Vinculación obligatoria a Marca solicitada/registrada",
        opciones: [
          "Vinculación obligatoria a Marca solicitada/registrada",
          "Registro completamente independiente y autónomo",
          "Patente de Modelo de Frase",
        ],
        pista: "En la legislación andina, ¿el lema comercial puede existir sin una marca vinculada?",
      },
      { id: "c12", fila: 1, col: 2, tipo: "fijo", etiqueta: "No inducir a engaño al consumidor", valorEsperado: "No inducir a engaño al consumidor" },
      {
        id: "c13",
        fila: 1,
        col: 3,
        tipo: "variable",
        valorEsperado: "Vigencia atada a la vida legal de la marca vinculada",
        opciones: [
          "Vigencia atada a la vida legal de la marca vinculada",
          "Duración perpetua e indefinida",
          "Expiración a los 2 años si no se pauta en televisión",
        ],
        pista: "¿Qué sucede con el lema si la marca a la que acompaña no se renueva?",
      },

      // Fila 2: Nombre Comercial
      { id: "c20", fila: 2, col: 0, tipo: "fijo", etiqueta: "Nombre Comercial", valorEsperado: "Nombre Comercial" },
      {
        id: "c21",
        fila: 2,
        col: 1,
        tipo: "variable",
        valorEsperado: "Protegido por el primer uso público continuo en el comercio",
        opciones: [
          "Protegido por el primer uso público continuo en el comercio",
          "Concesión por examen de patentabilidad técnica",
          "Solo existe si es constituido en escritura pública",
        ],
        pista: "A diferencia de la marca, ¿cómo nace el derecho sobre el nombre comercial según el art. 191 D486?",
      },
      { id: "c22", fila: 2, col: 2, tipo: "fijo", etiqueta: "Uso real, efectivo y notorio en el mercado", valorEsperado: "Uso real, efectivo y notorio en el mercado" },
      {
        id: "c23",
        fila: 2,
        col: 3,
        tipo: "variable",
        valorEsperado: "Oponibilidad contra marcas posteriores idénticas/confundibles",
        opciones: [
          "Oponibilidad contra marcas posteriores idénticas/confundibles",
          "Exclusividad monopólica a nivel mundial sin límite territorial",
          "Inmunidad tributaria en la comercialización de intangibles",
        ],
        pista: "¿Qué potestad otorga al comerciante frente a un tercero que intenta registrar su nombre como marca?",
      },
    ],
    restriccionesFilas: [
      {
        fila: 0,
        descripcion: "Coherencia en Marca: El registro confiere monopolio si existe aptitud distintiva.",
        explicacionExito: "¡Fila 1 coherente! La marca exige registro formal y aptitud distintiva (art. 134 D486).",
        explicacionFallo: "Inconsistencia en Fila 1: La marca no puede protegerse sin registro ni basarse en novedad de patente.",
      },
      {
        fila: 1,
        descripcion: "Coherencia en Lema Comercial: Debe estar indisolublemente vinculado a una marca base.",
        explicacionExito: "¡Fila 2 coherente! El lema es un accesorio inseparable de la marca registrada.",
        explicacionFallo: "Inconsistencia en Fila 2: El lema comercial no goza de autonomía registral desvinculada.",
      },
      {
        fila: 2,
        descripcion: "Coherencia en Nombre Comercial: Se adquiere por primer uso real, público y continuo.",
        explicacionExito: "¡Fila 3 coherente! El nombre comercial protege al establecimiento y actividad mediante el uso previo demostrable.",
        explicacionFallo: "Inconsistencia en Fila 3: El nombre comercial no requiere examen de fondo inventivo.",
      },
    ],
    restriccionesColumnas: [
      {
        col: 1,
        descripcion: "Columna Mecanismo Legal: Debe reflejar el origen constitutivo o declarativo del derecho.",
        explicacionExito: "Columna de Mecanismos validada: Distingues el sistema registral constitutivo del uso declarativo.",
        explicacionFallo: "Conflicto en Mecanismos Legales: Has cruzado vías registrales erróneas.",
      },
      {
        col: 2,
        descripcion: "Columna Requisitos: Filtro de registrabilidad y validez sustancial.",
        explicacionExito: "Columna de Requisitos superada: Cada signo responde a su propio criterio de validez.",
        explicacionFallo: "Conflicto en Requisitos: No confundas distintividad comercial con originalidad autoral ni novedad.",
      },
      {
        col: 3,
        descripcion: "Columna Efecto Jurídico: Extensión de la protección y oponibilidad a terceros.",
        explicacionExito: "Columna de Efectos consolidada: La oponibilidad y vigencia coinciden exactamente con la norma.",
        explicacionFallo: "Conflicto en Efectos: Has asignado consecuencias jurídicas desproporcionadas o inexistentes.",
      },
    ],
    recompensaXP: 150,
  },
  {
    id: "crossip-02",
    titulo: "CrossIP 02: La Encrucijada Tecnológica (Patente vs. Secreto vs. Software)",
    subtitulo: "Resuelve la vía óptima de articulación ante el dilema de divulgación, novedad e ingeniería inversa.",
    dominioId: "D09",
    badgeRelacionado: "badge-patents",
    columnasEncabezado: ["Activo Tecnológico", "Vía de Protección Idónea", "Condición Crítica", "Riesgo Principal si Falla"],
    filasEncabezado: [
      "Fila 1: Algoritmo central y código fuente ejecutable",
      "Fila 2: Formulación química no deductible por análisis inverso",
      "Fila 3: Dispositivo mecánico con solución técnica novedosa",
    ],
    celdas: [
      // Fila 0: Software
      { id: "c00", fila: 0, col: 0, tipo: "fijo", etiqueta: "Software / Código Fuente", valorEsperado: "Software / Código Fuente" },
      {
        id: "c01",
        fila: 0,
        col: 1,
        tipo: "variable",
        valorEsperado: "Derechos de Autor (Soporte Lógico)",
        opciones: [
          "Derechos de Autor (Soporte Lógico)",
          "Patente de Invención Pura de Algoritmo",
          "Variedad Vegetal",
        ],
        pista: "En la legislación andina (art. 15 D486), los programas de ordenador como tales no son invenciones patentables.",
      },
      {
        id: "c02",
        fila: 0,
        col: 2,
        tipo: "variable",
        valorEsperado: "Originalidad en la expresión del código",
        opciones: [
          "Originalidad en la expresión del código",
          "Nivel inventivo de clase mundial",
          "Depósito previo obligatorio en notaría",
        ],
        pista: "¿Qué protege el derecho autoral: la idea del software o su forma de expresión en código?",
      },
      { id: "c03", fila: 0, col: 3, tipo: "fijo", etiqueta: "Ingeniería limpia de competidor que replique la funcionalidad sin copiar código", valorEsperado: "Ingeniería limpia de competidor que replique la funcionalidad sin copiar código" },

      // Fila 1: Formulación / Secreto
      { id: "c10", fila: 1, col: 0, tipo: "fijo", etiqueta: "Formulación Oculta de Proceso", valorEsperado: "Formulación Oculta de Proceso" },
      {
        id: "c11",
        fila: 1,
        col: 1,
        tipo: "variable",
        valorEsperado: "Secreto Empresarial (Trade Secret)",
        opciones: [
          "Secreto Empresarial (Trade Secret)",
          "Registro Abierto en el Diario Oficial",
          "Modelo de Utilidad con publicación inmediata",
        ],
        pista: "Si no es descubrible por análisis inverso y deseas protección indefinida sin publicar la fórmula, ¿qué vía eliges?",
      },
      {
        id: "c12",
        fila: 1,
        col: 2,
        tipo: "variable",
        valorEsperado: "Medidas razonables de confidencialidad y control (NDAs)",
        opciones: [
          "Medidas razonables de confidencialidad y control (NDAs)",
          "Publicación en revistas científicas indexadas",
          "Divulgación en pitch deck de rondas de inversión",
        ],
        pista: "¿Cuál es la exigencia indispensable del art. 260 de la Decisión 486 para mantener el amparo legal?",
      },
      { id: "c13", fila: 1, col: 3, tipo: "fijo", etiqueta: "Fuga interna de colaboradores o descubrimiento independiente lícito", valorEsperado: "Fuga interna de colaboradores o descubrimiento independiente lícito" },

      // Fila 2: Dispositivo mecánico
      { id: "c20", fila: 2, col: 0, tipo: "fijo", etiqueta: "Mecanismo Innovador de Transmisión", valorEsperado: "Mecanismo Innovador de Transmisión" },
      {
        id: "c21",
        fila: 2,
        col: 1,
        tipo: "variable",
        valorEsperado: "Patente de Invención o Modelo de Utilidad",
        opciones: [
          "Patente de Invención o Modelo de Utilidad",
          "Derecho de Autor sobre el manual de uso",
          "Lema de Protección Industrial",
        ],
        pista: "Para una solución técnica de ingeniería que es visible y fácilmente copiable al salir al mercado.",
      },
      {
        id: "c22",
        fila: 2,
        col: 2,
        tipo: "variable",
        valorEsperado: "Novedad Absoluta antes de la fecha de solicitud",
        opciones: [
          "Novedad Absoluta antes de la fecha de solicitud",
          "Venta comercial masiva durante 3 años en ferias libres",
          "Autorización previa del decano de facultad",
        ],
        pista: "¿Qué condición temporal destruye irremediablemente la patentabilidad?",
      },
      { id: "c23", fila: 2, col: 3, tipo: "fijo", etiqueta: "Copia legal del competidor si vencen los 20 años o si se divulga prematuramente", valorEsperado: "Copia legal del competidor si vencen los 20 años o si se divulga prematuramente" },
    ],
    restriccionesFilas: [
      {
        fila: 0,
        descripcion: "Coherencia en Software: Se protege por derecho de autor como soporte lógico (originalidad de expresión).",
        explicacionExito: "¡Fila de Software impecable! El derecho de autor ampara el código sin exigir patente de algoritmo puro.",
        explicacionFallo: "Conflicto en Software: Has intentado patentar el algoritmo puro o exigir formalidades no requeridas.",
      },
      {
        fila: 1,
        descripcion: "Coherencia en Secreto: Requiere medidas activas de confidencialidad (NDAs) para mantener valor comercial.",
        explicacionExito: "¡Fila de Secreto impecable! La custodia activa con NDAs mantiene la condición de secreto legal.",
        explicacionFallo: "Conflicto en Secreto: Si publicas la formulación destruyes el secreto empresarial.",
      },
      {
        fila: 2,
        descripcion: "Coherencia en Patentes: La novedad absoluta previa al depósito es condición sine qua non.",
        explicacionExito: "¡Fila de Patentes impecable! La novedad y altura inventiva aseguran el derecho exclusivo de 20 años.",
        explicacionFallo: "Conflicto en Patentes: La venta o divulgación previa sin periodo de gracia destruye la novedad.",
      },
    ],
    restriccionesColumnas: [
      {
        col: 1,
        descripcion: "Columna de Vía Óptima: Coincidencia entre la naturaleza técnica y el régimen de exclusividad.",
        explicacionExito: "Columna de Vías óptimas validada.",
        explicacionFallo: "Error de Vía de Protección: No mezcles regímenes excluyentes.",
      },
      {
        col: 2,
        descripcion: "Columna de Condición Crítica: Las exigencias normativas específicas de cada figura.",
        explicacionExito: "Columna de Condiciones Críticas superada con precisión técnica.",
        explicacionFallo: "Error en Condición Crítica: Has invertido requisitos entre autor, secreto y patente.",
      },
    ],
    recompensaXP: 200,
  },
];
