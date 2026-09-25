# Activity diagramok — Alap funkciók és Tartalom-feed (minden felhasználó)

Az alábbi diagramok a [`UseCase.md`](UseCase.md) "Alap funkciók" és "Tartalom-feed" csomagjának minden use case-éhez tartozó tevékenységfolyamatot mutatják be, a meglévő [`Activity.md`](Activity.md) stílusával összhangban.

## Zene keresése

```mermaid
flowchart TD
    Start([Start]) --> Kifejezes[Keresési kifejezés megadása]
    Kifejezes --> Lekerdezes[Zenék lekérdezése]
    Lekerdezes --> VanTalalat{Van találat?}
    VanTalalat -- igen --> Listazas[Találatok listázása]
    Listazas --> Vege([Vége])
    VanTalalat -- nem --> NincsTalalat[Nincs találat üzenet]
    NincsTalalat --> Vege
```

## Bandák keresése

```mermaid
flowchart TD
    Start([Start]) --> Feltetel[Keresési feltétel megadása]
    Feltetel --> Lekerdezes[Bandák lekérdezése]
    Lekerdezes --> VanTalalat{Van találat?}
    VanTalalat -- igen --> Listazas[Találatok listázása]
    Listazas --> Vege([Vége])
    VanTalalat -- nem --> NincsTalalat[Nincs találat üzenet]
    NincsTalalat --> Vege
```

## Bandához csatlakozás

```mermaid
flowchart TD
    Start([Start]) --> BandaValasztas[Banda kiválasztása]
    BandaValasztas --> Kerelem[Csatlakozási kérelem küldése]
    Kerelem --> Fuggoben[Membership létrehozása - fuggoben]
    Fuggoben --> Johagyas{Leader jóváhagyja?}
    Johagyas -- igen --> Aktivalas[Tagság aktiválása]
    Aktivalas --> Ertesites1[Értesítés a felhasználónak]
    Ertesites1 --> Vege([Vége])
    Johagyas -- nem --> Elutasitas[Tagság elutasítása]
    Elutasitas --> Ertesites2[Értesítés a felhasználónak]
    Ertesites2 --> Vege
```

## Banda létrehozása

```mermaid
flowchart TD
    Start([Start]) --> Adatok[Banda adatainak megadása - név, leírás]
    Adatok --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Letrehozas[Banda létrehozása az adatbázisban]
    Letrehozas --> LeaderKijeloles[Létrehozó Leaderré válik]
    LeaderKijeloles --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Adatok
```

## Profil szerkesztése

```mermaid
flowchart TD
    Start([Start]) --> Modositas[Profiladatok módosítása]
    Modositas --> Ellenorzes{Helyes adatok?}
    Ellenorzes -- igen --> Mentes[Mentés]
    Mentes --> Visszajelzes[Sikeres mentés visszajelzés]
    Visszajelzes --> Vege([Vége])
    Ellenorzes -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Modositas
```

## Zene posztolása

```mermaid
flowchart TD
    Start([Start]) --> Feltoltes[Zenefájl és cím megadása]
    Feltoltes --> Sikeres{Sikeres feltöltés?}
    Sikeres -- igen --> Mentes["Poszt mentése (media_type=audio)"]
    Mentes --> Megjelenes[Megjelenik a Feedben]
    Megjelenes --> Vege([Vége])
    Sikeres -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Vege
```

## Eseménynaptár megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Naptár nézet megnyitása]
    Megnyitas --> Lekerdezes[Próbák és koncertek lekérdezése]
    Lekerdezes --> Megjelenites[Naptár megjelenítése]
    Megjelenites --> Vege([Vége])
```

## Videó posztolása

```mermaid
flowchart TD
    Start([Start]) --> Feltoltes[Videófájl és cím megadása]
    Feltoltes --> Sikeres{Sikeres feltöltés?}
    Sikeres -- igen --> Mentes["Poszt mentése (media_type=video)"]
    Mentes --> Megjelenes[Megjelenik a Feedben]
    Megjelenes --> Vege([Vége])
    Sikeres -- nem --> HibaUzenet[Hibaüzenet]
    HibaUzenet --> Vege
