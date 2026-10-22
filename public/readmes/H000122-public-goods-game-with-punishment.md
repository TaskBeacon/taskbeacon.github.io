# H000122 — Public Goods Game with Punishment

Browser companion for canonical `T000122-public-goods-game-with-punishment`, implemented against the shared `psyflow-web` runtime.

## Task Flow

![Task Flow](task_flow.png)

Participants complete 16 four-person public-goods rounds in eight blocks crossing communication, peer-summary visibility, and variable versus all-or-nothing contribution. Each member starts a round with 20 coins; pooled contributions are multiplied by 1.6 and divided equally. The participant may then spend one coin per punishment unit to remove three coins from one peer.

## Alignment

- Same slug, title, Chinese instructions, eight condition labels, and two rounds per condition as T000122.
- Same participant-derived seed (`122122 + numeric subject_id`), Python-compatible shuffle, deterministic peer profiles, response keys, stage order, and timing.
- Same half-even rounding, punishment affordability cap, payoff, cumulative balance, and group-welfare calculations.
- Raw export records every browser stage; reduced export contains one logical public-goods round per row.
- The shared browser shell provides fullscreen policy and JSONL/CSV/JSON downloads; serial hardware triggers are represented as browser events.

See `references/alignment_audit.md` for the field-by-field comparison and `references/transfer_notes.md` for the source-to-web boundary.

## Local verification

Run from the sibling `psyflow-web` package:

```powershell
npm run typecheck
npm run test
npm run build:site
```

Open the shared runner with `?task=H000122-public-goods-game-with-punishment`.

## Shared-runner refresh secret

The workflow `.github/workflows/notify-psyflow-web.yml` uses `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must have access to `TaskBeacon/psyflow-web` with **Contents: Read and write**; organization approval may also be required.
