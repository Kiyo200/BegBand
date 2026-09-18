# Activity diagramok — Banda- és próbakezelés (Leader)

Az alábbi diagramok a [`UseCase.md`](UseCase.md) "Banda- és próbakezelés (Leader)" csomagjának minden use case-éhez tartozó tevékenységfolyamatot mutatják be.

## Banda kezelése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Banda adatlap megnyitása]
    Megnyitas --> Modositas[Adatok módosítása - név, leírás]
    Modositas --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Mentés]
    Mentes --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Modositas
```

## Tagok kezelése

```mermaid
flowchart TD
    Start([Start]) --> Listazas[Tagsági kérelmek/tagok listázása]
    Listazas --> Kivalasztas[Tag vagy kérelem kiválasztása]
    Kivalasztas --> Muvelet{Jóváhagyás, elutasítás vagy eltávolítás?}
    Muvelet -- jóváhagyás --> Aktivalas[Tagság aktiválása]
    Aktivalas --> Vege([Vége])
    Muvelet -- elutasítás --> Elutasitas[Tagság elutasítása]
    Elutasitas --> Vege
    Muvelet -- eltávolítás --> Eltavolitas[Tag eltávolítása a bandából]
    Eltavolitas --> Vege
```

## Eseménynaptár kezelése

```mermaid
flowchart TD
    Start([Start]) --> Kivalasztas[Esemény kiválasztása vagy létrehozása]
    Kivalasztas --> Adatok[Adatok megadása - időpont, típus]
    Adatok --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Mentés - CalendarEvent frissítése]
    Mentes --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Adatok
```

## Próba létrehozása

```mermaid
flowchart TD
    Start([Start]) --> Adatok[Próba adatainak megadása - időpont, helyszín]
    Adatok --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Próba mentése]
    Mentes --> CalendarEvent[CalendarEvent létrehozása]
    CalendarEvent --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Adatok
```

## Próba kezelése

```mermaid
flowchart TD
    Start([Start]) --> Kivalasztas[Próba kiválasztása]
    Kivalasztas --> Muvelet{Módosítás vagy törlés?}
    Muvelet -- módosítás --> Modositas[Próba adatainak frissítése]
    Modositas --> Vege([Vége])
    Muvelet -- törlés --> Torles[Próba törlése]
    Torles --> Vege
```

## Koncert létrehozása

```mermaid
flowchart TD
    Start([Start]) --> Adatok[Koncert adatainak megadása - időpont, helyszín]
    Adatok --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Koncert mentése]
    Mentes --> CalendarEvent[CalendarEvent létrehozása]
    CalendarEvent --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Adatok
```
