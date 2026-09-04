# Deployment evidence

## Current attempted release

- Network: Studionet (chain ID 61999)
- RPC: `https://studio.genlayer.com/api`
- Contract: `0x86E101c6df2ca1D9016BEc4a7D60eBE6bbAdd2EC`
- Deployment transaction: `0x2d5de886d8c3fd77f699e13f5ac9828e86731b8c6a8c626e0746ce8935e0c9e2`
- Deployment result: `FINALIZED`, `MAJORITY_AGREE`, successful return
- Source commit: `43969657d4bfcc768964d0c3c160f3234758888a`
- Contract SHA-256: `22ebaa6d96f201960703e9c197adfb0f823373a2`

## Canonical lifecycle evidence

- Registration transaction: `0x51b65ff1262a9c67e46d8949a7ac4675d4b683487723674df123eec26cbfdc34`
- The CLI receipt reported `FINALIZED` / `MAJORITY_AGREE`, but its leader execution reported `ERROR` and canonical `get_item_count` remained `0`.
- Canonical RPC readback: `get_item_count = 0`.
- `get_items` independently failed with GenVM `TypeError: '<' not supported between instances of 'int' and 'str'` for the supplied CLI arguments.
- No pair or assessment was submitted after this failed canonical reconciliation.

The prior accepted-but-zero-state registration is therefore recorded as a failed lifecycle write, not as proof of registration. The RPC does not expose `gen_dbg_traceTransaction`; diagnosis relies on the complete receipt fields and canonical state readbacks.

## Status

The deployment itself is proven, but the fresh lifecycle is **NOT PROVEN** because item registration did not appear in canonical state. No assessment evidence is claimed for this deployment.
