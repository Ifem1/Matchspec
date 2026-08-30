# MATCHSPEC — Product Brief

## One-line description

**MatchSpec is a consensus-backed compatibility registry that determines whether two physical products or technical components actually work together, and records the limitations.**

## Problem

Compatibility information is often fragmented and conditional.

A product page may say:

> Thunderbolt 4 compatible.

Another manual may say:

> Charging limited to 65W on this host family.

Another document may say:

> Dual-display output requires DisplayPort 1.4 with DSC.

A simple connector match is therefore not enough.

Common failures include:
- physically fits but lacks protocol support;
- supports data but not charging;
- charges but below advertised wattage;
- works only with an adapter;
- works only above/below a firmware revision;
- supports one feature but not another;
- compatibility applies only to a particular regional/model revision.

Humans misread these conditions and automated procurement agents can make the same mistake.

## Product thesis

Compatibility can become shared on-chain state when:
1. the exact pair is explicit;
2. the evidence universe is explicit;
3. validators independently inspect the same public technical sources;
4. consensus reduces those sources into bounded compatibility fields.

## Users

### Humans
- buyers
- developers
- IT teams
- repair technicians
- integrators
- electronics hobbyists
- procurement teams
- equipment operators

### Agents
- purchasing agents
- procurement agents
- device-selection agents
- repair agents
- inventory agents
- deployment/configuration agents

## MVP example

Item A:

```text
Dell XPS 15 9530
kind: LAPTOP
model: 9530
```

Item B:

```text
Example Thunderbolt Dock X4
kind: DOCK
model: X4
```

Question profile:

```text
POWER
DATA
DISPLAY
PHYSICAL_FIT
ADAPTER
```

Configured sources:
- manufacturer product page
- manufacturer technical specification
- support/manual page

Consensus result:

```json
{
  "status": "PARTIAL_COMPATIBILITY",
  "physical_fit": "YES",
  "power": "LIMITED",
  "data": "FULL",
  "display": "PARTIAL",
  "adapter_required": false,
  "condition_code": "HOST_POWER_LIMIT",
  "limitation": "Host charging is limited below the dock's maximum advertised output."
}
```

## Why GenLayer

A deterministic contract can compare exact numeric fields if those fields are already structured.

But real compatibility evidence is frequently expressed through:
- natural-language manuals;
- specification tables;
- support notices;
- conditional wording;
- version notes;
- product pages.

GenLayer makes the interpretation a validator-consensus operation rather than trusting one compatibility database or off-chain model.

## What MatchSpec is not

MatchSpec is not:
- product reviews;
- shopping recommendations;
- a marketplace;
- escrow;
- insurance;
- a warranty checker;
- dispute resolution;
- generic fact verification;
- semantic capability permissioning;
- a product recall system;
- a schema monitor;
- an uptime monitor;
- a chatbot.

Its primitive is:

> **Canonical compatibility classification for a defined pair and defined compatibility profile.**

## Long-term extensions

Only after MVP:
- agent-readable compatibility policy calls;
- component-chain compatibility;
- build manifests;
- firmware/revision awareness;
- compatibility attestations consumed by commerce agents;
- vendor-maintained source profiles;
- compatibility request markets;
- bill-of-materials checking.

Do not add these before the core pair assessment works end-to-end on GenLayer.
