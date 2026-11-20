import Header from "./header.tsx";
import {Outlet} from "react-router-dom";
import Labjegyzet from "./labjegyzet.tsx";
import "../index.css"
import {Stack} from "react-bootstrap";

// kell dizájn preferencia 'Context'-el

export default function Layout() {
    return (
        <>
            <Header/>

            <Stack gap={2}>
            <div/>
            <main className="main-section">
                <Outlet/>
            </main>
            <div/>
            </Stack>
            <Labjegyzet/>

        </>
    )
}