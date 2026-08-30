# MATCHSPEC — Frontend & UX Specification

## Product feel

MatchSpec should look like technical equipment software.

Reference:

> engineering compatibility desk + parts catalogue + inspection sheet

Do not lead with “AI”.

Lead with:
- pair identity;
- model numbers;
- assessed dimensions;
- conditions;
- sources;
- assessment record.

## Suggested stack

- Next.js
- TypeScript
- genlayer-js
- injected EIP-1193 wallet
- Tailwind/CSS modules/plain CSS

## Navigation

```text
MATCHSPEC
Pairs
Items
New Check
About

                         STUDIONET 61999 / wallet
```

## `/` Pair Registry

Main screen is a matrix/table.

```text
MATCHSPEC / COMPATIBILITY REGISTRY

[ search ] [status] [type]                  [ NEW CHECK ]

STATUS          ITEM A              ITEM B             PROFILE
DIRECT          XPS 15 9530         TB4 Dock X         PWR/DATA
CONDITIONAL     Camera A            Lens B             FIT/PROTO
INCOMPATIBLE    Board X             RAM Y              FIT/DATA
```

No giant metric cards.

## `/items`

Dense component catalogue.

## `/items/new`

Fields:
- manufacturer
- product name
- kind
- model number
- revision
- canonical key

## `/pairs/new`

Step 1: Item A + Item B.
Step 2: compatibility dimensions.
Step 3: configured source URLs.

Show selected pair in a fixed technical header while editing.

## `/pair/[id]`

### Technical header

```text
MATCHSPEC / PAIR 0048 / SOURCE V03
────────────────────────────────────────────────────────────

A / DELL XPS 15 9530
B / EXAMPLE TB4 DOCK X4
PROFILE / POWER · DATA · DISPLAY
```

### Compatibility plate

```text
┌───────────────────────────────────────────┐
│ ASSESSMENT 0007                           │
│ PARTIAL COMPATIBILITY                     │
│                                           │
│ PHYSICAL FIT        YES                   │
│ POWER               LIMITED               │
│ DATA                FULL                  │
│ DISPLAY             PARTIAL               │
│ PROTOCOL            MATCH                 │
│ ADAPTER             NONE                  │
│ CONDITION           HOST_POWER_LIMIT      │
└───────────────────────────────────────────┘
```

### Sources
Show actual configured URLs and source version.

### Assessment button
`RUN FRESH ASSESSMENT`

State progression:

```text
SUBMITTING
→ VALIDATING
→ CONSENSUS
→ FINALISED
→ READING CANONICAL STATE
→ UPDATED
```

Never show UPDATED before authoritative readback.

### History
Use a compact technical table by sequence/result/source version.

### Machine-readable record
`COPY RECORD JSON`

Generate from current contract state. Do not call it an API if there is no API.

## `/about`

Explain:
- pair assessment;
- configured sources;
- independent validator web reads;
- result can become stale until reassessed;
- source authority is not cryptographically proven.

## Loading

Use inline progress, skeleton rows, status steps.

Do not use “AI is thinking”, animated robots, or chat bubbles.

## Errors

Good:
- `Assessment did not converge. Canonical state was not changed.`
- `Configured source could not be evaluated. Retry is safe.`
- `Transaction finalised, but expected state was not observed on readback.`
