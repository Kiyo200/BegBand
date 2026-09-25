# Component

> **Ajánlott architektúra (C4 szint 3).** A Backend API belső moduljai. Mindhárom kliens (Web/Asztali/Mobil, ld. [Container.md](Container.md)) ugyanazt a REST API-t hívja, platformspecifikus különbség nélkül — a [Container.md](Container.md)-ben leírtaknak megfelelően a hívások ténylegesen a Reverse proxyn (Nginx) keresztül érkeznek, ezért az szerepel a diagramon a kliensek és a Backend API modulok között (a diagram belső pontossága érdekében ez itt nem hagyható el). A korábbi tervezetben külön szereplő Próba-/koncert- és Naptár modult, illetve a Zenei tartalom- és Tartalom-feed modult itt egy-egy komponensbe vontam össze (Próba-/koncert-/naptármodul, Tartalomkezelő modul) — a kettéválasztás nem indokolt méretű felelősségi kört jelentett volna, és feleslegesen bonyolította a kapcsolatrendszert. Kanonikus forrás (hivatalos C4-PlantUML), **egyetlen, teljes diagramként**: [`../c4.puml`](../c4.puml) `C4_Component` blokk — ld. [c4.md](c4.md).
>
> **Megjegyzés (v0.15) — miért `flowchart`, nem `C4Component`:** ld. [Context.md](Context.md) azonos megjegyzését a Mermaid C4-diagramtípus keskeny-nézeti hibájáról. A `flowchart`-ra váltás — amellett, hogy szélességtől függetlenül stabil — azt is lehetővé tette, hogy a korábbi, erősen felbontott résznézeteket kicsit összevonjuk: a `flowchart` motorja egy célba (pl. Security modul) futó 4 forrás-nyilat még átfedés nélkül el tud rendezni (ellentétben a Mermaid C4-motorjával, amely ennél már 2-3 forrásnál is összefolyt), ezért a **Jogosultság-ellenőrzés** most egyetlen diagram (a korábbi 2 rész helyett). Az 5 forrásból egy célba (Adatbázis) futó eset viszont `flowchart`-tal is enyhe átfedést produkált teszteléskor, ezért az **Adatbázis-elérés** továbbra is 2 résznézetre van bontva. Összesen **5 résznézet** a korábbi 4/6 helyett. A teljes, egyben látható diagram a kanonikus [`../c4.puml`](../c4.puml) `C4_Component` blokkjában, illetve a [Rendszerdokumentacio.md 5.1](../../docs/Rendszerdokumentacio.md#sec-5-1) táblázatában érhető el.

## 1. Kérés-útvonal (Nginx → modulok)

```mermaid
flowchart TD
    client["<b>Kliens</b><br/><i>Web / Asztali / Mobil</i><br/>Ugyanazt az API-t hívja"]
    nginx["<b>Reverse proxy</b><br/><i>Nginx</i><br/>API-proxy, TLS-terminálás"]
    security["<b>Security / Auth modul</b><br/><i>Spring Security + JWT</i><br/>Bejelentkezés, token, RBAC"]
    userSvc["<b>Felhasználókezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Profil, admin userkezelés"]
    bandSvc["<b>Bandakezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Banda, tagság, szavazás"]
    eventSvc["<b>Próba-/koncert-/naptármodul</b><br/><i>Controller/Service/Repository</i><br/>Próba, koncert, feliratkozás"]
    contentSvc["<b>Tartalomkezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Zene/videó, feed, mentés, követés"]

    client -->|"REST/JSON<br/>[HTTPS]"| nginx
    nginx -->|"Bejelentkezés / regisztráció<br/>[REST/JSON]"| security
    nginx -->|"REST/JSON"| userSvc
    nginx -->|"REST/JSON"| bandSvc
    nginx -->|"REST/JSON"| eventSvc
    nginx -->|"REST/JSON"| contentSvc

    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    class client,nginx container
    class security,userSvc,bandSvc,eventSvc,contentSvc component
```

## 2. Jogosultság-ellenőrzés (RBAC)

```mermaid
flowchart TD
    security["<b>Security / Auth modul</b><br/><i>Spring Security + JWT</i><br/>Bejelentkezés, regisztráció, token kiadás/validálás, szerepkör-alapú jogosultság-ellenőrzés (RBAC)"]
    userSvc["<b>Felhasználókezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Profilszerkesztés, admin: userek kezelése/törlése"]
    bandSvc["<b>Bandakezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Banda létrehozása/keresése/kezelése, tagság, banda-belüli szavazás (poll)"]
    eventSvc["<b>Próba-/koncert-/naptármodul</b><br/><i>Controller/Service/Repository</i><br/>Próbák és koncertek kezelése, eseménynaptár, eseményre feliratkozás"]
    contentSvc["<b>Tartalomkezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Zene/videó posztolása, kedvelés, követés, feed, tartalom mentése"]

    userSvc -->|"Jogosultság-ellenőrzés"| security
    bandSvc -->|"Jogosultság-ellenőrzés"| security
    eventSvc -->|"Jogosultság-ellenőrzés"| security
    contentSvc -->|"Jogosultság-ellenőrzés"| security

    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    class security,userSvc,bandSvc,eventSvc,contentSvc component
```

## 3. Adatbázis-elérés — 1/2

```mermaid
flowchart TD
    security["<b>Security / Auth modul</b><br/><i>Spring Security + JWT</i><br/>Bejelentkezés, token, RBAC"]
    userSvc["<b>Felhasználókezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Profil, admin userkezelés"]
    bandSvc["<b>Bandakezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Banda, tagság, szavazás"]
    db[("<b>Adatbázis</b><br/><i>PostgreSQL</i>")]

    security -->|"Olvas/ír<br/>[JDBC/SQL]"| db
    userSvc -->|"Olvas/ír<br/>[JDBC/SQL]"| db
    bandSvc -->|"Olvas/ír<br/>[JDBC/SQL]"| db

    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    class security,userSvc,bandSvc component
    class db container
```

## 4. Adatbázis- és objektumtár-elérés — 2/2

```mermaid
flowchart TD
    eventSvc["<b>Próba-/koncert-/naptármodul</b><br/><i>Controller/Service/Repository</i><br/>Próba, koncert, feliratkozás"]
    contentSvc["<b>Tartalomkezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Zene/videó, feed, mentés, követés"]
    db[("<b>Adatbázis</b><br/><i>PostgreSQL</i>")]
    storage[("<b>Objektumtár</b><br/><i>MinIO</i>")]

    eventSvc -->|"Olvas/ír<br/>[JDBC/SQL]"| db
    contentSvc -->|"Olvas/ír<br/>[JDBC/SQL]"| db
    contentSvc -->|"Fájl fel-/letöltés<br/>[S3 API]"| storage

    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    class eventSvc,contentSvc component
    class db,storage container
```

## 5. Értesítések kiváltása

```mermaid
flowchart TD
    bandSvc["<b>Bandakezelő modul</b><br/><i>Controller/Service/Repository</i><br/>Banda, tagság, szavazás"]
    eventSvc["<b>Próba-/koncert-/naptármodul</b><br/><i>Controller/Service/Repository</i><br/>Próba, koncert, feliratkozás"]
    notifySvc["<b>Értesítő modul</b><br/><i>Service</i><br/>E-mail értesítések"]
    email["<b>E-mail szolgáltató</b><br/><i>Software System - külső</i><br/>SMTP relay"]

    eventSvc -->|"Meghívó / emlékeztető kiváltása"| notifySvc
    bandSvc -->|"Tagsági értesítés kiváltása"| notifySvc
    notifySvc -->|"Küldés<br/>[SMTP]"| email

    classDef component fill:#85BBF0,stroke:#5D82A8,color:#000
    classDef external fill:#8A8A8A,stroke:#6B6B6B,color:#fff
    class bandSvc,eventSvc,notifySvc component
    class email external
```
