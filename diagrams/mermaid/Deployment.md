# Deployment

> **Ajánlott architektúra — kiegészítő C4 diagram (telepítés).** A hivatalos C4 modell a Context/Container/Component hármas mellett egy negyedik, kiegészítő diagramtípusként a **Deployment diagramot** ajánlja, amely azt mutatja, a [Container.md](Container.md)-ben leírt konténerek fizikailag milyen infrastruktúrán (gépen, futtatási környezeten) futnak éles üzemben — ld. [`../../docs/Rendszerdokumentacio.md`](../../docs/Rendszerdokumentacio.md#sec-9-1) 9. fejezet. Kanonikus forrás (hivatalos C4-PlantUML): [`../c4.puml`](../c4.puml) `C4_Deployment` blokk — ld. [c4.md](c4.md).
>
> **Megjegyzés (v0.15) — miért `flowchart`, nem `C4Deployment`:** ld. [Context.md](Context.md) azonos megjegyzését a Mermaid C4-diagramtípus keskeny-nézeti hibájáról. Az alábbi diagram sima `flowchart`-ra van átírva, beágyazott `subgraph`-okkal a `Deployment_Node` beágyazások helyett — ez szélességtől függetlenül stabil marad. A kanonikus [`../c4.puml`](../c4.puml) változatlan (a PlantUML-motor nem szenved ettől a hibától).

```mermaid
flowchart TD
    subgraph userDevice["Felhasználó eszköze [Böngésző / Windows PC / Android]"]
        web["<b>Web kliens</b><br/><i>React (statikus build)</i><br/>Böngészőben fut"]
        desktop["<b>Asztali kliens</b><br/><i>C# / WPF</i><br/>Telepített alkalmazás"]
        mobile["<b>Mobil kliens</b><br/><i>Kotlin</i><br/>Telepített alkalmazás"]
    end

    subgraph appServer["Alkalmazásszerver [Linux + Docker Engine]"]
        subgraph compose["Docker Compose stack [docker-compose.yml]"]
            subgraph nginxNode["nginx konténer [image: nginx:alpine]"]
                nginx["<b>Reverse proxy</b><br/><i>Nginx</i><br/>TLS-terminálás, statikus kiszolgálás, API-proxy"]
            end
            subgraph backendNode["backend konténer [image: bandhub-backend]"]
                backend["<b>Backend API</b><br/><i>Java 21 + Spring Boot</i><br/>REST API"]
            end
            subgraph dbNode["db konténer [image: postgres:16]"]
                db[("<b>Adatbázis</b><br/><i>PostgreSQL</i><br/>Perzisztens Docker volume-on")]
            end
            subgraph storageNode["storage konténer [image: minio/minio]"]
                storage[("<b>Objektumtár</b><br/><i>MinIO</i><br/>Perzisztens Docker volume-on")]
            end
        end
    end

    subgraph emailInfra["E-mail szolgáltató infrastruktúrája"]
        email["<b>E-mail szolgáltató</b><br/><i>Software System - külső</i><br/>Tranzakciós e-mailek kiküldése"]
    end

    web -->|"Betöltés + API hívások<br/>[HTTPS]"| nginx
    desktop -->|"API hívások<br/>[REST/JSON, HTTPS]"| nginx
    mobile -->|"API hívások<br/>[REST/JSON, HTTPS]"| nginx
    nginx -->|"API-hívásokat továbbít<br/>[REST/JSON]"| backend
    backend -->|"Olvas / ír<br/>[JDBC/SQL]"| db
    backend -->|"Fájl feltöltés / lekérés<br/>[S3 API]"| storage
    backend -->|"Értesítést küld<br/>[SMTP]"| email

    classDef container fill:#1168BD,stroke:#0B4884,color:#fff
    classDef external fill:#8A8A8A,stroke:#6B6B6B,color:#fff
    class web,desktop,mobile,nginx,backend,db,storage container
    class email external
```

**Fejlesztői környezet:** ugyanez a topológia, egyetlen gépen (fejlesztői laptop), `docker compose up`-pal indítva — ld. [`../../docs/Rendszerdokumentacio.md`](../../docs/Rendszerdokumentacio.md#sec-9-2) 9.2 fejezet.

> **HELYŐRZŐ:** a konkrét szerver/hoszting-szolgáltató, valamint a redundancia/skálázás kérdése (ld. [9.3](../../docs/Rendszerdokumentacio.md#sec-9-3)) — ez a projekt növekedésével döntendő el.
