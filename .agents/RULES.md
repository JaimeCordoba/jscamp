# Project Rules

## TypeScript & Architecture

- **No Barrel Files**: Do not use `index.ts` files to re-export modules (barrel files). Always use explicit imports from the specific file where the member is defined.
- **Explicit Imports**: Prefer `import { Thing } from './path/to/Thing'` over `import { Thing } from './path/to'`.
- **Naming**: Use descriptive names for files and variables. File names should generally be in camelCase or kebab-case depending on the project part (Frontend uses camelCase for components, kebab-case for some utils, check existing files).
