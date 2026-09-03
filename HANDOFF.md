# MATCHSPEC Handoff

## Current release audit

| Field | Value |
|---|---|
| Repository | https://github.com/Ifem1/Matchspec |
| Commit | `d4eaca6558415f2ae61c96d9042ae490870af27c` |
| Network | Studionet |
| Chain ID | 61999 |
| Contract | `0x13656299d30cec1d4936dBf24366d2D7B1660342` |
| Explorer | https://explorer-studio.genlayer.com/address/0x13656299d30cec1d4936dBf24366d2D7B1660342 |
| Contract SHA-256 | `0e7f3fcec0ddb7c3a116e0c20a289473f038a67b9f3ea1459b28488469e720d3` |
| Frontend URL | https://matchspec.vercel.app/ (requires final address update) |

## Deployment and lifecycle evidence

| Operation | Transaction / result |
|---|---|
| Deploy | `0x8ee94087c7cb62bda1b0c57c259b97ed0d72fe470c13bc4c3254fdd0fce8de07` |
| Item A | `0x0f5eb5d90e98b6307e9a4435c12124e1720213bc4344a5a379ce360240fcbd3a` |
| Item B | `0x076cf7c2c7641ebd4d215a5ef8d9e3621e829b6382f4039237d3641b325c9287` |
| Pair | `0x1b1b35e18e2a45eeb8e5dccf568f0ec18f74eb50b0187a76f1a2777c63159563` |
| Assessment | `0x08b01591a93cfedd5cc3f8943f6d227198170f45850616cb503c5d4aa34f5de4` — `FINALIZED`, `MAJORITY_AGREE`, leader `SUCCESS`; canonical `assessment_count=1` |

Fresh final lifecycle pair is `1:2`; pair readback confirmed `source_version=1`. Assessment #1 readback confirmed `status=UNKNOWN`, `evidence_state=INSUFFICIENT`, with no compatibility evidence in the configured Dell source. This is a safe canonical result, not an approval.

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

The evidence-backed validator redesign was proven on disposable diagnostic deployment `0x4C58e3bE4e0625962ac73e15A4f5dc920CD891E3`, probe tx `0x16fd64412d75a1f72ad458059b700e3b721352ad42dcd2f7360a838b0c727593`, which finalized with majority agreement and substantive `valid` judgments. The production assessment likewise finalized with majority agreement and returned safely as UNKNOWN/INSUFFICIENT; the source did not support the exact pair. The CLI does not expose a separate top-level `txExecutionResultName`; leader execution was SUCCESS and the returned payload was `1`.

Configured sources are selected by the pair creator; source ownership is not cryptographically proven; documentation can change; model/revision naming can be ambiguous; results can become stale; web failures and validator disagreement are possible; Studionet is a development network.