```

## Tartalom kedvelése

```mermaid
flowchart TD
    Start([Start]) --> PosztValasztas[Poszt kiválasztása a Feedben]
    PosztValasztas --> KedvelesGomb[Kedvelés gomb megnyomása]
    KedvelesGomb --> MarKedvelte{Már kedvelte?}
    MarKedvelte -- igen --> Visszavonas[Kedvelés visszavonása - POST_LIKE törlése]
    Visszavonas --> Vege([Vége])
    MarKedvelte -- nem --> UjKedveles[POST_LIKE létrehozása]
    UjKedveles --> SzamNoveles[Kedvelésszám növelése]
    SzamNoveles --> Vege
```

## Banda követése

```mermaid
flowchart TD
    Start([Start]) --> BandaValasztas[Banda kiválasztása]
    BandaValasztas --> KovetesGomb[Követés gomb megnyomása]
    KovetesGomb --> MarKoveti{Már követi?}
    MarKoveti -- igen --> Megszuntetes[Követés megszüntetése - FOLLOW törlése]
    Megszuntetes --> Vege([Vége])
    MarKoveti -- nem --> UjKovetes[FOLLOW rekord létrehozása]
    UjKovetes --> FeedHatas[A banda tartalma előrébb kerül a Feedben]
    FeedHatas --> Vege
```

## Feed megtekintése

```mermaid
flowchart TD
    Start([Start]) --> Megnyitas[Feed menü megnyitása]
    Megnyitas --> Lekerdezes[Posztok lekérdezése]
    Lekerdezes --> Rangsorolas["Rangsorolás: követett bandák előre, majd dátum, majd kedvelésszám"]
    Rangsorolas --> Megjelenites[Feed megjelenítése]
    Megjelenites --> Gorget{Görget tovább?}
    Gorget -- igen --> Tovabbiak[További posztok betöltése]
    Tovabbiak --> Megjelenites
    Gorget -- nem --> Vege([Vége])
```

## Tartalom mentése

```mermaid
flowchart TD
    Start([Start]) --> ElemValasztas[Elem kiválasztása - poszt, banda, előadó vagy esemény]
    ElemValasztas --> MentesGomb[Mentés gomb megnyomása]
    MentesGomb --> MarMentve{Már mentve van?}
    MarMentve -- igen --> Torles[SAVED_ITEM törlése - mentés visszavonása]
    Torles --> Vege([Vége])
    MarMentve -- nem --> KategoriaValasztas[Kategória megadása - opcionális]
    KategoriaValasztas --> UjMentes[SAVED_ITEM létrehozása target_type/target_id és category mezőkkel]
    UjMentes --> Megjelenes[Elem megjelenik a Mentett elemek listájában]
    Megjelenes --> Vege
```

## Eseményre feliratkozás

```mermaid
flowchart TD
    Start([Start]) --> EsemenyValasztas[Esemény kiválasztása a naptárban - próba vagy koncert]
    EsemenyValasztas --> FeliratkozasGomb[Feliratkozás gomb megnyomása]
    FeliratkozasGomb --> MarFeliratkozott{Már feliratkozott?}
    MarFeliratkozott -- igen --> Lemondas[EVENT_SIGNUP állapot módosítása - lemondva]
    Lemondas --> Ertesites2[Visszajelzés a felhasználónak]
    Ertesites2 --> Vege([Vége])
    MarFeliratkozott -- nem --> UjFeliratkozas[EVENT_SIGNUP létrehozása - feliratkozva]
    UjFeliratkozas --> Ertesites1[Visszajelzés a felhasználónak]
    Ertesites1 --> Vege
```

## Előadó követése

```mermaid
flowchart TD
    Start([Start]) --> EloadoValasztas[Előadó - USER - kiválasztása]
    EloadoValasztas --> KovetesGomb[Követés gomb megnyomása]
    KovetesGomb --> MarKoveti{Már követi?}
    MarKoveti -- igen --> Megszuntetes[Követés megszüntetése - FOLLOW törlése]
    Megszuntetes --> Vege([Vége])
    MarKoveti -- nem --> UjKovetes[FOLLOW rekord létrehozása - target_type=eloado]
    UjKovetes --> Vege
```
