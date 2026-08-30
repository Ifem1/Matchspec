# MATCHSPEC — Product Requirements Document

## 1. Objective

Build and deploy a working GenLayer dApp where users can:

1. register technical items;
2. create a compatibility pair;
3. configure public evidence URLs;
4. request a GenLayer consensus assessment;
5. read the canonical compatibility result;
6. inspect all structured limitations and history.

## 2. MVP success criteria

The MVP is complete only when:

- injected wallet connects;
- Studionet can be selected/switched;
- item registration works on-chain;
- pair registration works on-chain;
- configured sources are stored on-chain;
- assessment invokes real GenLayer nondeterministic web access;
- validators independently inspect configured sources;
- result follows exact bounded schema;
- agreed result becomes canonical state;
- technical failure does not corrupt previous state;
- history is append-only;
- source updates increment source version;
- old assessments preserve their original source version;
- frontend displays real contract data;
- at least one real Studionet lifecycle is documented.

## 3. Item entity

Required fields:

```text
id
creator
manufacturer
product_name
kind
model_number
revision
canonical_key
created_at
```

## 4. Item kinds

MVP enum:

```text
LAPTOP
PHONE
TABLET
DOCK
CHARGER
BATTERY
CAMERA
LENS
MOTHERBOARD
RAM
STORAGE
ENCLOSURE
ROUTER
NETWORK_MODULE
POWER_SUPPLY
ACCESSORY
INDUSTRIAL_COMPONENT
OTHER
```

The model must not invent kinds.

## 5. Pair entity

Required:

```text
id
creator
item_a
item_b
profile
source_urls
source_version
current_status
current_physical_fit
current_power
current_data
current_display
current_adapter_required
current_condition_code
current_limitation
assessment_count
created_at
```

## 6. Compatibility profile

A pair specifies which dimensions matter.

MVP dimensions:

```text
PHYSICAL_FIT
POWER
DATA
DISPLAY
PROTOCOL
ADAPTER
GENERAL
```

Store a bounded list or bitmask.

The assessment should not claim conclusions for dimensions that were not requested or supported by evidence.

## 7. Canonical status enum

### DIRECT_COMPATIBLE
Pair works as intended for the requested profile without an additional adapter or material limitation.

### ADAPTER_REQUIRED
Compatibility exists but requires a specifically identified adapter/converter/intermediary.

### PARTIAL_COMPATIBILITY
Some requested functions work and others do not or are materially limited.

### CONDITIONAL
Compatibility depends on a version, revision, firmware, port, configuration, operating condition, or other explicit requirement.

### INCOMPATIBLE
Configured evidence materially supports that the pair does not work for the requested profile.

### UNKNOWN
Accessible configured evidence is not sufficient for a safe classification.

## 8. Dimension result enums

### Physical fit
- `YES`
- `NO`
- `CONDITIONAL`
- `UNKNOWN`
- `NOT_ASSESSED`

### Power
- `FULL`
- `LIMITED`
- `NONE`
- `CONDITIONAL`
- `UNKNOWN`
- `NOT_ASSESSED`

### Data
- `FULL`
- `LIMITED`
- `NONE`
- `CONDITIONAL`
- `UNKNOWN`
- `NOT_ASSESSED`

### Display
- `FULL`
- `PARTIAL`
- `NONE`
- `CONDITIONAL`
- `UNKNOWN`
- `NOT_ASSESSED`

### Protocol
- `MATCH`
- `PARTIAL`
- `MISMATCH`
- `CONDITIONAL`
- `UNKNOWN`
- `NOT_ASSESSED`

## 9. Core stories

### Register item
As a user, I can register a specific technical item.

Acceptance:
- canonical key unique;
- bounded fields;
- deterministic item identity;
- item readable immediately after finality/readback.

### Create pair
As a user, I can select two existing items and create a compatibility pair.

Acceptance:
- item A != item B;
- profile non-empty;
- 1–4 configured HTTPS sources;
- source set bounded;
- duplicate pair key policy deterministic.

### Update pair sources
Creator only for MVP.

Acceptance:
- replace full source set;
- increment source version;
- history unchanged.

### Run assessment
Permissionless.

Acceptance:
- real contract web access;
- structured result;
- consensus on state-relevant fields;
- no state mutation before agreed result;
- canonical record updated once;
- assessment appended once.

### Read compatibility
Anyone can read the latest result without invoking nondeterminism.

### View history
Anyone can inspect prior assessments.

## 10. Pages

- `/` compatibility registry
- `/items`
- `/items/new`
- `/pairs/new`
- `/pair/[id]`
- `/about`

## 11. Non-functional requirements

### Truthful UI
No fake pair rows.

### Retry safety
Failed assessment leaves previous canonical state unchanged.

### Bounded storage
Hard caps on records, sources, strings, and history.

### Evidence transparency
Every assessment exposes source version and configured URLs.

### No fake source authority
Call them `configured technical sources`.

Do not claim that MatchSpec cryptographically proves a URL belongs to a manufacturer unless such proof is actually implemented.

### Accessibility
Keyboard navigation, visible focus, labelled fields, non-colour status encoding.

## 12. Non-goals

Do not add:
- wallet profiles;
- token rewards;
- escrow;
- payments;
- chat;
- review stars;
- marketplace inventory;
- recommendation feeds;
- server databases;
- vector search;
- DAO governance.
