# MATCHSPEC Handoff

## Current release audit

| Field | Value |
|---|---|
| Repository | https://github.com/Ifem1/Matchspec |
| Commit | `2d0b0a8ba9a18b5742c88a1995151be2eb407fd3` |
| Network | Studionet |
| Chain ID | 61999 |
| Contract | `0xa0da92e2779F00dc25b03Ed2E25E04746bE47858` |
| Explorer | https://explorer-studio.genlayer.com/address/0xa0da92e2779F00dc25b03Ed2E25E04746bE47858 |
| Contract SHA-256 | `3754E9BA208E331A9BA68D14AEA4E2C248580DF04E0F41323A98F5C0F608EA49` |
| Frontend URL | https://matchspec.vercel.app/ (requires final address update) |

## Deployment and lifecycle evidence

| Operation | Transaction / result |
|---|---|
| Deploy | `0x3e85f702c7b231e09ee08e7d7e60529170947dc1a1741efa6e9eba2ad491578b` |
| Item A | `0xa8ce6ac44f42db919161dcba33d65b4f7413d14b629613f48d3349f5a7abcd10` |
| Item B / Pair | Accepted; exact hashes were truncated by the CLI output; pair-count readback returned `1` |
| Assessment | `0x824ea7ab16a378ed2c23e2e4513adf954e1820212bc9eb758fb10429433245f6` — failed to commit; canonical `assessment_count` remained `0` |

The pair transaction was accepted and pair-count readback returned `1`; its complete hash was not captured in the terminal output and is intentionally not fabricated here.

## Diagnostic accounts

Fresh local encrypted accounts were created for testing and funded with 1 GEN each. Private keys are not recorded here.

- `0x1c90179fc3de89be1693bcb65456d6fdb24e8a9e`
- `0x0f994bb609472e0892aeb4004001ac270bf872d5`

## Current blockers

- Direct Mode currently fails before contract import with `DecodingError: unexpected end of memory` in the installed Windows GenLayer runner.
- The Studionet RPC does not expose `gen_dbg_traceTransaction`, so the failed assessment cannot be traced through that endpoint.
- A successful assessment/reassessment and source-version history on this exact deployment are not yet proven.
- Vercel still points at the previous contract configuration until a new final deployment is verified.

## Honest limitations

Configured sources are selected by the pair creator; source ownership is not cryptographically proven; documentation can change; model/revision naming can be ambiguous; results can become stale; web failures and validator disagreement are possible; Studionet is a development network.
