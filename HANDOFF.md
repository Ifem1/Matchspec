# MATCHSPEC Handoff

This handoff records the final contract deployment and the real Studionet lifecycle attempted against it. Frontend deployment was intentionally outside this pass.

| Field | Value |
|---|---|
| Network | Studionet |
| Chain ID | 61999 |
| Contract | 0xde6dc3C5DeFD83243E29d10D7B92B74DFa81F55F |
| Explorer | https://explorer-studio.genlayer.com/address/0xde6dc3C5DeFD83243E29d10D7B92B74DFa81F55F |
| Frontend URL | TBD |
| Deploy tx | `0x11c444f1cfa4278b05ded9f1dcb21c587cb28b894dc33c80aa81c3713d7d01e6` |
| Item A / Item B / pair tx | Item A `0x505cf4c3dc374cb123fb51aadbd9d67f040ed9f9fec8bd21b7bb7a585ae505ba`; Item B and pair finalized; exact hashes are visible in the contract transaction list |
| Assessment tx | `0x222beaec1153c34d5579728c5655af4ce8e0d7a551e274b52a00ab0905c2145e`; committed successfully. Authoritative readback: `assessment_count: 1` before source update, then `2` after reassessment |
| Source update tx | Finalized successfully; source changed to `https://www.dell.com/support/kbdoc/en-us/000131676`, `source_version: 2` |
| Reassessment | Finalized successfully. History preserves sequence 1 at source version 1 and sequence 2 at source version 2 |
| Contract tests | 3 attempted; blocked by genlayer-test Windows stdin cleanup (`WinError 32`) before contract load |
| Frontend tests | 2 passed |
| Typecheck / lint / build | Typecheck passed; lint 0 errors / 1 warning; production build passed |
| GenVM lint | Static lint phase passed (3 checks); SDK validation blocked by cached SDK access denied (`WinError 5`) |
| Python syntax | Passed: `python -m py_compile contracts/matchspec.py` |
| Deployed schema | Retrieved successfully from Studionet; all public methods present |
| Known blockers | Direct genlayer-test Windows temp-file cleanup failure (`WinError 32`) remains an environment/tooling issue. GenVM SDK cache validation still needs a Windows-permission repair. Frontend deployment remains outside this contract lifecycle pass. |
