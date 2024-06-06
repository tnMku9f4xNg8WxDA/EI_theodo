import './MovieTable.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MovieTable({ name }) {
  const [movie_list, setmovie_list] = useState([]);

  useEffect(() => {
    const url = name ? `?name=${name}` : '';
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/search` + url)
      .then((response) => {
        setmovie_list(response.data.movies);
      })
      .catch((error) => {
        console.error("Erreur à l'import des films ", error);
      });
  }, [name]);

  if (!movie_list || movie_list.length === 0) {
    return <p>C'est vide</p>;
  }
  console.log(movie_list);

  return (
    <div>
      <table className="movie-table">
        <tbody className="flex-container">
          {movie_list.map((film) => (
            <tr key={film.id}>
              <td className="flex-item">
                <a href={'http://localhost:3000/movies/' + film.id}>
                  {' '}
                  <img
                    alt=""
                    src={'https://image.tmdb.org/t/p/w500/' + film.link}
                  ></img>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MovieTable;
