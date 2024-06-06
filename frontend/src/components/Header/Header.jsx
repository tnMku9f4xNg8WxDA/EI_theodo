import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Menu
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Utilisateur
      </Link>
      <div>|</div>
      <Link className="Link" to="/movies">
        Ajouter un film
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        A propos
      </Link>
    </div>
  );
};

export default Header;
