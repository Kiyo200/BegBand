# BegBand backend (Spring Boot)

A BegBand Java backendje: Spring Boot 4, Java 21, PostgreSQL (Docker). Egyelőre a regisztrációt és a bejelentkezést tudja.

## Indítás

1. **Adatbázis**: a repo gyökeréből `docker compose up -d`. Ez elindítja a `begband-db` Postgres konténert a `localhost:5433` porton.
2. **Környezeti változók**: másold le a `.env.example`-t `.env` néven ide is és a repo gyökerébe is, és adj meg egy `DB_PASSWORD`-öt. A `.env` nem kerül gitbe.
3. **Backend**: IntelliJ-ben futtasd a `main` osztályt, vagy innen: `./mvnw spring-boot:run`. A szerver a `http://localhost:8080` címen fut.
4. **Frontend**: `cd frontend && npm run dev`, aztán nyisd meg a `/register` vagy a `/login` oldalt.

## Felépítés

A kód rétegekre van bontva, és minden rétegnek egy feladata van:

```
React űrlap ──POST JSON──▶ AuthController ──▶ AuthService ──▶ UserRepository ──▶ "Users" tábla
                          (HTTP be/ki)        (logika)        (SQL-t a Spring írja)
```

| Fájl | Szerep |
|---|---|
| `src/main/java/hu/begband/backend/main.java` | A program belépési pontja, ez indítja a Springet. |
| `auth/User.java` | **Entity**: a `"Users"` tábla egy sora Java objektumként. |
| `auth/UserRepository.java` | **Repository**: adatbázis-lekérdezések. |
| `auth/AuthDtos.java` | **DTO-k**: a bejövő és kimenő JSON-ok alakja, validációs szabályokkal. |
| `auth/AuthService.java` | **Service**: a regisztráció és a belépés logikája. |
| `auth/AuthController.java` | **Controller**: a HTTP végpontok és a hibakezelés. |
| `auth/AuthException.java` | Saját hibatípus, ami magával viszi a HTTP státuszkódot is. |
| `config/SecurityConfig.java` | A jelszó-hasheléshez használt `PasswordEncoder` (BCrypt). |

## API

Mindkét végpont JSON-t vár és JSON-t ad vissza. Hiba esetén a válasz mindig `{"message": "..."}` alakú, és az üzenet magyar, így a frontend egyből ki tudja írni.

### `POST /api/auth/register`

```json
{ "username": "kiyo", "email": "kiyo@pelda.hu", "password": "legalabb8karakter" }
```

| Válasz | Mikor |
|---|---|
| `201` `{"id": 3, "username": "kiyo", "email": "kiyo@pelda.hu"}` | Sikeres regisztráció. |
| `400` | Hibás adat: a felhasználónév nem 3–50 karakter, vagy tiltott karakter van benne; rossz e-mail; a jelszó nem 8–72 karakter. |
| `409` | A felhasználónév vagy az e-mail már foglalt. |

### `POST /api/auth/login`

```json
{ "identifier": "kiyo vagy kiyo@pelda.hu", "password": "..." }
```

| Válasz | Mikor |
|---|---|
| `200` `{"id": 3, "username": "kiyo", "email": "kiyo@pelda.hu"}` | Sikeres belépés. |
| `400` | Üres mező. |
| `401` | Nincs ilyen felhasználó, vagy rossz a jelszó. |
| `403` | A fiók le van tiltva (`banned`) vagy törölve (`deleted`). |

## Hogyan működik

### Regisztráció
1. A `@Valid` annotáció a `RegisterRequest` szabályai alapján ellenőrzi az adatokat. Ha valami nem stimmel, a controller `400`-at ad vissza.
2. A service levágja a felhasználónév és az e-mail körüli szóközöket, és kisbetűsre alakítja az e-mailt (`Kiyo@Pelda.hu` és `kiyo@pelda.hu` ugyanaz a cím).
3. Megnézi, hogy foglalt-e már a felhasználónév vagy az e-mail. Ha igen, `409`-et ad.
4. A jelszóból `passwordEncoder.encode()` BCrypt hasht csinál, és csak ez kerül a `password_hash` oszlopba.
5. Elmenti az új sort `role_id = 1` (`user`) szereppel. A `status` (`active`) és a `created_at` értékét az adatbázis tölti ki alapértelmezésként.

