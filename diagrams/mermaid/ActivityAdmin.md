# Activity diagramok — Adminisztráció (Admin)

Az alábbi diagramok a [`UseCase.md`](UseCase.md) "Adminisztráció (Admin)" csomagjának use case-eihez tartozó tevékenységfolyamatot mutatják be. A "Mindent tud amit a többi rang rendelkezik" use case nem önálló tevékenység, hanem azt jelenti, hogy az Admin a [Common](ActivityCommon.md), [Leader](ActivityLeader.md) és [Member](ActivityMember.md) csomagok összes tevékenységéhez is hozzáfér — ezekhez külön activity diagram nem szükséges, a hivatkozott diagramok érvényesek rá is.

## Userek kezelése

```mermaid
flowchart TD
    Start([Start]) --> Listazas[Userek listájának megnyitása]
    Listazas --> Kivalasztas[User kiválasztása]
    Kivalasztas --> Modositas[Adatok módosítása - pl. szerepkör]
    Modositas --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Mentés]
    Mentes --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Modositas
```

## Userek törlése

```mermaid
flowchart TD
    Start([Start]) --> Kivalasztas[User kiválasztása]
    Kivalasztas --> Megerosites{Törlés megerősítése?}
    Megerosites -- igen --> Torles[User törlése az adatbázisból]
    Torles --> Vege([Vége])
    Megerosites -- nem --> Megszakitas[Művelet megszakítása]
    Megszakitas --> Vege
```
