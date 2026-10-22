# Beads Task / Jumping-to-Conclusions — Web

Browser-native companion to canonical
`T000081-beads-task-jumping-to-conclusions`, implemented for the shared
`psyflow-web` runner.

The port preserves the four sequential conditions (`easy_left`, `easy_right`,
`hard_left`, `hard_right`), reciprocal 85:15 and 60:40 candidate jars, exact
fixed 20-bead evidence sequences, self-paced SPACE sampling, F/J source
decision, 20-draw maximum, 50%-100% confidence rating, neutral ITI, and the
canonical DTD, extreme-JTC, accuracy, RT, confidence, color-count, and
equal-prior posterior fields.

The web task differs only in runtime shell behavior: serial hardware triggers
become browser events, and the shared runner owns registration, export,
fullscreen, cursor, and force-quit behavior. There is no reduced-count preview
difference.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to
`TaskBeacon/psyflow-web` with **Contents: Read and write** permission.
TaskBeacon organization approval may also be required.