### Bejelentkezés
1. Ha az azonosítóban van `@`, e-mail alapján keres, különben felhasználónév alapján.
2. A `passwordEncoder.matches()` összeveti a beírt jelszót a tárolt hash-sel.
3. Ellenőrzi, hogy a fiók `active` állapotú-e.
4. Siker esetén visszaadja a felhasználó adatait. A frontend ezt elmenti (localStorage-ba, vagy ha nincs bepipálva a „Maradjak bejelentkezve”, sessionStorage-ba).

## Mit és miért csináltunk így

**Miért REST API és nem konzolos menü?**
A `main.java`-ban eredetileg egy `Scanner`-es konzolmenü volt. Egy webes backendet viszont a böngésző hív HTTP-n keresztül, a konzolra senki nem gépel. Ezért lett belőle két végpont, és a konzolos részt kivettük.

**Miért ilyen rétegekre bontva?**
Mindennek egy helye van. A controller csak a HTTP-vel foglalkozik, a service a szabályokkal, a repository az adatbázissal. Így a logika tesztelhető HTTP nélkül, és ha valami változik (pl. jön a JWT), csak egy helyen kell hozzányúlni.

**Miért DTO, és miért nem adjuk ki közvetlenül a `User`-t?**
A `User` entityben benne van a jelszó hash-e. Ha azt adnánk vissza, a hash kimenne a böngészőbe. A DTO pontosan azt tartalmazza, amit ki akarunk adni.

**Miért BCrypt hash, és miért nem a sima jelszó?**
Ha egyszer kiszivárogna az adatbázis, a sima jelszavakkal azonnal be lehetne lépni (más oldalakra is, mert sokan mindenhol ugyanazt használják). A BCrypt hash nem fordítható vissza, és szándékosan lassú, így a próbálgatás is drága. Minden hash saját véletlen „sót” kap, ezért két azonos jelszó hash-e is különbözik. A 72 karakteres jelszókorlát azért van, mert a BCrypt csak az első 72 bájtot veszi figyelembe.

**Miért csak a `spring-security-crypto` és nem a teljes Spring Security?**
Most csak a jelszó-hashelés kell. A teljes Spring Security alapból minden végpontot lezárna és egy saját login oldalt tenne elé, ami a mostani állapotban csak akadály lenne. Akkor érdemes bekapcsolni, amikor jön a tokenes védelem.

**Miért ugyanaz a hibaüzenet, ha nincs ilyen felhasználó és ha rossz a jelszó?**
Ha különböző lenne, ki lehetne fürkészni, kinek van fiókja az oldalon.

**Miért van az ellenőrzés után még egy `try/catch` mentéskor?**
Ha két ember pont egyszerre regisztrálja ugyanazt a nevet, mindkettő átmehet az „foglalt-e?” ellenőrzésen. Ilyenkor az adatbázis `UNIQUE` szabálya fogja meg a másodikat, és ezt is `409`-cé alakítjuk.

**Miért van validáció a frontenden és a backenden is?**
A frontend validáció csak kényelem (azonnal látszik a hiba). A backend viszont bárhonnan kaphat kérést, nem csak a mi oldalunkról, ezért ott is ellenőrizni kell.

**Miért Vite proxy (`frontend/vite.config.ts`)?**
Fejlesztéskor a frontend és a backend más porton fut, és a böngésző ilyenkor alapból blokkolja a hívást (CORS). A proxy miatt a frontend a saját címére küldi az `/api/...` kéréseket, és a Vite továbbítja őket a `localhost:8080`-ra, így nem kell CORS-t beállítani.

## Ami még hiányzik

- **Valódi munkamenet (token vagy session).** Most a frontend csak eltárolja, ki lépett be, de a szerver ezt nem tudja ellenőrizni. Ahhoz, hogy pl. posztolni csak bejelentkezve lehessen, a belépés után a szervernek egy tokent (pl. JWT) kell adnia, amit a frontend minden kérésnél visszaküld.
- Kijelentkezés a szerver oldalon, elfelejtett jelszó, e-mail megerősítés.
- Automatikus tesztek az `AuthService`-hez és a végpontokhoz.
