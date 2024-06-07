import './Movies.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Movies() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    linkimg: '',
    note: 0,
    date: new Date(),
  });
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/` + movieId)
      .then((response) => {
        setMovie({
          title: response.data.title,
          description: response.data.description,
          linkimg: response.data.link,
          note: response.data.note,
          date: new Date(response.data.date),
        });
      })
      .catch((error) => {
        console.error('FRONT movie fetching error!', error);
      });
  }, [movieId]);

  const userId = 0;

  const handleReaction = (isLiked) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/eval/`, {
        movie_id: movieId,
        user_id: userId,
        is_a_like: isLiked,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const moisEnFrancais = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>
        Note de {(movie.note, console.log(movie))} et film sorti le{' '}
        {movie.date.getDate()} {moisEnFrancais[movie.date.getMonth()]}{' '}
        {movie.date.getFullYear()}
      </p>
      <img
        alt={movie.title}
        src={'https://image.tmdb.org/t/p/w500' + movie.linkimg}
      />
      <button onClick={() => handleReaction(true)}>J'aime</button>
      <button onClick={() => handleReaction(false)}>Je n'aime pas</button>
    </div>
  );
}

export default Movies;
