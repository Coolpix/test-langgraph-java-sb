# Project Desk

Aplicación frontend para gestionar proyectos, tareas y preferencias de trabajo desde el navegador. Los datos se guardan en `localStorage`, por lo que la información permanece solo en este navegador.

## Stack

- [Vue](https://vuejs.org/) 3.5 con Composition API y `<script setup>`
- [Vue Router](https://router.vuejs.org/) 4.6
- [Pinia](https://pinia.vuejs.org/) 3.0
- [Vite](https://vitejs.dev/) 8.3
- [TypeScript](https://www.typescriptlang.org/) 5.9
- [Vitest](https://vitest.dev/) 5.0 con `jsdom` y cobertura `v8`
- [ESLint](https://eslint.org/) 10 con `typescript-eslint`

## Requisitos

- Node.js `>= 24.15.0`
- npm `11.17.0` (declarado en `packageManager`)

## Instalación

```bash
npm ci
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo en `127.0.0.1` |
| `npm run typecheck` | Verifica tipos con `vue-tsc --noEmit` |
| `npm run lint` | Ejecuta ESLint sobre `src` sin advertencias |
| `npm run build` | Ejecuta typecheck, lint y empaquetado con Vite |
| `npm run preview` | Previsualiza la build en `127.0.0.1` |
| `npm run test` | Ejecuta los tests con Vitest |
| `npm run test:coverage` | Ejecuta los tests con informe de cobertura |

## Estructura del proyecto

```
├── public/                 # Activos estáticos (no presente en el contexto)
├── src/
│   ├── components/         # Componentes reutilizables (ProjectCard, StatCard, TaskTable, TaskEditor)
│   ├── composables/        # Composables (useTaskList)
│   ├── data/               # Datos de demostración (createDemo)
│   ├── router.ts           # Definición de rutas
│   ├── services/           # Lógica de dominio y persistencia (portfolio, preferences, storage, taskEditor)
│   ├── stores/             # Stores de Pinia (preferences, workspace)
│   ├── utils/              # Utilidades (dates, metrics, taskQuery)
│   ├── views/              # Vistas de página (Dashboard, Projects, Project, Preferences, NotFound)
│   ├── App.vue             # Shell de la aplicación
│   ├── main.ts             # Punto de entrada
│   └── types.ts            # Tipos de TypeScript
├── eslint.config.js        # Configuración de ESLint
├── tsconfig.json           # Configuración de TypeScript
├── vite.config.ts          # Configuración de Vite
├── vitest.config.ts        # Configuración de Vitest
└── sonar-project.properties # Configuración de SonarQube
```

## Rutas

- `/` — Resumen general (Dashboard)
- `/projects` — Listado de proyectos
- `/projects/:id` — Detalle de un proyecto
- `/preferences` — Preferencias de visualización
- `/:pathMatch(.*)*` — Página no encontrada

## Persistencia

- **Workspace:** proyectos y tareas se almacenan en `localStorage` bajo la clave `project-desk.workspace.v1`.
- **Preferencias:** opciones como mostrar tareas completadas, filas compactas y tareas por página se guardan bajo `project-desk.preferences.v1`.
- Si no hay datos guardados, se carga un workspace de demostración definido en `src/data/demo.ts`.

## Calidad

- **TypeScript:** configuración estricta con `noEmit`.
- **Lint:** ESLint con la configuración recomendada de `typescript-eslint` y reglas adicionales para `src/**/*.ts`.
- **Tests:** Vitest con entorno `jsdom`; cobertura configurada para archivos bajo `src/**/*.{ts,vue}`.
- **SonarQube:** el proyecto incluye `sonar-project.properties` para análisis estático.

## Convenciones

- Componentes y utilidades están escritos en TypeScript con `<script setup lang="ts">`.
- Los tests conviven junto al código fuente con el sufijo `.test.ts`.
- Los valores monetarios/temporales se formatean para español (`es-ES`).
