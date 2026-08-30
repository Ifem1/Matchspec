# MATCHSPEC — Intelligent Contract Specification

## Contract

Suggested name: `MatchSpecRegistry`

Suggested source: `contracts/matchspec.py`

## Principle

Use nondeterminism only for interpreting external compatibility evidence.

Keep deterministic:
- ownership;
- IDs;
- canonical keys;
- enums;
- profile validation;
- source versioning;
- bounds;
- history ordering;
- pagination;
- permissions;
- state mutation.

## Suggested storage

### Item

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

### Pair

```text
id
creator
item_a
item_b
pair_key
profile
source_urls
source_version
current_status
current_physical_fit
current_power
current_data
current_display
current_protocol
current_adapter_required
current_adapter
current_condition_code
current_limitation
assessment_count
created_at
```

### Assessment

```text
pair_id
sequence
requested_by
requested_at
source_version
status
physical_fit
power
data
display
protocol
adapter_required
adapter
condition_code
evidence_state
limitation
```

## Bounds

Suggested MVP caps:

```text
items per deployment:          1024
pairs per deployment:          1024
assessments per pair:          32
sources per pair:              4
manufacturer:                  100 chars
product name:                  160 chars
model number:                  100 chars
revision:                      80 chars
canonical key:                 220 chars
URL:                           500 chars
adapter:                       180 chars
limitation:                    400 chars
```

## Public methods

### `register_item(...)`
Validates kind, bounds and unique canonical key, then allocates ID.

### `create_pair(...)`
Validates both items, distinct IDs, profile, unique pair key, and 1–4 HTTPS sources. Set source version to 1 and initial status to UNKNOWN.

### `update_sources(pair_id, source_urls)`
Creator only. Full replacement set. Validate and increment source version. Preserve history.

### `assess_compatibility(pair_id)`
Permissionless.

Critical invariant: do not mutate compatibility business state before consensus has returned an agreed result.

Nondeterministic work:
1. fetch each configured source;
2. identify evidence relevant to item A and item B;
3. extract compatibility conditions;
4. classify only requested profile dimensions;
5. return exact bounded schema.

Post-consensus:
- append assessment;
- update canonical pair state;
- increment count.

### Views

```text
get_item(id)
get_item_count()
get_items(offset, limit)
get_pair(id)
get_pair_count()
get_pairs(offset, limit)
get_assessment(pair_id, sequence)
get_assessments(pair_id, offset, limit)
```

## Canonical output

```json
{
  "status": "PARTIAL_COMPATIBILITY",
  "physical_fit": "YES",
  "power": "LIMITED",
  "data": "FULL",
  "display": "PARTIAL",
  "protocol": "MATCH",
  "adapter_required": false,
  "adapter": "",
  "condition_code": "HOST_POWER_LIMIT",
  "evidence_state": "SUFFICIENT",
  "limitation": "Charging is limited by the host device."
}
```

## Condition-code enum

- `NONE`
- `ADAPTER_REQUIRED`
- `HOST_POWER_LIMIT`
- `DEVICE_POWER_LIMIT`
- `PORT_SPECIFIC`
- `FIRMWARE_REQUIRED`
- `REVISION_SPECIFIC`
- `PROTOCOL_LIMITATION`
- `DISPLAY_LIMITATION`
- `DATA_RATE_LIMITATION`
- `PHYSICAL_MISMATCH`
- `REGIONAL_VARIANT`
- `CONFLICTING_EVIDENCE`
- `INSUFFICIENT_EVIDENCE`
- `OTHER_CONDITION`

## Equivalence-critical fields

- status
- physical_fit
- power
- data
- display
- protocol
- adapter_required
- adapter
- condition_code
- evidence_state

`limitation` can be diagnostic if wording differs.

## Failure policy

### Technical fetch failure
Retryable, no mutation.

### Model/parse failure
Retryable, no mutation.

### Material validator disagreement
No unsafe canonical mutation.

### Evidence genuinely insufficient
Valid result: `UNKNOWN`, `evidence_state = INSUFFICIENT`.

### Evidence genuinely conflicts
Valid result: `UNKNOWN`, `evidence_state = AMBIGUOUS`, `condition_code = CONFLICTING_EVIDENCE`.

## Source versioning

Each assessment stores `source_version`.

Never make old history appear to use a newer source set.
