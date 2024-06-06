import './Movies.css';

import { useParams } from 'react-router-dom';

function Movies() {
  const { movieId } = useParams();
  console.log(movieId);

  return (
    <div>
      <p>C'est le film {movieId}</p>
    </div>
  );
}

export default Movies;
