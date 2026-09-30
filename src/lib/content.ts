export type Perfil =
  | "Estudiante"
  | "Docente"
  | "Investigador"
  | "Emprendedor"
  | "Empresario"
  | "Gestor de innovación"
  | "Gestor tecnológico"
  | "Profesional";

export type Objeto =
  | "PERSONA"
  | "EMPRENDIMIENTO"
  | "ORGANIZACIÓN"
  | "PROYECTO"
  | "PRODUCTO"
  | "SERVICIO"
  | "TECNOLOGÍA"
  | "LABORATORIO";

export const PERFILES: Perfil[] = [
  "Estudiante",
  "Docente",
  "Investigador",
  "Emprendedor",
  "Empresario",
  "Gestor de innovación",
  "Gestor tecnológico",
  "Profesional",
];

export const OBJETOS: Objeto[] = [
  "PERSONA",
  "EMPRENDIMIENTO",
  "ORGANIZACIÓN",
  "PROYECTO",
  "PRODUCTO",
  "SERVICIO",
  "TECNOLOGÍA",
  "LABORATORIO",
];

export type Pregunta = {
  id: string;
  competencia: string;
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
};

export type Micro = {
  titulo: string;
  concepto: string;
  ejemplo: string;
  actividad: string;
  actividadPista: string;
};

export type Dominio = {
  id: string;
  nombre: string;
  descripcion: string;
  requiere?: { id: string; pct: number };
  micro: Micro;
  preguntas: Pregunta[];
};

