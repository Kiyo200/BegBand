import Header from "./header.tsx";
import {Outlet} from "react-router-dom";
import Labjegyzet from "./labjegyzet.tsx";
import "../index.css"


export default function Layout() {
    return (
        <>
            <Header/>
            <main className="main-section">
                <Outlet/>
            </main>
            <Labjegyzet/>

        </>
    )
}