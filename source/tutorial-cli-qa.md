# Validate tasks before release

Use CLI and QA checks before a task appears in the public catalog or receives an aligned web preview.

## What to check

- The task ID, slug, title, maturity, and tags are present in metadata.
- Trial counts and block counts match the canonical configuration.
- Runtime smoke tests can start without manual repair.
- README instructions explain what the task does before a reviewer opens the code.
- Browser previews stay aligned with the local PsyFlow implementation.

## Review rhythm

1. Run local checks in the PsyFlow task repository.
2. Inspect the README, config, metadata, and generated task-flow diagram together.
3. Only attach or update a web preview when the local task remains canonical.
4. Record release notes or known caveats near the task package.

## Source document

The longer upstream CLI guide is maintained in the PsyFlow repository:

https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/cli_usage.md
