import './Movies.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Movies() {
  const userId = 123;

  const avisUser = (userId, movieId, avis) => {
    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/movies/?id_user=${userId}&id_film=${movieId}&is_a_like=${avis}`
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { movieId } = useParams(); //recup param ds l'url
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [linkimg, setLinkImg] = useState([]);
  console.log(movieId);
  //axios.get('localhost:8000/movies/' + { movieId });
  /*axios.get('localhost:8000/movies/4').then((response) => {
    setMovies(['ee']).catch((error) => console.log(error));
  });*/
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/` + movieId)
      .then((response) => {
        /*console.log(response.data);*/
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
      <button onClick={() => avisUser(userId, movieId, true)}>J'AIME</button>
      <button onClick={() => avisUser(userId, movieId, false)}>
        Je n'aime pas
      </button>
    </div>
  );
}

export default Movies;
