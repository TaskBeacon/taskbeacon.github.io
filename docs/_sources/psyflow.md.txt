```mermaid
flowchart LR
    A[YAML<br>Subinfo:<br>- field<br>- mapping] --> B[SubInfo<br>Subinfo Collection]
    C[YAML<br>Task:<br>- trial n<br>- block n<br>- key<br>- condition] --> D[BlockUnit]
    D --> E[run_trial (GO)]
    D --> F[run_trial (Stop)]
    G[YAML<br>Timing:<br>- duration<br>- Controller:<br>- ssd<br>- min/max] --> E
    G --> F
    H[YAML<br>Stimuli:<br>- type<br>- color<br>- text<br>- pos] --> I[StimBank]
    E --> I
    F --> I
