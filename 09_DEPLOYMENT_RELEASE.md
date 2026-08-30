# MATCHSPEC — Deployment & Release

## Current Studionet

Checked against current public GenLayer docs on 30 August 2026:

```text
RPC       https://studio.genlayer.com/api
Chain ID  61999
Currency  GEN
Explorer  https://explorer-studio.genlayer.com
```

## Suggested environment

```bash
NEXT_PUBLIC_GENLAYER_RPC=https://studio.genlayer.com/api
NEXT_PUBLIC_GENLAYER_CHAIN_ID=61999
NEXT_PUBLIC_MATCHSPEC_CONTRACT=0x...
```

Do not commit secrets.

Injected-wallet writes should not need a private key in frontend environment variables.

## Contract release

Before deployment:
1. run GenVM lint;
2. extract/check schema;
3. run direct tests;
4. run structural/preflight checks;
5. record final source commit;
6. ensure only intended deployable contract is used.

After deployment:
1. record contract address;
2. record deploy transaction;
3. inspect Explorer;
4. register two real test items;
5. create a real pair;
6. run a real web-backed compatibility assessment;
7. record relevant transaction hashes.

## Frontend

Deploy a production build, for example on Vercel.

The hosted frontend may serve HTML/JS, but it must not become a hidden compatibility backend.

Do not add `/api/assess`, server AI calls, or server evidence fetching used as authority.

## Injected wallet path

```text
detect EIP-1193 provider
→ request accounts
→ inspect chain
→ switch/add Studionet if necessary
→ submit write
→ wait for terminal/final state
→ read contract
→ show authoritative result
```

Do not require MetaMask Snap methods.

## HANDOFF.md

Final handoff must contain:

```text
Project:
Repository:
Final commit:
Frontend URL:
Network:
Chain ID:
Contract:
Explorer:
Deploy tx:
Item A tx:
Item B tx:
Pair tx:
Assessment tx:
Source update tx:
Second assessment tx:
Contract tests:
Frontend tests:
Typecheck:
Lint:
Build:
Known limitations:
```

## Honest limitations

Disclose:
- configured sources are selected by pair creator;
- source ownership is not cryptographically proven;
- documentation can change;
- model/revision naming can be ambiguous;
- a result can become stale until reassessed;
- web failures and validator disagreement are possible;
- Studionet is a development environment.
