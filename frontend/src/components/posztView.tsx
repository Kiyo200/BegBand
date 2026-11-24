import {useParams} from "react-router-dom";
import {getPosztById} from "../lib/APIcalls.ts";
import type {Poszt} from "./API/adatEloszto.tsx";
import {useEffect, useState} from "react";

export default function PosztView() {
    const [isLoading, setIsLoading] = useState(true);
    const [poszt, setPoszt] = useState<Poszt>();
    const [error, setError] = useState<Error>();
    const {id} = useParams();

    useEffect(() => {
        if (!id || Number.isNaN(Number(id))) {
            setError(new Error("Invalid post ID"));
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        getPosztById(Number(id))
            .then((result) => {
                if (!cancelled) setPoszt(result);
            })
            .catch((reason: unknown) => {
                if (!cancelled) {
                    setError(reason instanceof Error ? reason : new Error("Failed to load post"));
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h1>{poszt?.cim}</h1>
            <p>{poszt?.szoveg}</p>
        </div>
    );
}