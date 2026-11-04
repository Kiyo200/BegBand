import {BrowserRouter, Route, Routes} from "react-router-dom";
import BandaPage from "./components/pages/banda.tsx";
import FelhasznaloPage from "./components/pages/felhasznalo.tsx";
import RootPage from "./components/pages/root.tsx";
import PosztView from "./components/pages/posztView.tsx";
import PosztEdit from "./components/pages/posztEdit.tsx";
import Layout from "./components/Layout.tsx";
import "./index.css"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<RootPage/>}/>
                        <Route element={<BandaPage/>}>
                            <Route path="/poszt" element={<PosztView/>}/>
                            <Route path="/posztEdit" element={<PosztEdit/>}/>
                        </Route>
                        <Route path="/felhasznalo" element={<FelhasznaloPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
