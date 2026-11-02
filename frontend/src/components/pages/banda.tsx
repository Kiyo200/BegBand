import {Link, Outlet} from "react-router-dom";

export default function BandaPage({ id }: { id?: number }) {

    return (
    <>
        <h1>Banda</h1>
        {id}
        <Link to="/banda/posztEdit">edit</Link>
        <Link to="/banda/poszt">view</Link>
        <Outlet/>
    </>)
}