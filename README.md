# Movie Vault

An Angular app for browsing and searching movies from [TMDb](https://www.themoviedb.org/), organised as an Nx monorepo.

## Getting started

Requires a recent Node.js LTS version and npm.

```bash
git clone https://github.com/pnoroc/ng-movie-vault
cd ng-movie-vault
npm install
npm start
```

Then open http://localhost:4200.

TMDb settings (API URL, image URL, token) live in `apps/movie-vault/src/environments/environment.ts`.

## Main dependencies

- **Angular 22**: framework (signals, standalone components, `httpResource`)
- **RxJS**: request streams in the movies service
- **Tailwind CSS 4**: styling
- **Nx 23**: monorepo tooling, task running and module boundaries
- **Vitest** (via Analog): unit tests

## Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm start`     | Serves the app in development mode          |
| `npm test`      | Runs the unit tests of all `packages/*` libs |
| `npm run lint`  | Lints all `packages/*` libs                  |

## Nx module boundaries

Every project has two tags, a **type** (its layer) and a **scope** (its domain). The `@nx/enforce-module-boundaries` rule in `eslint.config.mjs` fails lint on any import that breaks these constraints.

**Type**: which layer a project may import from

| Tag                | Purpose                            | May depend on                             |
| ------------------ | ---------------------------------- | ----------------------------------------- |
| `type:app`         | Application entry point            | shell, feature, data-access, ui, models   |
| `type:shell`       | App layout (header, router outlet) | ui, models                                |
| `type:feature`     | Routed pages, smart components     | data-access, ui, models                   |
| `type:data-access` | Services, interceptors, resolvers  | models                                    |
| `type:ui`          | Presentational components          | ui, models                                |
| `type:models`      | Interfaces and types               | models                                    |

**Scope**: which domain a project may import from

| Tag            | May depend on              |
| -------------- | -------------------------- |
| `scope:app`    | app, movies, shared        |
| `scope:movies` | movies, shared             |
| `scope:shared` | shared only                |
