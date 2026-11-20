
//const path = "/posztok/"


export const MediaTipus = {
    None: "none",
    Audio: "audio",
    Video: "video",
} as const;

export type MediaTipus =
    (typeof MediaTipus)[keyof typeof MediaTipus];

export type Poszt = {
    id:number;
    cim:string;
    szoveg:string;
    felhasznaloID:number;
    felhasznaloNev:string;
    bandaID:number;
    bandaNev:string;
    banaAvatarURL:string;
    kepURL:string;
    mediaURL:string;
    posztMediaTipus:MediaTipus;
    status:string;
}
export type UjPoszt = {
    cim:string;
    szoveg:string;
/*
    felhasznaloID:number;  // lehet szerver
    felhasznaloNev:string;  // lehet szerver
    bandaID:number; // lehet szerver
    bandaNev:string;    // lehet szerver
    banaAvatarURL:string;   // lehet szerver
 */
    kepURL:string;
    mediaURL:string;
    posztMediaTipus:MediaTipus;
    status:string;
}

export const posztLista: Poszt[] = [
    {
        id: 1,
        cim: "Első próba az új dalhoz",
        szoveg: "Ma este a próbateremben véglegesítjük az új dal refrénjét. Hamarosan mutatunk belőle egy részletet!",
        felhasznaloID: 1,
        felhasznaloNev: "Anna",
        bandaID: 1,
        bandaNev: "Holdfény",
        banaAvatarURL: "kép1.com",
        kepURL: "https://placehold.co/600x400?text=Proba",
        mediaURL: "",
        posztMediaTipus: "none",
        status: "publikus",
    },
    {
        id: 2,
        cim: "Élő felvétel a próbáról",
        szoveg: "Egy rövid részlet a legutóbbi próbánkról. Mit gondoltok róla?",
        felhasznaloID: 2,
        felhasznaloNev: "Márk",
        bandaID: 2,
        bandaNev: "Viharjel",
        banaAvatarURL: "kép2.com",
        kepURL: "https://placehold.co/600x400?text=Live",
        mediaURL: "https://example.com/proba-felvetel.mp3",
        posztMediaTipus: "audio",
        status: "publikus",
    },
    {
        id: 3,
        cim: "Találkozunk a koncerten!",
        szoveg: "Szombaton 20:00-kor játszunk a klubban. Várunk mindenkit szeretettel!",
        felhasznaloID: 1,
        felhasznaloNev: "Anna",
        bandaID: 1,
        bandaNev: "Holdfény",
        banaAvatarURL: "kép3.com",
        kepURL: "https://placehold.co/600x400?text=Koncert",
        mediaURL: "https://example.com/koncert-elohivo.mp4",
        posztMediaTipus: "video",
        status: "publikus",
    },
];

const path = "https://localhost3000/"

//get poszt
export async function getPoszt(id: number) {
    const response = await fetch(path + id);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();


}

//put poszt
export async function updatePoszt(id:number, poszt: Poszt) {
    const response = await fetch(path+id,
        {
            method: 'PUT',
            headers: {"content-type": "application/json"},

            body: JSON.stringify({poszt: poszt})
        });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();


}

export async function addPoszt(ujPoszt: UjPoszt) {
    const response = await fetch(path,
        {
            method: "POST",
            body: JSON.stringify(ujPoszt),
        })
    .then(res => res.json())
    .catch(err => console.log(err));
    return response;

}
