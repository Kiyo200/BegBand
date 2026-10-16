# TagsagAllapota

```mermaid
stateDiagram-v2
    [*] --> Fuggoben: Csatlakozási kérelem
    Fuggoben --> Aktiv: Leader jóváhagyja
    Fuggoben --> Elutasitva: Leader elutasítja
    Aktiv --> Eltavolitva: Leader eltávolítja / tag kilép
    Elutasitva --> [*]
    Eltavolitva --> [*]
```
