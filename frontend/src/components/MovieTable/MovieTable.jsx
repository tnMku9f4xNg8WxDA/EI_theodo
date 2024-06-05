import './MovieTable.css';
import { useFetchMovies } from '../../pages/Home/useFetchMovies.jsx';

function MovieTable({ name }) {
  const movie = useFetchMovies();

  if (!movie || movie.length === 0) {
    return <p>C'est vide</p>;
  }

  console.log(movie);

  return (
    <div>
      <table className="movie-table">
        <tbody class="flex-container">
          {movie
            .filter((film) =>
              film.title.toLowerCase().includes(name.toLowerCase())
            )
            .map((film) => (
              <tr key={film.id}>
                <td class="flex-item">
                  <a href={'localhost:3000/movies/' + film.id}>
                    {' '}
                    <img
                      alt=""
                      src={
                        'https://image.tmdb.org/t/p/w500/' + film.poster_path
                      }
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
