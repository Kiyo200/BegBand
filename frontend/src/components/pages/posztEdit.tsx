import {useState, type ChangeEvent, type FormEvent} from "react";
import {MediaTipus, type UjPoszt} from "../API/adatEloszto.tsx";


//kezelni kell az uj és a módosított posztokat külön

//poszt feltöltése api-ra -> redirect to postview


export default function PosztEdit() {
    const [currentPoszt, setCurrentPoszt] = useState<UjPoszt>({
        cim: "",
        szoveg: "",
        kepURL: "",
        mediaURL: "",
        posztMediaTipus: MediaTipus.None,
        status: ""
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const {name, value} = event.currentTarget;
        setCurrentPoszt((poszt) => {
            switch (name) {
                case "cim":
                    return {...poszt, cim: value};
                case "szoveg":
                    return {...poszt, szoveg: value};
                case "posztMediaTipus":
                    switch (value) {
                        case MediaTipus.None:
                        case MediaTipus.Audio:
                        case MediaTipus.Video:
                            return {...poszt, posztMediaTipus: value};
                        default:
                            return poszt;
                    }
                default:
                    return poszt;
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="cim" onChange={handleInputChange} value={currentPoszt.cim}/>
            <textarea name="szoveg" onChange={handleInputChange} value={currentPoszt.szoveg}/>

            <select name="posztMediaTipus" onChange={handleInputChange} value={currentPoszt.posztMediaTipus}
                    defaultValue={currentPoszt.posztMediaTipus}>
                <option value={MediaTipus.None}>None</option>
                <option value={MediaTipus.Video}>Videó</option>
                <option value={MediaTipus.Audio}>Audió</option>
            </select>

            <button type="submit">
                Save
            </button>
        </form>
    );
}
