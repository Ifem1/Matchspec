# MATCHSPEC Handoff

## Current release audit

| Field | Value |
|---|---|
| Repository | https://github.com/Ifem1/Matchspec |
| Commit | `a419c3ad6dcd8e4de6eec1be3202e1c53c4c684e` |
| Network | Studionet |
| Chain ID | 61999 |
| Contract | `0x3A9DB86D7E451bc0382D710629FeC91A6F3E5EDF` |
| Explorer | https://explorer-studio.genlayer.com/address/0x3A9DB86D7E451bc0382D710629FeC91A6F3E5EDF |
| Contract SHA-256 | `E4FF569A0051FFD443BB1DF83CD5D6DFDDD5D78F944B2F584ED0AC375A07ACD6` |
| Frontend URL | https://matchspec.vercel.app/ (requires final address update) |

## Deployment and lifecycle evidence

| Operation | Transaction / result |
|---|---|
| Deploy | `0x1f2159ecc1f7b70f8c6ebccfcaa48c87a212ad1b60fa1a273163a4c5aef7039a` |
| Item A | `0x8009dce1ff8befe064ee55b0c1a032e883036c790c0cdb39a20f54af64de8ced` |
| Item B | `0x41c0e0e668cf660a53aed96bd766808706d7660659b4e423ae5a0b4d19a58a5f` |
| Pair | Accepted; exact hash not captured in the terminal output |
| Assessment | `0x30ba4a917274a32d27c95280b00bcb1571f4e57b4c951fb3b2acb947994ac0f1` — failed to commit; canonical `assessment_count` remained `0` |

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
