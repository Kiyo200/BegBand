# Activity diagramok — Csapat áttekintése (BandMember)

Az alábbi diagramok a [`UseCase.md`](UseCase.md) "Csapat áttekintése (BandMember)" csomagjának minden use case-éhez tartozó tevékenységfolyamatot mutatják be. Ezek többnyire egyszerű, olvasás jellegű (megtekintés) folyamatok; a Szavazásban részvétel és a Banda-chat használata írási műveletet is tartalmaz.

## Banda megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Banda adatlap megnyitása]
    Megnyitas --> Lekerdezes[Banda adatainak lekérdezése]
    Lekerdezes --> Megjelenites[Adatok megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Tagok megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Tagok listájának megnyitása]
    Megnyitas --> Lekerdezes[Tagok lekérdezése - Membership alapján]
    Lekerdezes --> Megjelenites[Lista megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Próba megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Próba adatlap megnyitása]
    Megnyitas --> Lekerdezes[Próba adatainak lekérdezése]
    Lekerdezes --> Megjelenites[Adatok megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Próba naptár megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Próba naptár megnyitása]
    Megnyitas --> Lekerdezes[Próbák lekérdezése a bandához]
    Lekerdezes --> Megjelenites[Naptár megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Koncert megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Koncert adatlap megnyitása]
    Megnyitas --> Lekerdezes[Koncert adatainak lekérdezése]
    Lekerdezes --> Megjelenites[Adatok megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Szavazásban részvétel

```mermaid
flowchart TD
    Start([Start]) --> Listazas[Banda aktív szavazásainak listázása]
    Listazas --> Kivalasztas[Szavazás kiválasztása]
    Kivalasztas --> MarSzavazott{Már szavazott ebben a szavazásban?}
    MarSzavazott -- igen --> Eredmeny[Eddigi eredmény megjelenítése]
    Eredmeny --> Vege([Vége])
    MarSzavazott -- nem --> OpcioValasztas[Opció kiválasztása]
    OpcioValasztas --> SzavazatMentes[POLL_VOTE létrehozása]
    SzavazatMentes --> Vege
```

## Banda-chat használata

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Banda adatlap - Chat fül megnyitása]
    Megnyitas --> AktivTag{Aktív tagja a bandának?}
    AktivTag -- nem --> Elutasitas[Hozzáférés megtagadva]
    Elutasitas --> Vege([Vége])
    AktivTag -- igen --> Elozmenyek[Banda-chat előzményeinek betöltése]
    Elozmenyek --> Iras[Üzenet írása és küldése]
    Iras --> Mentes[MESSAGE mentése]
    Mentes --> Kezbesites[Kézbesítés a banda összes online tagjának]
    Kezbesites --> Vege
```
