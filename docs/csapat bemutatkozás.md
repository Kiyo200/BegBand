Berki Bálint: WPF gyakorlat, jó problémamegoldó képesség, kitartó, és tapasztalt Android Studio fejlesztő
Farkas Róbert: WPF fejlesztő és dizájner
Fülöp Máté: architekturális gondolkodás, backend fejlesztő és tervező

leírás:

A Bandhub egy banda-szervező alkalmazás, amely a zenekarok szervezését, működését és a kapcsolódó eseményeket támogatja. A cél azt a problémát megoldani, hogy egy zenekar szervezése ma jellemzően szét van szórva — üzenetküldő alkalmazások, papíralapú vagy naptáras egyeztetés, külön zenei megosztó felületek között —, a Bandhub ezeket fogja össze egyetlen, szerepkör-alapú platformon.

Fő funkciók: zenekar alapítása vagy meglévőhöz csatlakozás, tagság kezelése (jóváhagyás, eltávolítás), próbák és koncertek szervezése közös eseménynaptárban, valamint zenei és videótartalom megosztása egy Instagram-szerű, személyre szabott feedben (a megjelenő tartalmak sorrendje felhasználónként eltér a követett bandák és a kedvelések alapján).

A rendszer négy szerepkört különböztet meg — Felhasználó, Banda vezető (Leader), Banda tag (BandMember) és Adminisztrátor —, végpont-/műveletszintű jogosultság-ellenőrzéssel (RBAC), így mindenki csak a saját szerepköréhez tartozó funkciókat éri el.

Architektúra: rétegezett, moduláris monolit backend (Java 21, Spring Boot), REST API-val, JWT alapú hitelesítéssel; PostgreSQL adatbázis és MinIO objektumtár (a feltöltött zenei/videó fájlokhoz); a kliensoldal Web (React), Asztali (C#/WPF) és Mobil (Kotlin) alkalmazásból áll, mindhárom ugyanazt a backend API-t használja. A teljes rendszer konténerizált, Docker Compose-szal üzemeltethető. Az architektúra a C4 modell szerint van dokumentálva (Context/Container/Component + Deployment diagram), ld. `docs/Rendszerdokumentacio.md`.