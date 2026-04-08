# ToolPiper Integration

The core differentiator: CodePiper is powered by ToolPiper for local-first AI coding. No subscriptions, no cloud, everything on your Mac.

## Current State

ToolPiper already serves an OpenAI-compatible API on `localhost:9998`:

- `POST /v1/chat/completions` — streaming SSE, full OpenAI format
- `GET /v1/models` — model listing in OpenAI format
- `GET /status` — server health + loaded models
- `GET /session-key` — ephemeral auth key (localhost only)

CodePiper already supports OpenAI-compatible endpoints via the `openai` provider. A minimal config works today:

```yaml
# ~/.codepiper/config.yaml
models:
  - name: "ToolPiper Local"
    provider: "openai"
    model: "llama-3.2-3b"
    apiBase: "http://localhost:9998/v1/"
    apiKey: "not-needed"
    roles: [chat]
```

## Phase 1: ToolPiper Provider (Custom Provider)

**Goal:** Zero-config experience. Install ToolPiper + CodePiper, start coding.

### What to build

Create a dedicated `ToolPiper` provider class at `core/llm/llms/ToolPiper.ts`:

```typescript
class ToolPiper extends OpenAI {
  static providerName = "toolpiper";
  static defaultOptions = {
    apiBase: "http://localhost:9998/v1/",
  };
}
```

### Auto-discovery

On extension activation:

1. Ping `GET http://localhost:9998/status`
2. If ToolPiper is running, read loaded models from the response
3. Auto-populate the model picker — no config.yaml needed
4. Watch for model changes via SSE (`GET /events?sk=<key>`)

### Session Key Auth

ToolPiper uses per-session auth. The extension should:

1. Read the session key from `~/.config/ToolPiper/.session-key` (file-based, 0600 permissions)
2. Or fetch via `GET /session-key` (localhost origins only)
3. Send as `X-Session-Key` header on all requests
4. Re-fetch on 401 (key rotates on ToolPiper restart)

### Key files to modify

- `core/llm/llms/ToolPiper.ts` — new provider (extend OpenAI)
- `core/llm/llms/index.ts` — register in LLMClasses array
- `packages/openai-adapters/src/index.ts` — add to `constructLlmApi()` switch
- `core/config/onboarding.ts` — default config uses toolpiper provider
- `extensions/vscode/src/extension/VsCodeExtension.ts` — auto-discovery on activation

## Phase 2: FIM Endpoint (Tab Completions)

**Goal:** Fast tab-complete powered by local models.

### The gap

ToolPiper currently has no FIM (fill-in-the-middle) endpoint. Continue's autocomplete calls `POST /v1/fim/completions` with `prefix` and `suffix` fields. Without FIM, tab completions fall back to chat (slower, less accurate).

### What to build in ToolPiper

llama-server already supports infill natively via the `/infill` endpoint. ToolPiper needs a proxy route:

```
POST /v1/fim/completions
{
  "model": "...",
  "prompt": "prefix text",
  "suffix": "suffix text",
  "max_tokens": 128,
  "stream": true
}
```

Route this through `ProxyRouter.swift` to llama-server's `/infill` endpoint, translating the request format.

### Key files in ToolPiper

- `apps/tool-piper/ToolPiper/Server/ProxyRouter.swift` — add FIM route
- `apps/tool-piper/ToolPiper/Server/ToolPiperHTTPServer.swift` — register the route

### Key files in CodePiper

- `core/llm/llms/ToolPiper.ts` — implement `_streamFim()` pointing to the new endpoint
- `core/autocomplete/CompletionProvider.ts` — verify FIM path is used when available

## Phase 3: Embeddings Endpoint (Codebase Indexing)

**Goal:** Index the codebase locally for context-aware completions.

### Option A: Expose NLEmbedding via ToolPiper (preferred)

ToolPiper already has `NLEmbeddingProvider` (Apple NaturalLanguage, 512-dim, on-device). Expose it as:

```
POST /v1/embeddings
{
  "model": "apple-nlembedding",
  "input": ["text to embed"]
}
→ {"data": [{"embedding": [0.1, 0.2, ...]}]}
```

### Option B: Use Continue's built-in transformers.js

Continue ships with `@xenova/transformers` and can run small embedding models (like `all-MiniLM-L6-v2`) entirely in the extension process. This works without any ToolPiper changes but is slower.

### Recommendation

Start with Option B (zero ToolPiper changes, works today), then migrate to Option A for better performance once the endpoint exists.

## Phase 4: MCP Pre-configuration

**Goal:** ToolPiper's 111 tools available to CodePiper's agent mode.

Continue already supports MCP servers. Ship CodePiper with ToolPiper pre-configured:

```yaml
# Default ~/.codepiper/config.yaml
mcpServers:
  - name: "toolpiper"
    url: "http://localhost:9998/mcp"
    transport: "http"
```

This gives the agent access to browser automation, PiperTest, scraping, RAG, actions, and everything else ToolPiper offers.

### Key files

- `core/config/onboarding.ts` — include toolpiper MCP in default config
- `core/config/default.ts` — default config template

## Phase 5: Voice Integration

**Goal:** Push-to-talk dictation pipes into chat input or inline edit.

ToolPiper already has push-to-talk (Right Option key). The integration:

1. ToolPiper STT produces text
2. Text is sent to CodePiper via a custom protocol message
3. CodePiper injects it into the active input (chat or inline edit)

This could work via:

- SSE event from ToolPiper (`dictation.completed` with text payload)
- Or a VS Code command that CodePiper registers and ToolPiper invokes

## Phase 6: Onboarding Rework

**Goal:** Replace Continue's cloud login flow with ToolPiper-oriented setup.

The current onboarding shows "Log in to CodePiper" and references Continue Hub. Replace with:

1. Check if ToolPiper is running (`GET /status`)
2. If yes: show loaded models, "Ready to code" state
3. If no: show "Install ToolPiper" with link to Mac App Store / modelpiper.com
4. Model download: if ToolPiper is running but no models loaded, show download options

### Key files

- `gui/src/components/OnboardingCard/` — rework the landing and tabs
- `core/config/onboarding.ts` — default config generation