export const DOMINIOS: Dominio[] = [
  {
    id: "D01",
    nombre: "Datos y conocimiento",
    descripcion: "Datos, información, conocimiento tácito y explícito, tecnología y capacidades.",
    micro: {
      titulo: "¿Dónde termina el dato y empieza el conocimiento?",
      concepto:
        "El dato es un registro sin contexto. La información es el dato interpretado. El conocimiento es la información integrada con experiencia que permite decidir y actuar.",
      ejemplo:
        "«38 °C» es un dato. «El reactor subió a 38 °C tras el cambio de catalizador» es información. Saber que por encima de 36 °C el rendimiento cae es conocimiento.",
      actividad: "Clasifica el siguiente registro de tu organización:",
      actividadPista: "Una bitácora de laboratorio sin anotaciones de contexto → dato.",
    },
    preguntas: [
      {
        id: "D01-1",
        competencia: "Identificar",
        enunciado: "El conocimiento tácito se caracteriza principalmente porque:",
        opciones: [
          "Está documentado en manuales y procedimientos.",
          "Reside en la experiencia de las personas y es difícil de codificar.",
          "Solo existe en bases de datos estructuradas.",
        ],
        correcta: 1,
        explicacion:
          "El conocimiento tácito vive en la práctica y la experiencia; su transferencia exige mentoría, socialización o documentación deliberada.",
      },
      {
        id: "D01-2",
        competencia: "Distinguir",
        enunciado: "Un recurso intangible se convierte en activo intangible cuando:",
        opciones: [
          "Se registra ante la oficina de propiedad industrial.",
          "La organización lo controla y espera beneficios futuros de él.",
          "Aparece siempre en el balance contable.",
        ],
        correcta: 1,
        explicacion:
          "Recurso ≠ activo ≠ derecho de PI ≠ reconocimiento contable. El activo exige control y expectativa de beneficio; el registro contable es una cuarta dimensión distinta.",
      },
      {
        id: "D01-3",
        competencia: "Aplicar",
        enunciado: "Una capacidad tecnológica se demuestra sobre todo mediante:",
        opciones: [
          "La compra de equipos de última generación.",
          "La habilidad sostenida de usar, adaptar y mejorar una tecnología.",
          "El número de publicaciones del equipo.",
        ],
        correcta: 1,
        explicacion:
          "La capacidad es la habilidad efectiva de operar, adaptar y mejorar; el equipamiento es solo un insumo.",
      },
    ],
  },
  {
    id: "D04",
    nombre: "Derechos de PI",
    descripcion: "Conceptos, territorialidad, temporalidad, titularidad, límites y excepciones.",
    micro: {
      titulo: "Territorialidad y temporalidad",
      concepto:
        "Todo derecho de propiedad intelectual es territorial (vale donde se concede) y temporal (dura un plazo definido, salvo excepciones como la marca renovable).",
      ejemplo:
        "Una patente concedida en Colombia no impide fabricar el mismo producto en México si allí no se solicitó protección.",
      actividad: "Ubica el alcance de tu derecho:",
      actividadPista: "Solicitud PCT → fase nacional en cada país donde quieras protección.",
    },
    preguntas: [
      {
        id: "D04-1",
        competencia: "Recordar",
        enunciado: "¿Cuánto dura el monopolio de una patente de invención?",
        opciones: [
          "20 años desde la fecha de solicitud.",
          "10 años renovables cada cinco.",
          "Toda la vida útil de la invención.",
        ],
        correcta: 0,
        explicacion:
          "El plazo máximo es de 20 años contados desde la solicitud; mantenerlo exige el pago de anualidades.",
      },
      {
        id: "D04-2",
        competencia: "Analizar",
        enunciado: "La titularidad de una invención hecha por un empleado en su jornada laboral:",
        opciones: [
          "Siempre corresponde al inventor persona natural.",
          "Suele corresponder al empleador, según contrato y ley aplicable.",
          "Se reparte por partes iguales en todos los casos.",
        ],
        correcta: 1,
        explicacion:
          "La autoría es del inventor, pero la titularidad patrimonial suele recaer en el empleador. Conviene documentar la cadena de titularidad por escrito.",
      },
      {
        id: "D04-3",
        competencia: "Decidir",
        enunciado: "Si una innovación no puede describirse sin revelar su ventaja, conviene evaluar:",
        opciones: [
          "Publicarla de inmediato para ganar prioridad.",
          "Protegerla como secreto empresarial con medidas de confidencialidad.",
          "Registrarla como marca.",
        ],
        correcta: 1,
        explicacion:
          "El secreto empresarial protege mientras se mantengan medidas razonables de confidencialidad; no exige divulgación como la patente.",
      },
    ],
  },
  {
    id: "D05",
    nombre: "Derecho de autor",
    descripcion: "Obra, autor, titular, derechos morales y patrimoniales, software y licencias.",
    requiere: { id: "D01", pct: 40 },
    micro: {
      titulo: "¿Cuándo se protege una obra?",
      concepto:
        "La protección nace con la creación de la obra expresada en cualquier soporte. El registro es declarativo y sirve como prueba, no como requisito.",
      ejemplo:
        "El diseño de la interfaz de la app «Lumina» queda protegido desde su creación, sin necesidad de registro formal.",
      actividad: "Arrastra el sello de protección a la etapa correcta:",
      actividadPista: "Creación de la obra.",
    },
    preguntas: [
      {
        id: "D05-1",
        competencia: "Comprender",
        enunciado: "Los derechos morales del autor son:",
        opciones: [
          "Transferibles mediante contrato de cesión.",
          "Irrenunciables e inalienables.",
          "Válidos solo durante 10 años.",
        ],
        correcta: 1,
        explicacion:
          "Paternidad e integridad de la obra son irrenunciables; lo que se cede son los derechos patrimoniales.",
      },
      {
        id: "D05-2",
        competencia: "Aplicar",
        enunciado: "El código fuente de un software se protege principalmente por:",
        opciones: ["Derecho de autor.", "Diseño industrial.", "Denominación de origen."],
        correcta: 0,
        explicacion:
          "El software se protege como obra literaria por derecho de autor; la funcionalidad podría, en ciertos marcos, analizarse vía patente.",
      },
      {
        id: "D05-3",
        competencia: "Evaluar",
        enunciado: "Una licencia no exclusiva implica que el titular:",
        opciones: [
          "Pierde el derecho de explotar la obra.",
          "Puede otorgar licencias equivalentes a otros terceros.",
          "Transfiere la titularidad al licenciatario.",
        ],
        correcta: 1,
        explicacion:
          "En la licencia no exclusiva el titular conserva la explotación y puede licenciar a más actores.",
      },
    ],
  },
  {
    id: "D06",
    nombre: "Propiedad industrial",
    descripcion: "Patentes, modelos de utilidad, diseños industriales, marcas y secretos.",
    requiere: { id: "D04", pct: 60 },
    micro: {
      titulo: "Elegir la figura correcta",
      concepto:
        "Cada figura protege algo distinto: la patente protege una solución técnica nueva; el diseño industrial, la apariencia; la marca, el signo distintivo.",
      ejemplo:
        "Una botella con mecanismo de cierre inédito: el mecanismo va a patente o modelo de utilidad; su forma estética, a diseño industrial; su nombre, a marca.",
      actividad: "Asigna la figura de protección adecuada:",
      actividadPista: "Apariencia externa → diseño industrial.",
    },
    preguntas: [
      {
        id: "D06-1",
        competencia: "Distinguir",
        enunciado: "El requisito que diferencia al modelo de utilidad de la patente de invención es:",
        opciones: [
          "No requiere novedad.",
          "Exige un nivel inventivo menor y protege mejoras funcionales.",
          "Protege únicamente signos distintivos.",
        ],
        correcta: 1,
        explicacion:
          "El modelo de utilidad exige novedad pero un nivel inventivo menor, y suele tener un plazo más corto.",
      },
      {
        id: "D06-2",
        competencia: "Recordar",
        enunciado: "Una marca registrada, a diferencia de una patente:",
        opciones: [
          "Puede renovarse indefinidamente mientras se use.",
          "Caduca a los 20 años sin excepción.",
          "No requiere registro para ser oponible.",
        ],
        correcta: 0,
        explicacion:
          "La marca se concede por períodos renovables (típicamente 10 años), indefinidamente mientras se renueve y se use.",
      },
      {
        id: "D06-3",
        competencia: "Analizar",
        enunciado: "La divulgación pública de una invención antes de solicitarla normalmente:",
        opciones: [
          "No afecta la solicitud.",
          "Destruye la novedad, salvo plazos de gracia previstos por ley.",
          "Mejora el nivel inventivo.",
        ],
        correcta: 1,
        explicacion:
          "La divulgación previa forma parte del estado de la técnica y destruye la novedad, salvo el plazo de gracia aplicable.",
      },
    ],
  },
  {
    id: "D07",
    nombre: "Vigilancia tecnológica",
    descripcion: "Búsqueda, bases de patentes, clasificación, operadores y estado del arte.",
    requiere: { id: "D06", pct: 40 },
    micro: {
      titulo: "Buscar antes de crear",
      concepto:
        "La vigilancia convierte la búsqueda en un proceso sistemático: fuentes definidas, ecuaciones de búsqueda, clasificación tecnológica, alertas y análisis.",
      ejemplo:
        "Una ecuación con operadores booleanos y códigos CPC reduce miles de resultados a una veintena de documentos realmente relevantes.",
      actividad: "Construye tu primera ecuación:",
      actividadPista: "(término A OR sinónimo) AND (término B) NOT (ruido).",
    },
    preguntas: [
      {
        id: "D07-1",
        competencia: "Aplicar",
        enunciado: "El operador booleano adecuado para incluir sinónimos es:",
        opciones: ["AND", "OR", "NOT"],
        correcta: 1,
        explicacion: "OR amplía el recobrado incluyendo variantes y sinónimos del mismo concepto.",
      },
      {
        id: "D07-2",
        competencia: "Comprender",
        enunciado: "El estado del arte en una búsqueda de patentes incluye:",
        opciones: [
          "Solo patentes concedidas en el país de interés.",
          "Toda divulgación pública previa, incluidos artículos y catálogos.",
          "Únicamente literatura científica indexada.",
        ],
        correcta: 1,
        explicacion:
          "Cualquier divulgación accesible al público antes de la fecha de prioridad integra el estado de la técnica.",
      },
      {
        id: "D07-3",
        competencia: "Decidir",
        enunciado: "Un análisis de libertad de operación (FTO) busca determinar:",
        opciones: [
          "Si una invención es patentable.",
          "Si explotar un producto infringe derechos vigentes de terceros.",
          "El valor de mercado del activo.",
        ],
        correcta: 1,
        explicacion:
          "Patentabilidad y FTO son preguntas distintas: la primera mira la novedad; la segunda, el riesgo de infracción.",
      },
    ],
  },
  {
    id: "D08",
    nombre: "Transferencia y valoración",
    descripcion: "Madurez tecnológica, contratos, licenciamiento y valoración de intangibles.",
    requiere: { id: "D07", pct: 60 },
    micro: {
      titulo: "Del laboratorio al mercado",
      concepto:
        "La transferencia exige tecnología con madurez demostrable, titularidad clara, protección adecuada y un instrumento contractual apropiado.",
      ejemplo:
        "Un desarrollo en TRL 4 rara vez se licencia con regalías altas; suele avanzar mediante acuerdos de investigación conjunta.",
      actividad: "Estima la madurez de tu desarrollo:",
      actividadPista: "Validación en entorno relevante → TRL 5–6.",
    },
    preguntas: [
      {
        id: "D08-1",
        competencia: "Comprender",
        enunciado: "Los niveles TRL miden:",
        opciones: [
          "El valor económico de la tecnología.",
          "El grado de madurez y validación de la tecnología.",
          "La fuerza jurídica de la patente.",
        ],
        correcta: 1,
        explicacion: "TRL describe madurez y evidencia de validación, de la idea (1) al sistema probado (9).",
      },
      {
        id: "D08-2",
        competencia: "Decidir",
        enunciado: "Antes de licenciar una tecnología es indispensable:",
        opciones: [
          "Haber definido y documentado la cadena de titularidad.",
          "Tener la tecnología en TRL 9.",
          "Haber registrado la marca comercial.",
        ],
        correcta: 0,
        explicacion:
          "Sin titularidad clara no hay nada que licenciar: es el primer punto de la debida diligencia.",
      },
      {
        id: "D08-3",
        competencia: "Evaluar",
        enunciado: "El método de valoración por ingresos estima el activo a partir de:",
        opciones: [
          "El costo histórico de desarrollo.",
          "Los flujos futuros atribuibles al activo, descontados.",
          "Transacciones comparables del mercado.",
        ],
        correcta: 1,
        explicacion:
          "El enfoque de ingresos descuenta los flujos futuros atribuibles; costo y mercado son los otros dos enfoques clásicos.",
      },
    ],
  },
];

export const XP_POR_ACIERTO = 50;
export const XP_POR_NIVEL = 1000;
