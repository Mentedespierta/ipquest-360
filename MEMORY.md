# MEMORIA AGÉNTICA DEL PROYECTO: IP QUEST 360
> **Fecha de creación/actualización:** 2026-09-29  
> **Ámbito:** Entregable P5 (Preparación Mes 7 - IQ Protege) / Contrato CONQUITO  
> **Proyecto:** IP QUEST 360 · Serious Game & Intangible Asset Management Lab  
> **Dominio de Producción:** [https://ipquest.transfertech-ipvalue.com/](https://ipquest.transfertech-ipvalue.com/)  
> **URL Respaldo Vercel:** [https://ipquest-360.vercel.app/](https://ipquest-360.vercel.app/)

---

## 1. RESUMEN EJECUTIVO & ESTADO OPERATIVO
IP QUEST 360 es un entorno gamificado interactivo de alto impacto pedagógico para la enseñanza y diagnóstico de propiedad intelectual (PI), transferencia tecnológica (TT) y madurez de activos intangibles (IARL 1-9).

- **Estado de Despliegue:** 100% ACTIVO y en producción con certificado SSL (Let's Encrypt).
- **Compilador / Runtime:** Bun v1.3.1 + Vite v8.1.5 + React 19 + TypeScript + Tailwind CSS.
- **Servidor Local de Desarrollo:** `bun run dev` corriendo en `http://localhost:8080/`.

---

## 2. INFRAESTRUCTURA DE CÓDIGO Y CONTROL DE VERSIONES (GIT)

### 2.1 Repositorios Remotos
1. **Repositorio Principal (Push activo desde CLI local):**
   - **URL:** `https://github.com/Mentedespierta/ipquest-360`
   - **Rama principal:** `main`
   - **Autenticación local:** Windows Credential Manager configurado bajo la cuenta `Mentedespierta`.
2. **Repositorio Vercel (Fork / Clon automático conectado a Vercel CI/CD):**
   - **URL:** `https://github.com/teranlenin/ipquest-360`
   - **Owner:** `teranlenin`
   - **Propósito:** Vercel monitorea e integra los despliegues de la cuenta de Lenin Terán.

### 2.2 Sincronización entre Repositorios
Para mantener sincronizados ambos orígenes:
```bash
# Agregar el remoto de teranlenin si se desea push dual directo:
git remote add vercel-origin https://github.com/teranlenin/ipquest-360.git

# Flujo habitual de trabajo:
git add .
git commit -m "feat: <descripcion>"
git push origin main
```

---

## 3. ARQUITECTURA DE DOMINIOS Y DNS (NAMECHEAP & VERCEL)

### 3.1 Dominio y Subdominio
- **Dominio Raíz:** `transfertech-ipvalue.com` (Registrado en **Namecheap**, cuenta `teranlenin`).
- **Subdominio Asignado:** `ipquest.transfertech-ipvalue.com`

### 3.2 Registro DNS Configurado en Namecheap (Advanced DNS)
- **Tipo:** `CNAME Record`
- **Host:** `ipquest`
- **Target / Value:** `e032750a2d8460a2.vercel-dns-017.com.` (alternativa canónica: `cname.vercel-dns.com.`)
- **TTL:** `Automatic`
- **Estado:** Verificado, resolviendo y con SSL emitido.

### 3.3 Configuración en Vercel
- **Team:** `teranlenins-projects` (Hobby)
- **Proyecto:** `ipquest-360`
- **Preset de Framework:** `Vite`
- **Build Command:** `bun run build` (o `vite build`)
- **Output Directory:** `dist` / `.output`

---

## 4. ESTRUCTURA CANÓNICA DE ARCHIVOS DEL PROYECTO

El proyecto fue completamente normalizado desde su estado plano inicial a la estructura modular estándar:

```text
LOVABLE/
├── .git/
├── public/
├── src/
│   ├── components/
│   │   ├── BadgeShowcase.tsx        # Galería Trophy UI, animaciones de nivel y barra XP
│   │   ├── CrossIPGame.tsx          # Matriz de restricciones tipo crucigrama (CrossIP)
│   │   ├── IAM360Lab.tsx            # Laboratorio de diagnóstico, cálculo IARL 1-9 y reporte PDF
│   │   ├── ui/                      # Componentes Radix / Shadcn (Button, Card, Dialog, etc.)
│   │   └── ...
│   ├── hooks/                       # Custom hooks (use-toast, use-mobile, etc.)
│   ├── lib/
│   │   ├── badgesData.ts            # Definición de insignias C1-C15 y condiciones de desbloqueo
│   │   ├── crossipData.ts           # Desafíos matriciales (Signos Distintivos, Software, etc.)
│   │   ├── progress.ts              # Motor de persistencia en localStorage ('ipquest360:v2')
│   │   └── utils.ts                 # Funciones auxiliares de estilo (cn, twMerge)
│   ├── routes/
│   │   ├── index.tsx                # Dashboard principal con 4 pestañas interactivas
│   │   └── ...
│   ├── App.tsx
│   ├── index.css                    # Design system (Aurora gradients, Glassmorphism, Tailwind)
│   └── main.tsx
├── AGENTS.md                        # Reglas operativas para agentes
├── MEMORY.md                        # Esta memoria persistente
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 5. MÓDULOS PEDAGÓGICOS IMPLEMENTADOS

1. **Hero Section Modular (Estándar Design Rocket / designrocket.io):**
   - Eyebrow badge interactivo con pulso en vivo (`CITT · CONQUITO`).
   - Titular H1 de alto impacto, propuesta de valor y doble CTA de conversión rápida.
   - Bento-Grid interactivo integrado con 4 bloques atómicos: Nota Oficial en vivo (10.0), Crossmath, Tug of War y Ficha de Estudiante.
   - Trust strip inferior con soporte normativo (Decisión 486, 351 y COESCOP).

2. **Crossmath Numérico de Plazos y Métricas de PI (Inspirado en Imagen 3):**
   - Malla interactiva de nodos circulares interconectados por operadores (`+`, `-`, `×`, `/`, `=`).
   - Ecuaciones matemáticas reales aplicadas a plazos de patentes (20 años), modelos de utilidad (10 años), clases de Niza (45 clases), meses de gracia (12 meses) y niveles TRL (1 a 9).
   - Teclado táctil en pantalla y validación simultánea horizontal/vertical con dictamen jurídico.

3. **Tug of War: Duelo de Competencias y Tracción (Inspirado en Imagen 2):**
   - Reto en vivo: Equipo Alumno (Azul) vs. Equipo Rival CITT / IA (Rojo).
   - Cuerda física con pañuelo indicador que se desplaza hacia la izquierda con aciertos rápidos o a la derecha con fallos.
   - Temporizador contrarreloj de 40s y teclado numérico táctil en pantalla.

4. **Fichas Temáticas de Conocimiento Paralelo (KnowledgeBase):**
   - Explicación teórica profunda y previa a la evaluación para los 6 dominios normativos.
   - Artículos clave, conceptos diferenciales, errores frecuentes y casos prácticos reales.

5. **CrossIP (Matriz de Restricciones cruzadas):**
   - Matriz de coherencia jurídica entre Activo Intangible, Mecanismo Legal, Requisito y Efecto.

6. **Trophy UI & Sistema de Insignias (Inspirado en Imágenes 1 y 4):**
   - 5 insignias activas: Branding Shield, Copyright Vanguard, Trade Secret Sentinel, Patent Navigator, Master IAM 360.
   - Panel de los 5 pilares de gamificación: Nivel, Avatar, Control D-Pad, Objetivos y Premios.

7. **Sistema de Calificación Oficial Ponderada sobre 10.0 Puntos:**
   - Desglose transparente: Microaprendizaje (3.0 pts), Crucigramas Lógicos (3.0 pts), Duelo Tug of War (2.0 pts) y Laboratorio IAM-360 (2.0 pts).
   - Registro de estudiante (Nombres, Cédula, Institución).
   - Código de verificación criptográfico (`CITT-VAL-XXXXXXXX`) y reporte oficial imprimible para docente.

8. **IAM-360 Lab (Diagnóstico de Activos Intangibles):**
   - Inventario interactivo de activos, madurez IARL 1-9 y matriz de mitigación de riesgos.

---

## 6. COMANDOS CLAVE PARA SESIONES FUTURAS

```bash
# Directorio de trabajo
cd "D:\MEGA\2026\CONQUITO\ejecucionTDR\MES 6\05_P5_PREPARACION_M7_IQ_PROTEGE\LT PPT\HTML GAME\LOVABLE"

# Iniciar servidor local
bun run dev

# Compilar para producción localmente
bun run build

# Comprobar estado git
git status

# Desplegar cambios a producción (Vercel despliega automáticamente al detectar push)
git add .
git commit -m "feat: Hero Section modular, Crossmath, Tug of War y Calificacion 10.0"
git push origin main
```
