# UzenetKuldes

> **Tervezési javaslat (v0.16).** Üzenet küldése privát vagy banda-chatben — mindkét típus ugyanezt a folyamatot követi (ld. [Adatmodell.md](Adatmodell.md) „Chat” szakasz, [`../../docs/Rendszerdokumentacio.md`](../../docs/Rendszerdokumentacio.md#sec-7-3) 7.3).

```mermaid
sequenceDiagram
    actor K as Küldő
    participant FE as Küldő kliense
    participant BE as Backend API (Chat modul)
    participant DB as Adatbázis
    participant FE2 as Címzett(ek) kliense
    actor C as Címzett(ek)

    Note over FE,BE: Bejelentkezés után: WebSocket-kapcsolat (WSS), STOMP CONNECT a JWT-vel,<br/>feliratkozás a saját üzenetsorra (/user/queue/messages)
    K->>FE: Üzenet beírása és elküldése
    FE->>BE: STOMP SEND /app/conversations/{id}/messages
    BE->>BE: JWT-ellenőrzés + résztvevője-e a beszélgetésnek?
    alt Résztvevő és érvényes üzenet
        BE->>DB: INSERT Message
        DB-->>BE: OK
        BE-->>FE: Visszaigazolás (üzenet-azonosító, időbélyeg)
        BE-->>FE2: Új üzenet push az online résztvevőknek
        FE2-->>C: Üzenet megjelenítése / olvasatlan-számláló növelése
    else Nem résztvevő vagy érvénytelen üzenet
        BE-->>FE: STOMP ERROR (403/400)
        FE-->>K: Hibaüzenet megjelenítése
    end
    Note over BE,FE2: Offline résztvevő: a következő megnyitáskor REST-en tölti le az előzményeket<br/>(GET /api/conversations/{id}/messages?before=..., lapozva)
```
