# Kamin Blocking and Causal Learning Task — Web

Browser-native companion to canonical `T000086-kamin-blocking-causal-learning-task`, implemented for the shared `psyflow-web` runner.

The port preserves the full additive forward-blocking protocol: 58 learning trials across four ordered phases, deterministic participant counterbalancing, exact within-phase condition counts, three-choice prediction, ordinary and strong outcome feedback, the 0–8 A–H causal test, and the blocking score `mean(C,D) − B`.

The stage order, valid keys, response windows, feedback meanings, trial-level fields, and summary semantics match the Python source. The web task differs only in runtime shell behavior: serial hardware triggers become browser events, and the shared runner owns registration, export, fullscreen, cursor, and force-quit behavior. No trial counts or timings are shortened.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web` with **Contents: Read and write** permission. TaskBeacon organization approval may also be required.
