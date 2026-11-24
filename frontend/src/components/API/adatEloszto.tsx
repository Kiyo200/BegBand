


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

/*
interface Dictionary {
    [key: string]: Poszt;
}

const gyorsitotar:Dictionary = {
    1:{
        id: 1,
        cim: "Próba a hétvégén",
        szoveg: "Szombaton 18 órától próbát tartunk a garázsban. Hozzátok a hangszereket és a jókedvet!",
        felhasznaloID: 1,
        felhasznaloNev: "Nagy Anna",
        bandaID: 1,
        bandaNev: "Viharzóna",
        banaAvatarURL: "/kepek/viharzona.jpg",
        kepURL: "/kepek/proba.jpg",
        mediaURL: "",
        posztMediaTipus: MediaTipus.None,
        status: "publikus",
    },
    2:{
        id: 2,
        cim: "Megjelent az új dalunk",
        szoveg: "Fölkerült a legújabb számunk, a „Tavaszi zaj” a bandánk oldalára. Hallgassátok meg, és írjátok meg, mit gondoltok róla!",
        felhasznaloID: 2,
        felhasznaloNev: "Kovács Márk",
        bandaID: 2,
        bandaNev: "Késői Műszak",
        banaAvatarURL: "/kepek/kesoimuszak.jpg",
        kepURL: "",
        mediaURL: "/media/tavaszi-zaj.mp3",
        posztMediaTipus: MediaTipus.Audio,
        status: "publikus",
    },
    3:{
        id: 3,
        cim: "Köszönjük a tegnap estét!",
        szoveg: "Fantasztikus volt veletek a koncert a Dürer Kertben. Köszönjük mindenkinek, aki eljött és velünk énekelt!",
        felhasznaloID: 3,
        felhasznaloNev: "Tóth Lili",
        bandaID: 1,
        bandaNev: "Viharzóna",
        banaAvatarURL: "/kepek/viharzona.jpg",
        kepURL: "/kepek/koncert.jpg",
        mediaURL: "/media/koncert-reszlet.mp4",
        posztMediaTipus: MediaTipus.Video,
        status: "publikus",
    },
}
 */
