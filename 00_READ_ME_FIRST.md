# MATCHSPEC — Builder Pack

## What this is

MatchSpec is a GenLayer-native compatibility registry for physical devices, components, accessories, and technical equipment.

It answers:

> Do these two specific things work together, and if so, under what limitations?

Examples:
- laptop + dock
- camera body + lens
- motherboard + RAM
- charger + phone/laptop
- router + network module
- device + replacement battery
- console + accessory
- power supply + component
- storage device + enclosure
- industrial equipment + replacement part

The MVP is deliberately:

```text
GenLayer Intelligent Contract + frontend
```

No application backend is required.

The Intelligent Contract:
- stores registered items and compatibility pairs;
- stores configured public technical sources;
- independently fetches those sources during adjudication;
- asks validators to reduce technical evidence into bounded structured compatibility fields;
- reaches consensus;
- writes the canonical compatibility result and assessment history on-chain.

The frontend:
- uses an injected EIP-1193 wallet;
- reads/writes directly to GenLayer;
- presents a technical compatibility matrix and record history.

## Canonical compatibility states

- `DIRECT_COMPATIBLE`
- `ADAPTER_REQUIRED`
- `PARTIAL_COMPATIBILITY`
- `CONDITIONAL`
- `INCOMPATIBLE`
- `UNKNOWN`

## Hard constraints

- Contract + frontend only.
- No Firebase.
- No Supabase.
- No FastAPI.
- No Express.
- No server-side compatibility judge.
- No trusted off-chain AI service.
- No mock data presented as live contract data.
- Injected wallet first.
- Do not require MetaMask Snaps.
- Studionet chain ID: `61999`.
- Public HTTPS technical sources only.
- The contract must perform the web retrieval and interpretation.
- Validator output must be structured.
- Do not compare raw HTML with strict equality.
- Technical failures must not overwrite the last valid compatibility result.
- Every assessment must record the exact source version used.
- Contract state is authoritative.
- After writes finalise, read state back before showing success.

## UI rule

MatchSpec must **not look like an AI SaaS dashboard**.

Design direction:

> industrial parts catalogue × engineering drawing sheet × compatibility matrix

No purple gradients, glowing blobs, glassmorphism, robot imagery, chatbot, giant rounded cards, or generic AI visual language.

## Build order

1. `01_PRODUCT_BRIEF.md`
2. `02_PRD.md`
3. `03_ARCHITECTURE.md`
4. `04_INTELLIGENT_CONTRACT_SPEC.md`
5. `05_COMPATIBILITY_CONSENSUS_SPEC.md`
6. `06_FRONTEND_UX_SPEC.md`
7. `07_UI_DESIGN_SYSTEM.md`
8. `08_TEST_PLAN.md`
9. `09_DEPLOYMENT_RELEASE.md`
10. `10_CODEX_MASTER_PROMPT.md`

## Current GenLayer references

Checked 30 August 2026:

- https://docs.genlayer.com/developers/networks
- https://docs.genlayer.com/developers/intelligent-contracts/features/web-access
- https://docs.genlayer.com/developers/intelligent-contracts/tooling-setup
- https://docs.genlayer.com/developers/intelligent-contracts/deploying/network-configuration

Current Studionet:
- RPC: `https://studio.genlayer.com/api`
- chain ID: `61999`
- currency: `GEN`
- explorer: `https://explorer-studio.genlayer.com`
