import './Home.css';
import { useState } from 'react';
import loupe_recherche from './loupe_recherche.png';
import MovieTable from '../../components/MovieTable/MovieTable';

function Home() {
  const [movieName, setmovieName] = useState('');

  const savemovieName = (event) => {
    setmovieName(event.target.value);
  };

  return (
    <div className="App">
      <header>
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
      </header>
    </div>
  );
}

export default Home;
