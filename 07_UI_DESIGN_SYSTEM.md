# MATCHSPEC — UI Design System

## Core aesthetic

**Industrial documentation, not AI SaaS.**

The UI should resemble:
- equipment datasheets;
- engineering drawing title blocks;
- technical inspection reports;
- parts catalogues;
- compatibility matrices.

## Never use

- purple-to-blue AI gradients;
- aurora backgrounds;
- glassmorphism;
- glowing orbs;
- brain/robot/sparkle illustrations;
- fake chat windows;
- giant rounded card grids;
- 24px radii everywhere;
- neon cyberpunk;
- floating 3D products;
- oversized “AI-powered compatibility” hero copy;
- endless pill badges;
- random icons beside every field;
- gradient buttons.

## Palette

```text
Drawing Paper     #F3F1E8
Ink               #151716
Secondary Ink     #60645F
Rule              #BBBDB5
Steel             #D9DDD8
Technical Blue    #285A73
Caution           #A96A24
Reject            #8E382E
Pass              #355E49
```

Use colour sparingly.

## Typography

Use one neutral sans and one mono family.

Mono for IDs, model numbers, revisions, chain/network, source versions, hashes and condition codes.

## Geometry

- radius: 0–4px preferred;
- strong 1px rules;
- almost no shadow;
- dense grid alignment;
- rectangular buttons.

## Signature element 1: Engineering title block

```text
┌────────────────────────────────────────────────────────────┐
│ MATCHSPEC              PAIR 0048              REV / 03    │
├────────────────────────────────────────────────────────────┤
│ ITEM A / XPS 15 9530                                      │
│ ITEM B / TB4 DOCK X4                                      │
│ PROFILE / POWER · DATA · DISPLAY                          │
└────────────────────────────────────────────────────────────┘
```

## Signature element 2: Compatibility plate

```text
COMPATIBILITY / PARTIAL
ASSESSMENT / 0007
SOURCE / V03

POWER      LIMITED
DATA       FULL
DISPLAY    PARTIAL
ADAPTER    NONE
```

## Signature element 3: Pair axis

```text
ITEM A  ──────────────  COMPATIBILITY  ──────────────  ITEM B
```

with key specs beneath each side.

## Buttons

Primary:
- `RUN ASSESSMENT`
- `CREATE PAIR`
- `REGISTER ITEM`

Secondary:
- `EDIT SOURCES`
- `COPY RECORD`
- `VIEW EXPLORER`

## Tables

Tables are a primary UI primitive: sticky header, tight rows, clear separators, mono identifiers.

## Mobile

Use technical record blocks separated by rules rather than oversized cards.

## Motion

Only state communication: 120–180ms hover, progress transitions, expand/collapse. No ambient animation.

## Accessibility

- visible focus;
- keyboard navigation;
- labels above inputs;
- 44px primary touch targets;
- AA contrast;
- status not colour-only;
- respect reduced motion.

## Anti-AI screenshot test

Capture registry desktop, pair detail desktop, pair creation, item registry, registry mobile, pair detail mobile.

Ask:

> If the word “GenLayer” and the MatchSpec logo disappeared, would this still clearly look like technical compatibility software?

If not, redesign.
