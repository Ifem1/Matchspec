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

## Disposable diagnostic evidence

- Exact source preserved on local branch `audit/diagnostic-fced0892`, commit `bb85a91`; SHA-256 `3944828A261D85ED46BFC60BB676D36A7241C8DE7EA476D3E0DBD9EDAD6A9DF2`.
- Runner dependency: `genlayer-py 0.18.0`, `genlayer-test 0.29.2`, `genvm-linter 0.11.0`, `py-genlayer` dependency hash as declared in the source.
- Diagnostic deployment tx: `0xfced08927d0624655081bc44cdb12c49e070dc06c33d6907e6a0567357fe8115`; protocol-returned address `0x6d91CfAE5262C511EbaAB44D2494f3C40a24352e`.
- Actual receipt: `status=7` / `FINALIZED`; `result=6` / `MAJORITY_AGREE`; leader `execution_result=ERROR`; payload `invalid_contract absent_runner_comment`; no `FINISHED_WITH_RETURN` execution result.
- Classification: failed diagnostic deployment, not an indexing delay. The protocol address is not a callable contract because deployment execution failed.
- Web-only tx attempts `0x769251671b61e28cbb8da503162c119a9d85d44866910300df73a0f4696bc74b` and `0x02d312529dfe120085cd72765e647265ce3a0b2e4f6acbbadf6d8e6e41058a0a` returned `contract_not_found_handler`; they are invalid ladder evidence because deployment was not successful.

## Valid diagnostic ladder

- Valid diagnostic source branch: `audit/diagnostic-valid-header`, commit `ea7606a1`, SHA-256 `D1B781AC8C3D9820AE8AB6321CBCBE0A15192C8B1DF34F1062E5DC9F94E616FC`.
- Valid diagnostic deployment: tx `0x69ba863138524888363aa4d132f52af7d5ab31d7b1559c63bde6fffdf6cb0758`; address `0x0677484a4E0e86A7066D720cdB069eC446e7fD46`; receipt `status=7`, `result=6`, `status_name=FINALIZED`, `result_name=MAJORITY_AGREE`, leader `execution_result=SUCCESS`, callable schema confirmed.
- A sanity read returned `DIAGNOSTIC_OK`.
- Stable web-only tx: `0xdde79bb38db17eeba2007ce866b029bc151ceea7cea0314edcd5c25440e2aff0`; finalized consensus; equivalence payload `200:559`.
- MatchSpec-source web-only tx: `0x60c0bd68015d96fccc8b6413d681eed1888ebc373e0238b1ffebe4a27e7d722c`; finalized consensus and successful leader execution.
- LLM-only tx: `0xee0144d258f9904eb3e71c9a335a4b182b4a8aaae4fa136582c499167bdef07c`; finalized consensus and successful leader execution.
- Minimal consensus tx: `0xc4e7a02ea9d5ce1b20663098beae059d128f3035dc56b282e4831793b0d11363`; finalized consensus and successful leader execution.
- Diagnostic conclusion: the deployment, web access, structured LLM call, and minimal consensus primitive work independently. The remaining failure is MatchSpec-specific and requires comparison of its evidence pipeline against this valid primitive.

## Honest limitations

Configured sources are selected by the pair creator; source ownership is not cryptographically proven; documentation can change; model/revision naming can be ambiguous; results can become stale; web failures and validator disagreement are possible; Studionet is a development network.
