import './MoviesCreate.css';
import { useFetchMovies } from './useFetchMovies';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function MoviesCreate() {
  const { movies, moviesLoadingError, fetchMovies } = useFetchMovies();

  return (
    <div className="Movies-container">
      <h1>Ajouter un film à la base de donnée</h1>
      <AddMovieForm onSuccessfulMovieCreation={fetchMovies} />

      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default MoviesCreate;
