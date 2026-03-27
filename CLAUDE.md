# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev                    # Start dev server (localhost:3000)
pnpm devsafe               # Clean .next then start dev
pnpm build                 # Production build
pnpm start                 # Run production server

# Code quality
pnpm lint                  # ESLint
pnpm tsc --noEmit          # TypeScript type-check (run after code changes)

# Schema
pnpm generate:types        # Regenerate payload-types.ts after schema changes
pnpm generate:importmap    # Regenerate admin import map after component changes

# Testing
pnpm test                  # All tests (integration + e2e)
pnpm test:int              # Vitest unit/integration tests (tests/int/**/*.int.spec.ts)
pnpm test:e2e              # Playwright e2e tests (tests/e2e/)
pnpm test:int -- --reporter=verbose  # Single test file: add path after --
```

**Required env vars:** `DATABASE_URL` (MongoDB), `PAYLOAD_SECRET` (JWT signing key). See `.env.example`.

## Architecture

This is a **Next.js 16 + Payload CMS 3** monorepo set up as a WordPress-to-Payload migration template.

### Route Groups

- `src/app/(frontend)/` — Public-facing Next.js pages
- `src/app/(payload)/` — Payload admin panel (`/admin`) and auto-generated REST/GraphQL API endpoints
- `src/app/my-route/` — Example custom API route using `getPayload()`

The REST API (`/api/[...slug]`) and GraphQL endpoint (`/api/graphql`) are entirely auto-generated from collection configs.

### Collections (WordPress migration schema)

All collections include `wpId` fields for tracking the original WordPress source:

| Collection | Notes |
|---|---|
| `users` | Auth-enabled; roles: Administrator, Editor, Author, Contributor, Subscriber |
| `posts` | Drafts + versioning; relationships to users/categories/tags/media |
| `pages` | Drafts + versioning; hierarchical (self-referencing `parent`) |
| `media` | Upload collection; public read access |
| `categories` | Hierarchical taxonomy with `parent` |
| `tags` | Flat taxonomy |

### Key Config Files

- `src/payload.config.ts` — Main Payload config (collections, DB adapter, editor, TypeScript output)
- `src/payload-types.ts` — **Auto-generated** — never edit manually; run `generate:types` to update
- `src/app/(payload)/admin/importMap.js` — **Auto-generated** — run `generate:importmap` after adding custom components

## Critical Payload Patterns

### Local API bypasses access control by default

```typescript
// WRONG — skips access control
const result = await payload.find({ collection: 'posts' })

// CORRECT — enforces access control
const result = await payload.find({ collection: 'posts', overrideAccess: false, user: req.user })
```

### Always pass `req` in hooks to maintain transaction safety

```typescript
// In hooks, pass req to nested operations
await payload.update({ collection: 'posts', id, data, req })
```

### Prevent infinite hook loops with context flags

```typescript
if (req.context?.skipHook) return
await payload.update({ ..., req: { ...req, context: { skipHook: true } } })
```

### Run after schema changes

After modifying any collection field or adding custom admin components, always run:
```bash
pnpm generate:types && pnpm generate:importmap
```

## Code Style

Prettier config: single quotes, no semicolons, trailing commas, 100-char line width. Auto-formats on save in VSCode. Path alias `@/*` maps to `src/*`.
