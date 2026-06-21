---
name: Workflow command — serve only
description: The Start application workflow must only run the core dev server, not rebuild trader/reports each time
---

## Rule
Workflow command: `npm run serve core`

**Why:** `npm run build --workspace=@deriv/reports && npm run build --workspace=@deriv/trader` takes >60s, causing the workflow restart to time out before port 5000 opens. The trader/reports dist files persist in `packages/trader/dist/` and `packages/reports/dist/` between restarts.

**How to apply:** Only rebuild trader/reports if their dist/ directories are missing or the source changed significantly. For routine dev iteration, just `npm run serve core`.
