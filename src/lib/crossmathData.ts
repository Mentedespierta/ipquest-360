export type CrossmathNode = {
  id: string;
  fila: number;
  col: number;
  tipo: "fijo" | "variable" | "operador";
  valorEsperado: string; // ej: "12", "+", "8", "="
  valorInicial?: string;
  pista?: string;
  significadoPI?: string; // Concepto asociado en Propiedad Intelectual
};

export type EcuacionRegla = {
  id: string;
  tipo: "horizontal" | "vertical";
  posicion: number; // fila o columna
  celdasIds: string[]; // ids de los números y operadores en orden: [num1, op, num2, eq, res]
  descripcion: string;
  explicacion: string;
};

export type TableroCrossmath = {
  id: string;
  titulo: string;
  subtitulo: string;
  dificultad: "Principiante" | "Intermedio" | "Experto";
  recompensaXP: number;
  filas: number;
  columnas: number;
  nodos: CrossmathNode[];
  ecuaciones: EcuacionRegla[];
};

export const TABLEROS_CROSSMATH: TableroCrossmath[] = [
  {
    id: "crossmath-01",
    titulo: "Crossmath 01: El Enigma de Plazos, TRL y Novedad",
    subtitulo: "Resuelve las ecuaciones conectadas cruzando plazos legales de patentes, meses de gracia y niveles TRL.",
    dificultad: "Principiante",
    recompensaXP: 180,
    filas: 5,
    columnas: 5,
    nodos: [
      // Fila 0: (12) + ( ?=8 ) = (20)   [12 meses gracia + 8 = 20 años de patente]
      { id: "cm-0-0", fila: 0, col: 0, tipo: "fijo", valorEsperado: "12", valorInicial: "12", significadoPI: "12 meses: Plazo de gracia para divulgar antes de solicitar patente (Art. 17 D486)" },
      { id: "cm-0-1", fila: 0, col: 1, tipo: "operador", valorEsperado: "+" },
      { id: "cm-0-2", fila: 0, col: 2, tipo: "variable", valorEsperado: "8", pista: "¿Cuánto falta a 12 para llegar a los 20 años de monopolio de patente?", significadoPI: "8 años de maduración tecnológica promedio" },
      { id: "cm-0-3", fila: 0, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm-0-4", fila: 0, col: 4, tipo: "fijo", valorEsperado: "20", valorInicial: "20", significadoPI: "20 años: Plazo máximo de protección de patente de invención" },

      // Fila 1: Operadores verticales
      { id: "cm-1-0", fila: 1, col: 0, tipo: "operador", valorEsperado: "+" },
      { id: "cm-1-2", fila: 1, col: 2, tipo: "operador", valorEsperado: "x" },
      { id: "cm-1-4", fila: 1, col: 4, tipo: "operador", valorEsperado: "-" },

      // Fila 2: ( ?=6 ) x ( 2 ) = ( ?=12 )
      // Vertical col 0: 12 + 6 = 18
      { id: "cm-2-0", fila: 2, col: 0, tipo: "variable", valorEsperado: "6", pista: "12 + ? = 18 (y además ? x 2 = 12)", significadoPI: "6 meses: Plazo de prioridad internacional en marcas (CUP)" },
      { id: "cm-2-1", fila: 2, col: 1, tipo: "operador", valorEsperado: "x" },
      { id: "cm-2-2", fila: 2, col: 2, tipo: "fijo", valorEsperado: "2", valorInicial: "2", significadoPI: "2 años: Plazo para solicitar examen de patentabilidad tras publicación" },
      { id: "cm-2-3", fila: 2, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm-2-4", fila: 2, col: 4, tipo: "variable", valorEsperado: "12", pista: "6 x 2 = ? (y además 20 - ? = 8)", significadoPI: "12 meses: Prioridad internacional para patentes bajo Convenio de París" },

      // Fila 3: Operadores verticales
      { id: "cm-3-0", fila: 3, col: 0, tipo: "operador", valorEsperado: "=" },
      { id: "cm-3-2", fila: 3, col: 2, tipo: "operador", valorEsperado: "=" },
      { id: "cm-3-4", fila: 3, col: 4, tipo: "operador", valorEsperado: "=" },

      // Fila 4: ( 18 ) - ( ?=16 ) = ( 2 )
      // Vertical col 2: 8 x 2 = 16
      // Vertical col 4: 20 - 12 = 8
      { id: "cm-4-0", fila: 4, col: 0, tipo: "fijo", valorEsperado: "18", valorInicial: "18", significadoPI: "18 meses: Publicación automática de la solicitud de patente en gaceta" },
      { id: "cm-4-1", fila: 4, col: 1, tipo: "operador", valorEsperado: "-" },
      { id: "cm-4-2", fila: 4, col: 2, tipo: "variable", valorEsperado: "16", pista: "18 - ? = 2 (y verticalmente 8 x 2 = ?)", significadoPI: "16 meses de plazo PCT de búsqueda internacional" },
      { id: "cm-4-3", fila: 4, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm-4-4", fila: 4, col: 4, tipo: "fijo", valorEsperado: "8", valorInicial: "8", significadoPI: "TRL 8: Sistema completo y calificado para transferencia" },
    ],
    ecuaciones: [
      {
        id: "eq-h1",
        tipo: "horizontal",
        posicion: 0,
        celdasIds: ["cm-0-0", "cm-0-1", "cm-0-2", "cm-0-3", "cm-0-4"],
        descripcion: "Fila 1: 12 + ? = 20",
        explicacion: "12 meses de plazo de gracia + 8 = 20 años de duración de la patente de invención.",
      },
      {
        id: "eq-h2",
        tipo: "horizontal",
        posicion: 2,
        celdasIds: ["cm-2-0", "cm-2-1", "cm-2-2", "cm-2-3", "cm-2-4"],
        descripcion: "Fila 2: ? x 2 = ?",
        explicacion: "6 meses de prioridad de marca x 2 = 12 meses de prioridad de patente.",
      },
      {
        id: "eq-h3",
        tipo: "horizontal",
        posicion: 4,
        celdasIds: ["cm-4-0", "cm-4-1", "cm-4-2", "cm-4-3", "cm-4-4"],
        descripcion: "Fila 3: 18 - ? = 8 (o consistencia en el cruce)",
        explicacion: "18 meses de publicación en gaceta menos 10 = 8 años de TRL validado.",
      },
      {
        id: "eq-v1",
        tipo: "vertical",
        posicion: 0,
        celdasIds: ["cm-0-0", "cm-1-0", "cm-2-0", "cm-3-0", "cm-4-0"],
        descripcion: "Columna 1: 12 + ? = 18",
        explicacion: "12 meses de gracia + 6 meses prioridad = 18 meses de publicación en la Gaceta Oficial.",
      },
      {
        id: "eq-v2",
        tipo: "vertical",
        posicion: 2,
        celdasIds: ["cm-0-2", "cm-1-2", "cm-2-2", "cm-3-2", "cm-4-2"],
        descripcion: "Columna 2: 8 x 2 = 16",
        explicacion: "8 factores de maduración x 2 = 16 meses de búsqueda técnica PCT.",
      },
      {
        id: "eq-v3",
        tipo: "vertical",
        posicion: 4,
        celdasIds: ["cm-0-4", "cm-1-4", "cm-2-4", "cm-3-4", "cm-4-4"],
        descripcion: "Columna 3: 20 - 12 = 8",
        explicacion: "20 años de patente menos 12 meses de prioridad = 8 años de vida remanente de retorno.",
      },
    ],
  },
  {
    id: "crossmath-02",
    titulo: "Crossmath 02: Clasificación de Niza, Marcas y Modelos",
    subtitulo: "Articula las clases de productos, servicios y plazos de renovación de signos distintivos.",
    dificultad: "Intermedio",
    recompensaXP: 200,
    filas: 5,
    columnas: 5,
    nodos: [
      // Fila 0: (34) + ( ?=11 ) = (45)   [34 clases productos + 11 servicios = 45 clases Niza]
      { id: "cm2-0-0", fila: 0, col: 0, tipo: "fijo", valorEsperado: "34", valorInicial: "34", significadoPI: "34 clases de productos (Clases 1 a 34 Niza)" },
      { id: "cm2-0-1", fila: 0, col: 1, tipo: "operador", valorEsperado: "+" },
      { id: "cm2-0-2", fila: 0, col: 2, tipo: "variable", valorEsperado: "11", pista: "¿Cuántas clases de servicios existen en la Clasificación de Niza para sumar 45?", significadoPI: "11 clases de servicios (Clases 35 a 45 Niza)" },
      { id: "cm2-0-3", fila: 0, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm2-0-4", fila: 0, col: 4, tipo: "fijo", valorEsperado: "45", valorInicial: "45", significadoPI: "45 clases totales de la Clasificación Internacional de Niza" },

      // Fila 1: Operadores verticales
      { id: "cm2-1-0", fila: 1, col: 0, tipo: "operador", valorEsperado: "-" },
      { id: "cm2-1-2", fila: 1, col: 2, tipo: "operador", valorEsperado: "-" },
      { id: "cm2-1-4", fila: 1, col: 4, tipo: "operador", valorEsperado: "-" },

      // Fila 2: ( ?=24 ) - ( 1 ) = ( ?=23 )
      // Vertical col 0: 34 - 24 = 10 (10 años modelo de utilidad)
      // Vertical col 2: 11 - 1 = 10 (10 años marca)
      // Vertical col 4: 45 - 25 = 20 (20 años patente)
      { id: "cm2-2-0", fila: 2, col: 0, tipo: "variable", valorEsperado: "24", pista: "34 - ? = 10 (vigencia de modelo de utilidad)", significadoPI: "24 horas límite para preservar secreto ante vulneración" },
      { id: "cm2-2-1", fila: 2, col: 1, tipo: "operador", valorEsperado: "+" },
      { id: "cm2-2-2", fila: 2, col: 2, tipo: "fijo", valorEsperado: "1", valorInicial: "1", significadoPI: "1 solo titular por registro prioritario" },
      { id: "cm2-2-3", fila: 2, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm2-2-4", fila: 2, col: 4, tipo: "variable", valorEsperado: "25", pista: "24 + 1 = ? (y además 45 - ? = 20)", significadoPI: "25% tasa estándar de regalía en la industria tecnológica" },

      // Fila 3: Operadores verticales
      { id: "cm2-3-0", fila: 3, col: 0, tipo: "operador", valorEsperado: "=" },
      { id: "cm2-3-2", fila: 3, col: 2, tipo: "operador", valorEsperado: "=" },
      { id: "cm2-3-4", fila: 3, col: 4, tipo: "operador", valorEsperado: "=" },

      // Fila 4: ( 10 ) + ( ?=10 ) = ( 20 )
      { id: "cm2-4-0", fila: 4, col: 0, tipo: "fijo", valorEsperado: "10", valorInicial: "10", significadoPI: "10 años: Vigencia de modelo de utilidad y registro de marca" },
      { id: "cm2-4-1", fila: 4, col: 1, tipo: "operador", valorEsperado: "+" },
      { id: "cm2-4-2", fila: 4, col: 2, tipo: "variable", valorEsperado: "10", pista: "10 + ? = 20 (años de renovación indefinida de marca)", significadoPI: "10 años renovables: Plazo de extensión de marca registrada" },
      { id: "cm2-4-3", fila: 4, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm2-4-4", fila: 4, col: 4, tipo: "fijo", valorEsperado: "20", valorInicial: "20", significadoPI: "20 años: Plazo absoluto de patente" },
    ],
    ecuaciones: [
      {
        id: "eq2-h1",
        tipo: "horizontal",
        posicion: 0,
        celdasIds: ["cm2-0-0", "cm2-0-1", "cm2-0-2", "cm2-0-3", "cm2-0-4"],
        descripcion: "Fila 1: 34 + ? = 45",
        explicacion: "34 clases de productos + 11 clases de servicios = 45 clases Niza.",
      },
      {
        id: "eq2-h2",
        tipo: "horizontal",
        posicion: 2,
        celdasIds: ["cm2-2-0", "cm2-2-1", "cm2-2-2", "cm2-2-3", "cm2-2-4"],
        descripcion: "Fila 2: ? + 1 = ?",
        explicacion: "24 + 1 = 25% tasa estándar de licenciamiento.",
      },
      {
        id: "eq2-h3",
        tipo: "horizontal",
        posicion: 4,
        celdasIds: ["cm2-4-0", "cm2-4-1", "cm2-4-2", "cm2-4-3", "cm2-4-4"],
        descripcion: "Fila 3: 10 + ? = 20",
        explicacion: "10 años modelo de utilidad + 10 años renovación de marca = 20 años de patente.",
      },
      {
        id: "eq2-v1",
        tipo: "vertical",
        posicion: 0,
        celdasIds: ["cm2-0-0", "cm2-1-0", "cm2-2-0", "cm2-3-0", "cm2-4-0"],
        descripcion: "Columna 1: 34 - ? = 10",
        explicacion: "34 clases de productos menos 24 = 10 años de duración de marca y modelo de utilidad.",
      },
      {
        id: "eq2-v2",
        tipo: "vertical",
        posicion: 2,
        celdasIds: ["cm2-0-2", "cm2-1-2", "cm2-2-2", "cm2-3-2", "cm2-4-2"],
        descripcion: "Columna 2: 11 - 1 = 10",
        explicacion: "11 clases de servicios menos 1 = 10 años de protección marcaria.",
      },
      {
        id: "eq2-v3",
        tipo: "vertical",
        posicion: 4,
        celdasIds: ["cm2-0-4", "cm2-1-4", "cm2-2-4", "cm2-3-4", "cm2-4-4"],
        descripcion: "Columna 3: 45 - 25 = 20",
        explicacion: "45 clases Niza menos 25 = 20 años de patente.",
      },
    ],
  },
  {
    id: "crossmath-03",
    titulo: "Crossmath 03: Derechos de Autor, Plazos Post-Mortem y TRL",
    subtitulo: "Resuelve ecuaciones con la escala TRL (1 a 9) y los plazos de protección autoral.",
    dificultad: "Experto",
    recompensaXP: 220,
    filas: 5,
    columnas: 5,
    nodos: [
      // Fila 0: (70) - ( ?=20 ) = (50)   [70 años post-mortem Código Ingenios - 20 patente = 50 años CAN]
      { id: "cm3-0-0", fila: 0, col: 0, tipo: "fijo", valorEsperado: "70", valorInicial: "70", significadoPI: "70 años post-mortem: Protección patrimonial de autor en Ecuador (Código Ingenios)" },
      { id: "cm3-0-1", fila: 0, col: 1, tipo: "operador", valorEsperado: "-" },
      { id: "cm3-0-2", fila: 0, col: 2, tipo: "variable", valorEsperado: "20", pista: "70 - ? = 50 (años de monopolio de patente)", significadoPI: "20 años de duración de patente" },
      { id: "cm3-0-3", fila: 0, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm3-0-4", fila: 0, col: 4, tipo: "fijo", valorEsperado: "50", valorInicial: "50", significadoPI: "50 años post-mortem: Plazo mínimo de protección autoral en la Decisión 351 CAN" },

      // Fila 1: Operadores verticales
      { id: "cm3-1-0", fila: 1, col: 0, tipo: "operador", valorEsperado: "/" },
      { id: "cm3-1-2", fila: 1, col: 2, tipo: "operador", valorEsperado: "/" },
      { id: "cm3-1-4", fila: 1, col: 4, tipo: "operador", valorEsperado: "/" },

      // Fila 2: ( ?=10 ) - ( 5 ) = ( ?=5 )
      // Vertical col 0: 70 / 10 = 7 (TRL 7 demostración)
      // Vertical col 2: 20 / 5 = 4 (TRL 4 validación laboratorio)
      // Vertical col 4: 50 / 5 = 10 (10 años marca)
      { id: "cm3-2-0", fila: 2, col: 0, tipo: "variable", valorEsperado: "10", pista: "70 / ? = 7 (vigencia de modelo de utilidad)", significadoPI: "10 años modelo de utilidad" },
      { id: "cm3-2-1", fila: 2, col: 1, tipo: "operador", valorEsperado: "-" },
      { id: "cm3-2-2", fila: 2, col: 2, tipo: "fijo", valorEsperado: "5", valorInicial: "5", significadoPI: "TRL 5: Validación en entorno relevante" },
      { id: "cm3-2-3", fila: 2, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm3-2-4", fila: 2, col: 4, tipo: "variable", valorEsperado: "5", pista: "10 - 5 = ? (y además 50 / 5 = 10)", significadoPI: "5 años de gracia mínima de no uso de marca" },

      // Fila 3: Operadores verticales
      { id: "cm3-3-0", fila: 3, col: 0, tipo: "operador", valorEsperado: "=" },
      { id: "cm3-3-2", fila: 3, col: 2, tipo: "operador", valorEsperado: "=" },
      { id: "cm3-3-4", fila: 3, col: 4, tipo: "operador", valorEsperado: "=" },

      // Fila 4: ( 7 ) + ( ?=3 ) = ( 10 )
      { id: "cm3-4-0", fila: 4, col: 0, tipo: "fijo", valorEsperado: "7", valorInicial: "7", significadoPI: "TRL 7: Demostración de prototipo en entorno operativo" },
      { id: "cm3-4-1", fila: 4, col: 1, tipo: "operador", valorEsperado: "+" },
      { id: "cm3-4-2", fila: 4, col: 2, tipo: "variable", valorEsperado: "3", pista: "7 + ? = 10 (TRL 3 prueba de concepto)", significadoPI: "TRL 3: Prueba analítica y experimental de concepto crítico" },
      { id: "cm3-4-3", fila: 4, col: 3, tipo: "operador", valorEsperado: "=" },
      { id: "cm3-4-4", fila: 4, col: 4, tipo: "fijo", valorEsperado: "10", valorInicial: "10", significadoPI: "10 años: Registro renovable de marca" },
    ],
    ecuaciones: [
      {
        id: "eq3-h1",
        tipo: "horizontal",
        posicion: 0,
        celdasIds: ["cm3-0-0", "cm3-0-1", "cm3-0-2", "cm3-0-3", "cm3-0-4"],
        descripcion: "Fila 1: 70 - ? = 50",
        explicacion: "70 años de autor en Ecuador menos 20 de patente = 50 años post-mortem en CAN.",
      },
      {
        id: "eq3-h2",
        tipo: "horizontal",
        posicion: 2,
        celdasIds: ["cm3-2-0", "cm3-2-1", "cm3-2-2", "cm3-2-3", "cm3-2-4"],
        descripcion: "Fila 2: ? - 5 = ?",
        explicacion: "10 - 5 = 5 años de gracia sin caducidad por falta de uso.",
      },
      {
        id: "eq3-h3",
        tipo: "horizontal",
        posicion: 4,
        celdasIds: ["cm3-4-0", "cm3-4-1", "cm3-4-2", "cm3-4-3", "cm3-4-4"],
        descripcion: "Fila 3: 7 + ? = 10",
        explicacion: "TRL 7 prototipo operativo + TRL 3 prueba de concepto = 10 años de marca.",
      },
      {
        id: "eq3-v1",
        tipo: "vertical",
        posicion: 0,
        celdasIds: ["cm3-0-0", "cm3-1-0", "cm3-2-0", "cm3-3-0", "cm3-4-0"],
        descripcion: "Columna 1: 70 / 10 = 7",
        explicacion: "70 años de autor entre 10 = TRL 7 de demostración operativa.",
      },
      {
        id: "eq3-v2",
        tipo: "vertical",
        posicion: 2,
        celdasIds: ["cm3-0-2", "cm3-1-2", "cm3-2-2", "cm3-3-2", "cm3-4-2"],
        descripcion: "Columna 2: 20 / 5 = 4",
        explicacion: "20 años de patente entre 5 = TRL 4 validación de laboratorio.",
      },
      {
        id: "eq3-v3",
        tipo: "vertical",
        posicion: 4,
        celdasIds: ["cm3-0-4", "cm3-1-4", "cm3-2-4", "cm3-3-4", "cm3-4-4"],
        descripcion: "Columna 3: 50 / 5 = 10",
        explicacion: "50 años CAN entre 5 = 10 años de duración de marca registrada.",
      },
    ],
  },
];
