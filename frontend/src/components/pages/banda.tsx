import {Link, Outlet} from "react-router-dom";

export default function BandaPage({ id }: { id?: number }) {

    return (
    <>
        <h1>Banda</h1>
        {id}
        <Link to="/posztEdit">edit</Link>
        <Link to="/poszt">view</Link>
        <Outlet/>
    </>)
}