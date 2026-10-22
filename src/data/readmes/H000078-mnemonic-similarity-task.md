# Mnemonic Similarity Task — Web

Browser-native companion to canonical `T000078-mnemonic-similarity-task`, implemented for the shared `psyflow-web` runner.

The port preserves the full 128-trial incidental study phase, full 192-trial recognition test, official Set 1 photographs, deterministic target/lure/foil pairing, L1–L5 balanced lure selection, 2.0-s object display, 0.5-s blank ISI, Chinese instructions, V/N study judgments, V/B/N old/similar/new responses, and LDI/REC summary semantics.

The web task intentionally differs only in runtime shell behavior: serial hardware triggers become browser events, and the shared runner owns fullscreen, cursor, export, and force-quit behavior. There is no reduced-count preview difference.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web` with **Contents: Read and write** permission. TaskBeacon organization approval may also be required.
