import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export default function Header() {
    return (
        <header >
            <Container>

            </Container>
            <nav>



                <Link to="/"><button>root</button></Link>
                <Link to="/felhasznalo"><button>felhasználó</button></Link>
                <Link to="/poszt"><button>banda</button></Link>

            </nav>
        </header>
    )
}