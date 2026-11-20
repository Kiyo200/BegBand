import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {useState} from "react";

export default function Header() {
    const [id, setId] =useState<string>("");

    return (
        <header >
            <Container>
            <nav>
                <Link to="/"><button>root</button></Link>
                <Link to="/felhasznalo/1"><button>felhasználó</button></Link>
                <Link to={"/poszt/"+Number(id)}><button>banda</button></Link>
                <input onChange={(e) => setId(e.target.value)}/>
            </nav>

            </Container>
        </header>
    )
}