import {Link, Outlet} from "react-router-dom";

export default function BandaPage({ id }: { id?: number }) {

    return (
    <>
        <h1>Banda</h1>
        {id}
        <Link to="/posztEdit/1">edit</Link>
        <Link to="/poszt/1">view</Link>
        <Outlet/>
    </>)
}