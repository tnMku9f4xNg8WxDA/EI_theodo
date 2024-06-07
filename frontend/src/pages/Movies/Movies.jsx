import './Movies.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PouceHautNb from './Pouce_haut_nb.png';
import PouceBasNb from './Pouce_bas_nb.png';
import PouceHautCol from './Pouce_haut_col.png';
import PouceBasCol from './Pouce_bas_col.png';

function Movies() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    linkimg: '',
    note: 0,
    date: new Date(),
  });
  const [Like, setLike] = useState({
    blue: PouceHautNb,
    red: PouceBasNb,
  });
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/` + movieId)
      .then((response) => {
        console.log(response);
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

  const userId = 2;

  const handleReaction = (isLiked) => {
    if (isLiked) {
      setLike({ blue: PouceHautCol, red: PouceBasNb });
    } else {
      setLike({ blue: PouceHautNb, red: PouceBasCol });
    }
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
    <div className="allPage">
      <img
        className="imageMovie"
        alt={movie.title}
        src={'https://image.tmdb.org/t/p/w300' + movie.linkimg}
      />
      <div className="info">
        <h1 className="title">{movie.title}</h1>
        <p className="date">
          Date de sortie : {movie.date.getDate()}{' '}
          {moisEnFrancais[movie.date.getMonth()]} {movie.date.getFullYear()}
        </p>
        <p>Avis des utilisateurs : {movie.note}/10</p>
        <p className="synopsis">Synopsis : </p>
        <span className="txt_synopsis">{movie.description}</span>
        <br />
        <button className="boutonAvis" onClick={() => handleReaction(true)}>
          {' '}
          <img className="pouceHaut" src={Like.blue} alt="J'aime" />
        </button>
        <button className="boutonAvis" onClick={() => handleReaction(false)}>
          <img className="pouceBas" src={Like.red} alt="J'aime pas" />
        </button>
      </div>
    </div>
  );
}

export default Movies;
