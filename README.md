# MATCHSPEC

MatchSpec is a frontend plus GenLayer Intelligent Contract compatibility registry. It stores exact technical items and pairs, configured HTTPS sources, bounded profiles, consensus-backed structured assessments, and append-only history.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

Contract tooling requires the current GenLayer CLI and `genlayer-test` installation. Studionet uses RPC `https://studio.genlayer.com/api`, chain ID `61999`, and Explorer `https://explorer-studio.genlayer.com`.

Set `NEXT_PUBLIC_MATCHSPEC_CONTRACT` to the deployed address for live reads/writes. The browser path uses an injected EIP-1193 wallet; no private key is required in frontend configuration.

## Honest status

The contract source implements the registry, source versioning, bounded structured consensus path, retry-safe mutation ordering, and history. Deployment requires a funded injected wallet/GenLayer CLI account and must be recorded in `HANDOFF.md` only after real Studionet transactions complete.
