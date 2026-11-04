import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav>



                <Link to="/"><button>root</button></Link>
                <Link to="/felhasznalo"><button>felhasználó</button></Link>
                <Link to="/banda"><button>banda</button></Link>

            </nav>
        </header>
    )
}