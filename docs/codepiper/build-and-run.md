# Build & Run

## Prerequisites

- Node.js >= 20.20.1 (check with `node -v`)
- npm (comes with Node)
- VS Code (for testing the extension)

## Install Dependencies

```bash
cd ~/dev/CodePiper

# Root (husky, prettier, concurrently)
npm install

# Internal packages (must be done before core)
cd packages/config-yaml && npm install && cd ../..
cd packages/fetch && npm install && cd ../..
cd packages/openai-adapters && npm install && cd ../..
cd packages/config-types && npm install && cd ../..
cd packages/llm-info && npm install && cd ../..

# Core, GUI, Extension
cd core && npm install && cd ..
cd gui && npm install && cd ..
cd extensions/vscode && npm install && cd ../..
```

## Development (Watch Mode)

Terminal 1 — GUI dev server:

```bash
cd gui && npm run dev
# Starts Vite at http://localhost:5173
```

Terminal 2 — Extension build:

```bash
cd extensions/vscode && npm run esbuild-watch
```

Terminal 3 — Launch in VS Code:

- Open `~/dev/CodePiper` in VS Code
- Press F5 (or Run > Start Debugging)
- A new VS Code window opens with CodePiper loaded
- The sidebar loads the GUI from localhost:5173 (hot reload)

## Type Checking

```bash
# Check all packages
npx tsc --project core/tsconfig.json --noEmit
npx tsc --project extensions/vscode/tsconfig.json --noEmit
npx tsc --project gui/tsconfig.json --noEmit
```

Note: ~61 type errors exist in upstream's code (unbuilt workspace packages + loose `any` types). These resolve in the full CI build pipeline.

## Package as .vsix

```bash
cd extensions/vscode

# Build the GUI first
cd ../../gui && npm run build && cd ../extensions/vscode

# Pre-package (copies GUI assets, downloads deps)
npm run prepackage

# Package into .vsix
npm run package
# Output: build/codepiper-{version}.vsix
```

## Install the .vsix Locally

```bash
code --install-extension build/codepiper-0.1.0.vsix
```

## Tests

```bash
# Extension unit tests
cd extensions/vscode && npm test

# Core tests
cd core && npx vitest run

# GUI tests
cd gui && npx vitest run
```

## Troubleshooting

### "Cannot find module '@continuedev/config-yaml'"

The internal packages need to be installed. Run `npm install` in each `packages/*` directory.

### Extension doesn't load

Check the VS Code Developer Console (Help > Toggle Developer Tools) for errors. Common issues:

- Wrong extension ID in `getExtension()` calls (should be `ModelPiper.codepiper`)
- Missing GUI build (run `npm run build` in `gui/`)

### Hot reload not working

Make sure the GUI dev server is running on port 5173. The extension detects dev mode and loads from localhost instead of bundled assets.
