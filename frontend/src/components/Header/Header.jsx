import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = () => {
  return (
    <div className="Header-container">
      <img className="logo" alt="logo" src={logo}></img>
      <Link className="Link" to="/">
        Menu
      </Link>
      <Link className="Link" to="/users">
        Utilisateur
      </Link>
      <Link className="Link" to="/moviesCreate">
        Ajouter un film
      </Link>
      <Link className="Link" to="/about">
        À propos
      </Link>
    </div>
  );
};

export default Header;
