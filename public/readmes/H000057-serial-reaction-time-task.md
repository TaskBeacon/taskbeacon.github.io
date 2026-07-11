# H000057 Serial Reaction Time Task

Browser companion for canonical `T000057-serial-reaction-time-task`.

## Contract

- Runtime: `psyflow-web`
- Variant: `html`
- TAPS contract: `v0.2.0`
- Canonical source: `T000057-serial-reaction-time-task`

## Preserved Flow

The web task preserves the counterbalanced SOC1/SOC2 sequences, D/F/J/K spatial mapping, 5-second response bound, immediate target removal, 250 ms RSI, error-tone branch, block roles, correctness, timeout, transfer-cost, and recovery semantics.

## Intentional Preview Difference

The config retains canonical metadata for 15 blocks, 96 trials per block, and eight sequence repetitions. An explicit `preview_enabled` override makes the shared browser runner execute one 12-trial block for each role: training, transfer, and recovery. Trial-level timing and analysis meaning are unchanged.

## Development

Run shared checks from `../psyflow-web`:

```bash
npm run typecheck
npm test
npm run build:site
```

Shared runner URL:

```text
http://127.0.0.1:4173/?task=H000057-serial-reaction-time-task
```

The notification workflow requires `TASKBEACON_ORG_DISPATCH_TOKEN`. For a fine-grained PAT, grant access to `TaskBeacon/psyflow-web` with `Contents: Read and write`; organization approval may also be required.
