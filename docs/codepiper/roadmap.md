# Roadmap

Phased plan from fork to shippable product.

## Phase 0: Fork & Rebrand [DONE]

- [x] Fork Continue.dev to github.com/BenRacicot/code-piper
- [x] Branch strategy: `main` (upstream mirror) + `codepiper` (our work)
- [x] Full rebrand: 189 files, extension metadata, command IDs, settings, config paths
- [x] Icons and logo: marketplace, sidebar, SVG components
- [x] Theme: emerald green accents
- [x] Strip cloud: PostHog, Sentry, TeamAnalytics, control plane → no-ops
- [x] Apache 2.0 NOTICE file

## Phase 1: ToolPiper Provider

**Priority:** HIGH — this is the core value prop.

- [ ] Create `core/llm/llms/ToolPiper.ts` provider (extends OpenAI)
- [ ] Register in provider index
- [ ] Auto-discovery: ping `/status` on activation, populate model picker
- [ ] Session key auth: file read + header injection
- [ ] SSE model change watching
- [ ] Default config uses `toolpiper` provider

**Estimate:** 1 week

## Phase 2: FIM Endpoint

**Priority:** HIGH — tab completions are the #1 daily-use feature.

- [ ] Add `POST /v1/fim/completions` to ToolPiper (proxy to llama-server `/infill`)
- [ ] Implement `_streamFim()` in ToolPiper provider
- [ ] Test with code completion scenarios
- [ ] Measure latency vs chat fallback

**Estimate:** 2-3 days (ToolPiper side) + 1 day (CodePiper side)

## Phase 3: Codebase Indexing

**Priority:** MEDIUM — makes context-aware suggestions much better.

- [ ] Verify Continue's built-in transformers.js embeddings work with local setup
- [ ] (Later) Add `POST /v1/embeddings` to ToolPiper via NLEmbeddingProvider
- [ ] Test codebase indexing on a real project
- [ ] Tune chunk sizes for local model context windows

**Estimate:** 1 week

## Phase 4: MCP Pre-configuration

**Priority:** MEDIUM — huge differentiator, low effort.

- [ ] Ship default config with ToolPiper MCP server pre-configured
- [ ] Test agent mode with ToolPiper tools (browser, scrape, test, actions)
- [ ] Curate which tools are surfaced by default (too many = noise)

**Estimate:** 2-3 days

## Phase 5: Onboarding Rework

**Priority:** MEDIUM — first impression matters.

- [ ] Replace cloud login with ToolPiper detection
- [ ] "Install ToolPiper" flow for new users
- [ ] Model download UI (if ToolPiper running but no models)
- [ ] "Ready to code" state when everything is connected

**Estimate:** 1 week

## Phase 6: Voice Integration

**Priority:** LOW — differentiator but not essential for launch.

- [ ] Push-to-talk → chat input pipe
- [ ] Push-to-talk → inline edit pipe
- [ ] SSE or VS Code command integration

**Estimate:** 1 week

## Phase 7: Distribution

**Priority:** HIGH (after Phase 1-2 are solid)

- [ ] Create ModelPiper publisher on VS Code Marketplace
- [ ] Package and publish
- [ ] Publish to Open VSX (for VSCodium users)
- [ ] GitHub Releases with .vsix downloads
- [ ] Landing page on modelpiper.com

**Estimate:** 1 week

## Phase 8: Upstream Sync Automation

**Priority:** LOW — nice to have for maintenance.

- [ ] GitHub Action: auto-create PR when upstream `main` advances
- [ ] Notify when upstream touches files we've modified
- [ ] Changelog tracking of upstream features worth pulling

**Estimate:** 2-3 days

## Future: Full IDE Fork

If CodePiper gains enough traction to justify:

- Fork VS Code itself (like Cursor/Windsurf did)
- The `core/` layer is IDE-agnostic by design — same code works
- Decision gate: 10K+ extension installs or clear acquisition interest
