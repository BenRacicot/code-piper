# Architecture

CodePiper inherits Continue's architecture. This doc covers the key pieces.

## Repo Structure

```
CodePiper/
  core/                     # Shared brain — IDE-agnostic
    llm/                    #   Provider abstraction, BaseLLM class
    llm/llms/               #   30+ provider implementations (OpenAI, Ollama, etc.)
    autocomplete/           #   Tab completion pipeline (FIM + chat fallback)
    indexing/               #   Codebase indexing (LanceDB vectors, SQLite FTS)
    tools/                  #   Agent tools (editFile, grep, terminal, etc.)
    protocol/               #   Typed message protocol (Core <-> IDE)
    control-plane/          #   GUTTED — was Continue's cloud platform
    util/
      paths.ts              #   ~/.codepiper/ config directory
      posthog.ts            #   GUTTED — telemetry disabled
      sentry/               #   GUTTED — error reporting disabled

  gui/                      # React webview (sidebar chat UI)
    src/styles/theme.ts     #   Theme colors (emerald green accents)
    src/components/svg/     #   Logo components (CodePiper branding)

  extensions/
    vscode/                 # VS Code extension
      package.json          #   Extension manifest (codepiper.* commands)
      src/                  #   Extension host (Node.js)
      media/                #   Icons (icon.png, sidebar-icon.png, code-piper.svg)
    intellij/               # JetBrains plugin (Kotlin)

  packages/
    openai-adapters/        # API adapter layer — THIS IS WHERE TOOLPIPER GOES
    config-yaml/            # YAML config schema (Zod)
    llm-info/               # Model metadata (context lengths, capabilities)
    fetch/                  # Custom fetch (SSL, proxy, SSE streaming)
    hub/                    # Continue Hub client — unused, can be removed

  binary/                   # Standalone Node.js binary (for JetBrains)
  docs/                     # Continue's Docusaurus docs site (upstream)
  docs/codepiper/           # Our internal dev docs (this folder)
```

## How the Extension Works

Two layers run inside VS Code:

### 1. Extension Host (Node.js)

`extensions/vscode/src/extension.ts` → `activate()` → creates:

- `VsCodeExtension` — orchestrator
- `Core` (from `core/core.ts`) — the brain, ~1500 lines
- `ContinueCompletionProvider` — tab autocomplete (VS Code InlineCompletionItemProvider)
- `VerticalDiffManager` — inline diff accept/reject UI
- `QuickEdit` — Cmd+I inline edit via Quick Pick
- Webview providers for sidebar and console

### 2. GUI Webview (React)

`gui/` is a React app (Vite + Tailwind + Redux) loaded in a VS Code sidebar panel.

- Chat input: TipTap rich text editor
- Message rendering: react-markdown with syntax highlighting
- State: Redux Toolkit with persistence

### Communication

- **Core <-> VS Code:** `InProcessMessenger` (same process, direct calls)
- **Core <-> Webview:** `postMessage()` / `onDidReceiveMessage()` via `VsCodeWebviewProtocol`
- **Core <-> JetBrains:** IPC or TCP via the `binary/` standalone process

## Provider System

Three layers:

1. **`BaseLLM`** (`core/llm/index.ts`) — abstract class with `_streamChat()`, `_streamComplete()`, `_streamFim()`, `_embed()`
2. **Provider implementations** (`core/llm/llms/`) — one file per provider (OpenAI.ts, Ollama.ts, etc.)
3. **`@continuedev/openai-adapters`** (`packages/openai-adapters/`) — lower-level HTTP adapter layer

For ToolPiper, we use the existing `OpenAI` provider with `apiBase: "http://localhost:9998/v1/"`.

## Config System

YAML-first: `~/.codepiper/config.yaml`

```yaml
models:
  - name: "My Local Model"
    provider: "openai"
    model: "llama-3.2-3b"
    apiBase: "http://localhost:9998/v1/"
    roles: [chat, autocomplete, embed]
```

Schema defined in `packages/config-yaml/`, validated with Zod.
