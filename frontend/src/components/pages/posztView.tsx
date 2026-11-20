import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { getPoszt } from "../API/adatEloszto.tsx";


export default function PosztView (){
    const { id } = useParams();

    const { data: poszt, isLoading, error } = useQuery({
        queryKey: ["posztok", id],
        queryFn: () => getPoszt(Number(id))
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h1>{poszt?.cim}</h1>
            <p>{poszt?.szoveg}</p>
        </div>
    );
}