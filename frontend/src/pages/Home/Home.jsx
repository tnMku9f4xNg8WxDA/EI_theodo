import './Home.css';
import { useState } from 'react';
import MovieTable from '../../components/MovieTable/MovieTable';

function Home() {
  const [movieName, setmovieName] = useState('');

  const savemovieName = (event) => {
    setmovieName(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Films d'Hyris télévision</p>
        <input
          type="text"
          placeholder="Rechercher un film"
          value={movieName}
          onChange={savemovieName}
        />
        <p> Tu cherches : {movieName} </p>
        <MovieTable name={movieName} />
      </header>
    </div>
  );
}

export default Home;
