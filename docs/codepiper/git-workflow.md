# Git Workflow

## Remotes

| Remote     | Points to                        | Purpose                            |
| ---------- | -------------------------------- | ---------------------------------- |
| `origin`   | github.com/BenRacicot/code-piper | Our fork — push here               |
| `upstream` | github.com/continuedev/continue  | Their repo — pull only, never push |

## Branches

| Branch      | Purpose                                | Rules                                        |
| ----------- | -------------------------------------- | -------------------------------------------- |
| `main`      | Clean mirror of upstream               | NEVER commit here. Only merge from upstream. |
| `codepiper` | Default branch. All work happens here. | Rebrand, ToolPiper integration, features.    |

## How It Works

```
Continue (upstream/main)  ──flows into──>  main  ──flows into──>  codepiper
     (their work)                      (clean copy)            (our work)
```

`main` is a staging area. We pull their latest into `main`, then merge into `codepiper`. Conflicts are resolved on the `codepiper` side. `main` always matches upstream exactly.

## Syncing Upstream Changes

```bash
cd ~/dev/CodePiper

# Step 1: Update our mirror
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# Step 2: Merge into our branch
git checkout codepiper
git merge main
# Resolve conflicts if any, then:
git push origin codepiper
```

## Conflict Resolution

Most conflicts will be in the same ~6 files every time (the ones we rebranded or gutted):

- `extensions/vscode/package.json` — command IDs, metadata
- `core/control-plane/env.ts` — we gutted this
- `core/util/paths.ts` — renamed functions + config dir
- `core/util/posthog.ts` — we replaced with no-op
- `core/util/sentry/SentryLogger.ts` — we replaced with no-op
- `core/control-plane/TeamAnalytics.ts` — we replaced with no-op

Two tools are enabled to help:

1. **`git rerere`** — remembers how you resolved a conflict. Next time the same conflict appears, it auto-resolves. First merge is manual; subsequent merges are mostly automatic.
2. **`merge.conflictstyle = diff3`** — shows three versions (ours / base / theirs) instead of two, making it obvious which side changed what.

## Feature Branches

Branch off `codepiper`, PR back into `codepiper`:

```bash
git checkout codepiper
git checkout -b feature/toolpiper-provider
# ... work ...
git push -u origin feature/toolpiper-provider
# Create PR targeting codepiper (NOT main)
```
