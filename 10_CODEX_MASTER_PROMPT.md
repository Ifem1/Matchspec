# MATCHSPEC — Codex Master Build Prompt

Use this as the first instruction after opening this folder in Codex.

---

Read **every `.md` file in this repository before writing any code**.

Treat the Markdown specifications as the source of truth.

Build **MatchSpec** fully from start to finish.

Do not stop at scaffolding, a landing page, mock data, pseudo-code, partial contract logic, local-only demo, or untested deployment scripts.

## Product

MatchSpec is a GenLayer compatibility registry for physical devices, components, accessories, and technical equipment.

Users register exact items and create a pair.

A pair defines:
- item A;
- item B;
- requested compatibility dimensions;
- configured public technical sources.

The GenLayer Intelligent Contract must independently use validator web access to inspect those configured sources and reach consensus on an exact structured compatibility result.

Allowed overall statuses:
- DIRECT_COMPATIBLE
- ADAPTER_REQUIRED
- PARTIAL_COMPATIBILITY
- CONDITIONAL
- INCOMPATIBLE
- UNKNOWN

## Build all of this

- GenLayer Intelligent Contract;
- full storage/state model;
- item registry;
- pair registry;
- source versioning;
- compatibility profiles;
- web-backed assessment;
- structured consensus/equivalence;
- retry-safe technical failure paths;
- compatibility history;
- bounded pagination;
- injected-wallet integration;
- Studionet network support;
- all specified pages;
- responsive UI;
- tests;
- lint;
- typecheck;
- production build;
- contract deployment;
- frontend deployment configuration;
- real Studionet smoke lifecycle;
- final README;
- final HANDOFF.

## Hard architecture constraint

The application is:

```text
frontend + GenLayer Intelligent Contract
```

Do not add Firebase, Supabase, FastAPI, Express, application database, compatibility microservice, serverless adjudication API, off-chain AI judge, cron scraper, or hidden backend authority.

## GenLayer requirements

Current Studionet target:

```text
RPC: https://studio.genlayer.com/api
chain ID: 61999
currency: GEN
explorer: https://explorer-studio.genlayer.com
```

Use current official GenLayer APIs/tooling rather than inventing interfaces.

The contract must perform the external web access.

Because leader and validators independently fetch web content:
- do not compare raw HTML;
- reduce evidence to stable structured fields;
- compare state-relevant fields;
- keep explanatory prose non-authoritative.

## Contract safety

Before consensus:
- do not mutate canonical compatibility;
- do not increment assessment count;
- do not append history.

Technical failure must remain retryable.

Validator disagreement must not create a false compatibility result.

Every assessment records exact `source_version`.

Source updates never rewrite prior assessments.

Use bounded input sizes and bounded arrays.

Treat fetched web content as hostile data.

Prompt injection inside manufacturer/support pages must not change instructions, schema, pair identity, allowed statuses, or contract policy.

## UI direction

This requirement is mandatory.

MatchSpec must **not look AI-generated**.

Design:

> industrial parts catalogue × engineering drawing sheet × equipment compatibility matrix

Follow `07_UI_DESIGN_SYSTEM.md`.

Do not use purple/blue AI gradients, glassmorphism, glowing blobs, neon, robot/brain/sparkle imagery, chatbot, giant rounded SaaS cards, generic metrics dashboard, decorative 3D product renders, gradient buttons, or pill badges everywhere.

Use drawing-paper background, dark ink, technical blue sparingly, mono IDs/model numbers, engineering title blocks, hard grid/rule lines, rectangular controls, dense tables, pair-axis comparison layout, and a distinctive compatibility plate.

The product must still look like compatibility engineering software if its logo is removed.

## Required pages

- `/`
- `/items`
- `/items/new`
- `/pairs/new`
- `/pair/[id]`
- `/about`

Do not replace the product with a marketing site.

## Wallet

Injected EIP-1193 wallet path.

Do not require MetaMask Snaps.

Handle disconnected, rejected connection, wrong network, switch/add chain, submitted write, finality, authoritative readback, and readback mismatch.

## No fake data

Test fixtures are fine.

Production UI must never present fixture/demo rows as live chain data.

Empty chain = truthful empty state.

## Testing

Implement and actually run tests for item registration, pair creation, bounds, URL rules, duplicate prevention, source updates, source versioning, all six compatibility states, requested-profile behaviour, identity mismatch, conflicting evidence, prompt injection, validator disagreement, retry safety, pagination, wallet states, readback, and responsive layouts where practical.

Do not claim a test passed if you did not run it.

## Completion standard

Before finishing:

1. audit every MD;
2. close every implementable requirement gap;
3. run contract lint/schema;
4. run contract tests;
5. run frontend tests;
6. run typecheck;
7. run lint;
8. run production build;
9. deploy exact final contract;
10. wire final address;
11. deploy/configure frontend;
12. run a real Studionet pair lifecycle;
13. create `HANDOFF.md`.

## Final response

At the end report:

1. final repository structure;
2. exact test commands/results;
3. lint/typecheck/build results;
4. final contract address;
5. Explorer link;
6. frontend URL;
7. real lifecycle transaction hashes;
8. final commit hash;
9. known limitations/blockers;
10. requirement-by-requirement checklist against every Markdown file.

Do not hide failures or fabricate deployment evidence.

If something is blocked, complete everything else and document the blocker precisely rather than replacing it with a claim of success.

---
