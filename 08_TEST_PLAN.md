# MATCHSPEC — Test Plan

## Principle

Test the contract compatibility lifecycle and failure invariants, not only the UI.

## Item tests

- valid registration;
- invalid kind;
- empty manufacturer;
- oversized fields;
- duplicate canonical key;
- sequential IDs;
- item view;
- item pagination.

## Pair tests

- valid pair;
- missing item;
- same item both sides rejected;
- duplicate pair key;
- empty profile;
- invalid profile dimension;
- zero sources;
- too many sources;
- HTTP rejected;
- malformed URL rejected;
- obvious localhost/private URL rejected;
- oversized URL.

## Source-version tests

- initial version 1;
- creator update succeeds;
- non-creator fails;
- version increments exactly once;
- previous history unchanged;
- later assessment stores new version.

## Classification fixtures

- DIRECT_COMPATIBLE
- ADAPTER_REQUIRED
- PARTIAL_COMPATIBILITY
- CONDITIONAL
- INCOMPATIBLE
- UNKNOWN
- conflicting evidence

## Profile tests

If display is not requested, store `NOT_ASSESSED`, not an invented display result.

## Identity tests

If sources refer to a neighbouring model number, do not produce a confident verdict.

## Prompt injection

Evidence contains instructions to return DIRECT_COMPATIBLE. Expected: no policy override.

## Equivalence tests

Same structured result + different limitation prose may converge if limitation is non-critical.

Disagreement on status, power, adapter, or protocol must not produce unsafe canonical mutation.

## Retry tests

Simulate timeout, 500, empty page, model failure, malformed result.

Verify:
- count unchanged;
- history unchanged;
- current result unchanged;
- retry possible.

## Frontend tests

Wallet states, wrong chain, switch chain, rejected connection, forms, registry filters, detail view, history, JSON copy, transaction progress, readback mismatch.

## Real Studionet lifecycle

1. deploy final contract;
2. register item A;
3. register item B;
4. create pair;
5. read pair;
6. run real assessment;
7. confirm final consensus;
8. confirm canonical state;
9. confirm history;
10. update sources;
11. confirm source version increment;
12. run second assessment;
13. verify old history remains bound to old source version.

## Release gate

Do not call complete until:
- GenVM lint clean;
- schema extraction clean;
- direct tests pass;
- integration/smoke test passes;
- frontend tests pass;
- typecheck passes;
- lint passes;
- production build passes;
- live transactions documented.
