import './Home.css';
import { useState } from 'react';
import axios from 'axios';
import loupe_recherche from './loupe_recherche.png';
import MovieTable from '../../components/MovieTable/MovieTable';
import { useFetchUsers } from './../Users/useFetchUsers';

function Home() {
  const [movieName, setmovieName] = useState('');

  const savemovieName = (event) => {
    setmovieName(event.target.value);
  };
  const { users, usersLoadingError, fetchUsers } = useFetchUsers();
  const [userEmail, setUserEmail] = useState('');
  const [userFirstname, setUserFirstname] = useState('Choisissez un');
  const [userLastname, setUserLastname] = useState('utilisateur !');
  const [userID, setUserID] = useState(0);

  const setInfosUser = (email, firstname, lastname, id) => {
    setUserEmail('(' + email + ')');
    setUserFirstname('Vous êtes ' + firstname);
    setUserLastname(lastname);
    setUserID(id);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/connect`, {
        user_id: userID,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h2>
        {userFirstname} {userLastname} {userEmail}
      </h2>
      <nav>
        <ul>
          <li class="deroulant">
            <a href="#">Utilisateurs &ensp;</a>
            <ul class="sous">
              {users.map((user) => (
                <li key={user.email}>
                  <a
                    href="#"
                    onClick={() => {
                      setInfosUser(
                        user.email,
                        user.firstname,
                        user.lastname,
                        user.id
                      );
                    }}
                  >
                    {user.email}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
      <div className="search">
        <img className="imageSearch" src={loupe_recherche} alt="loupe" />
        <input
          type="text"
          placeholder="Rechercher un film"
          value={movieName}
          onChange={savemovieName}
        />
      </div>
      <div className="App-header">
        <MovieTable name={movieName} />
      </div>
    </div>
  );
}

export default Home;
