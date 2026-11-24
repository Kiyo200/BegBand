import type {Poszt, UjPoszt} from "../components/API/adatEloszto.tsx";

const path = "https://localhost:3000/api/";

//get poszt:id
export async function getPosztById(id: number): Promise<Poszt> {
    const response = await fetch(path + id);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as Poszt;
}

//get összes poszt
export async function getPosztok(): Promise<Poszt[]> {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json() as Poszt[];
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
    return JSON.stringify(response);
}

//add poszt
export async function addPoszt(ujPoszt: UjPoszt) {
    const response = await fetch(path,
        {
            method: "POST",
            body: JSON.stringify(ujPoszt),
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    return JSON.stringify(response);
}
