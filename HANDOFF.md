# MATCHSPEC Handoff

This handoff records the final contract deployment and the real Studionet lifecycle attempted against it. Frontend deployment was intentionally outside this pass.

| Field | Value |
|---|---|
| Network | Studionet |
| Chain ID | 61999 |
| Contract | 0xB9AcfB6b579339969e347a40Ad5D8FC17d3D8224 |
| Explorer | https://explorer-studio.genlayer.com |
| Frontend URL | TBD |
| Deploy tx | 0xea0146afcc57a65503c3854efb7b33d3ce25863a1f398a60ad69a2b24be5e420 |
| Item A / Item B / pair tx | Finalized successfully; CLI output did not expose the hash value in the captured filtered output |
| Assessment tx | Submitted twice; neither committed. Final authoritative readback remains `assessment_count: 0`, `current_status: UNKNOWN`, history `[]` |
| Source update tx | Finalized successfully; source changed to `https://example.com`, `source_version: 2` |
| Reassessment | Submitted; no assessment committed. No canonical state was overwritten |
| Contract tests | 3 attempted; blocked by genlayer-test Windows stdin cleanup (`WinError 32`) before contract load |
| Frontend tests | Not run |
| Typecheck / lint / build | Not run |
| GenVM lint | Static lint phase passed (3 checks); SDK validation blocked by cached SDK access denied (`WinError 5`) |
| Python syntax | Passed: `python -m py_compile contracts/matchspec.py` |
| Deployed schema | Retrieved successfully from Studionet; all public methods present |
| Known blockers | Fresh corrected deployment is empty and requires lifecycle transactions; direct genlayer-test Windows temp-file cleanup failure; GenVM SDK cache access denied; frontend work intentionally excluded from this pass. |
