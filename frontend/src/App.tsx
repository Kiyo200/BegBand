import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header.tsx";
import BandaPage from "./components/pages/banda.tsx";
import FelhasznaloPage from "./components/pages/felhasznalo.tsx";
import RootPage from "./components/pages/root.tsx";
import PosztView from "./components/pages/posztView.tsx";
import PosztEdit from "./components/pages/posztEdit.tsx";
import Labjegyzet from "./components/labjegyzet.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<RootPage />} />
                <Route path="/banda" element={<BandaPage />} >
                    <Route path="poszt" element={<PosztView/>}/>
                    <Route path="posztEdit" element={<PosztEdit/>}/>
                </Route>
                <Route path="/felhasznalo" element={<FelhasznaloPage />} />
            </Routes>
            <Labjegyzet/>
        </BrowserRouter>
    </>
  )
}

export default App
