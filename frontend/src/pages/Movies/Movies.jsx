import './Movies.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Movies() {
  const { movieId } = useParams(); //recup param ds l'url
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [linkimg, setLinkImg] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/` + movieId)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLinkImg(response.data.link);
      })
      .catch((error) => {
        console.error('FRONT movie fetching error!', error);
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {description}
      <img alt={title} src={'https://image.tmdb.org/t/p/w500' + linkimg} />
      <button>J'AIME</button>
      <button>Je n'aime pas</button>
    </div>
  );
}

export default Movies;
