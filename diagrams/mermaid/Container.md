# Container

> **Ajánlott architektúra (C4 szint 2).** Mindhárom felvetett kliens platform (Web, Asztali, Mobil) megvalósul, egy közös backend REST API-ra támaszkodva. A zenei/videó tartalmakhoz önálló objektumtár-konténer tartozik, mert ezek mérete/jellege nem az adatbázisba való (ld. [Adatmodell.md](Adatmodell.md) `POST.media_url`). Kanonikus forrás (hivatalos C4-PlantUML): [`../c4.puml`](../c4.puml) `C4_Container` blokk — ld. [c4.md](c4.md).
>
> **Megjegyzés (v0.15) — miért `flowchart`, nem `C4Container`:** ld. [Context.md](Context.md) azonos megjegyzését — a Mermaid `C4Container` diagramtípus keskeny megjelenítésnél (pl. VS Code osztott Markdown-előnézet) újraszámolja (nem csak kicsinyíti) a belső elrendezést, ami egymásra futó feliratokat eredményezett. Az alábbi diagram ezért sima `flowchart`-ra van átírva, C4-stílusú színezéssel és a `System_Boundary`-t egy `subgraph`-fal helyettesítve — ez szélességtől függetlenül stabil marad, mert a `flowchart` mindig a tartalom természetes méretében számol, és csak a megjelenítő kicsinyíti egységesen. A kanonikus [`../c4.puml`](../c4.puml) változatlan (a PlantUML-motor nem szenved ettől a hibától).

```mermaid
flowchart TD
    user["<b>Felhasználó</b><br/><i>Person</i><br/>User / Leader / BandMember / Admin"]

    subgraph bandhub["Bandhub rendszer (konténerizált szerveroldal)"]
        web["<b>Web kliens</b><br/><i>React + TypeScript (SPA)</i><br/>Böngészőből elérhető felhasználói felület"]
        desktop["<b>Asztali kliens</b><br/><i>C# / WPF</i><br/>Windows asztali alkalmazás"]
        mobile["<b>Mobil kliens</b><br/><i>Kotlin (Android)</i><br/>Mobilalkalmazás"]
        nginx["<b>Reverse proxy</b><br/><i>Nginx</i><br/>Web kliens statikus kiszolgálása, API-forgalom proxyzása és TLS-terminálása minden kliens számára"]
        backend["<b>Backend API</b><br/><i>Java 21 + Spring Boot</i><br/>Üzleti logika, jogosultságkezelés (JWT), REST API — közös minden kliens számára"]
        db[("<b>Adatbázis</b><br/><i>PostgreSQL</i><br/>Felhasználók, bandák, tagságok, próbák, koncertek, események, posztok metaadatai")]
        storage[("<b>Objektumtár</b><br/><i>MinIO (S3-kompatibilis)</i><br/>Feltöltött zene-/videófájlok, borító- és profilképek")]
    end

    email["<b>E-mail szolgáltató</b><br/><i>Software System - külső</i><br/>SMTP relay"]

    user -->|"Használja<br/>[HTTPS, böngészőből]"| web
    user -->|"Használja"| desktop
    user -->|"Használja"| mobile

    web -->|"Betöltés + API hívások<br/>[HTTPS]"| nginx
    desktop -->|"API hívások<br/>[REST/JSON, HTTPS]"| nginx
    mobile -->|"API hívások<br/>[REST/JSON, HTTPS]"| nginx
    nginx -->|"API-hívásokat továbbít<br/>[REST/JSON]"| backend

    backend -->|"Olvas / ír<br/>[JDBC/SQL]"| db
    backend -->|"Fájl feltöltés / lekérés<br/>[S3 API]"| storage
    backend -->|"Értesítést küld<br/>[SMTP]"| email

    classDef person fill:#08427B,stroke:#052E56,color:#fff
    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    classDef external fill:#8A8A8A,stroke:#6B6B6B,color:#fff
    class user person
    class web,desktop,mobile,nginx,backend,db,storage container
    class email external
```

**Komponensszint:** a Backend API belső felépítése — ld. [Component.md](Component.md).
