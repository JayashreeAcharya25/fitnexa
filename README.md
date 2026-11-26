# FitNexa

FitNexa is a gym console for day-to-day operations: who is in the gym, how the week is moving, and who can sign in to manage it. This repository holds the web console and the management API.

## Repository

| Folder | What it is |
| --- | --- |
| `console-ui` | Next.js console. Sign-in is the first screen. |
| `management-api` | NestJS API. It is the starter service and does not yet handle authentication. |

Each app has its own `package.json`. Install and run them separately.

## Prerequisites

- Node.js 20 or newer
- npm

## Console

```bash
cd console-ui
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

The console uses the Pages Router, Material UI, and Bootstrap utility classes. Shared type, color, and component defaults live in `console-ui/styles/theme/theme.ts`. CSS is split under `console-ui/styles`:

- `base` — color variables and the Open Sans font
- `module` — component styles
- `theme` — the Material UI theme
- `globals.css` — Open Sans, Bootstrap, and the files above

Brand colors:

| Name | Hex |
| --- | --- |
| Shadow Grey | `#232528` |
| Shamrock | `#169873` |
| Parchment | `#F2EDEB` |

Public screens:

| Route | Status |
| --- | --- |
| `/login` | Sign-in screen |
| `/(public)/register` | Placeholder |
| `/(public)/forgot-password` | Placeholder |

## API

The API listens on port `3000` by default, the same port as the console. Start it on another port when both are running.

```bash
cd management-api
npm install
```

PowerShell:

```powershell
$env:PORT = 3001
npm run start:dev
```

macOS and Linux:

```bash
PORT=3001 npm run start:dev
```

| Script | Purpose |
| --- | --- |
| `npm run start:dev` | Start in watch mode |
| `npm run start` | Start once |
| `npm run build` | Compile to `dist` |
| `npm run start:prod` | Run the compiled app |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run lint` | ESLint |

## Stack

- Console: Next.js 16, React 19, TypeScript, Material UI, Emotion, Bootstrap 5, Lucide
- API: NestJS 11, TypeScript
