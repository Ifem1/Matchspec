# MATCHSPEC — Architecture

## System

```text
┌─────────────────────────────────────────────┐
│                  FRONTEND                   │
│                                             │
│ Next.js / TypeScript                       │
│ injected EIP-1193 wallet                   │
│ genlayer-js                                │
│                                             │
│ registry UI                                │
│ item registration                         │
│ pair creation                              │
│ compatibility matrix                      │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│        GENLAYER INTELLIGENT CONTRACT        │
│                                             │
│ deterministic:                             │
│ - items                                    │
│ - pairs                                    │
│ - profiles                                 │
│ - source versions                          │
│ - canonical compatibility                  │
│ - history                                  │
│                                             │
│ nondeterministic:                          │
│ - fetch configured technical sources       │
│ - interpret specifications                 │
│ - return structured compatibility result   │
└────────────────────┬────────────────────────┘
                     │
            independent validator fetches
                     │
        ┌────────────┼─────────────┐
        ▼            ▼             ▼
 product page    technical page   support/manual
```

## No-backend boundary

The production product must not depend on:
- REST API for compatibility;
- serverless evidence parser;
- database;
- background scraper;
- central AI service.

If optional hosting infrastructure is used purely to serve the frontend, it must not become the adjudication authority.

## Frontend responsibilities

Frontend may:
- connect wallet;
- switch network;
- read items/pairs;
- submit writes;
- validate forms;
- wait for final transaction state;
- perform authoritative readback;
- format contract state into UI;
- copy machine-readable JSON.

Frontend must not:
- decide compatibility;
- scrape sources and substitute its conclusion;
- silently create fake assessment data.

## Contract responsibilities

Contract owns:
- identifiers;
- item registry;
- pair registry;
- source set;
- source version;
- compatibility profile;
- nondeterministic evidence interpretation;
- equivalence/consensus;
- canonical result;
- history;
- permissions;
- failure invariants.

## Assessment flow

```text
RUN ASSESSMENT
       ↓
contract write
       ↓
each validator independently:
  fetches configured sources
  interprets technical conditions
  reduces evidence to bounded fields
       ↓
equivalence
       ↓
agreed result
       ↓
append assessment
update canonical pair
       ↓
finality
       ↓
frontend authoritative readback
```

## Network

Studionet:
- RPC: `https://studio.genlayer.com/api`
- chain ID: `61999`
- currency: `GEN`
- explorer: `https://explorer-studio.genlayer.com`

## Suggested repository shape

```text
matchspec/
├─ contracts/
│  └─ matchspec.py
├─ frontend/
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  ├─ styles/
│  └─ tests/
├─ tests/
│  ├─ direct/
│  └─ integration/
├─ scripts/
├─ docs/
├─ .env.example
├─ README.md
└─ HANDOFF.md
```

## Authority rule

Finality is not enough.

After each finalised write:
1. read affected record;
2. verify expected state;
3. then show success.

If readback does not match, show a reconciliation error.

## Web variability

Leader and validators can see slightly different renderings.

Therefore:
- do not compare raw HTML;
- do not include irrelevant dynamic data;
- extract stable semantic fields;
- let the equivalence rule compare only state-relevant output.
