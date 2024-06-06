import './Movies.css';
import MovieTable from '../../components/MovieTable/MovieTable';
import { useFetchMovies } from './useFetchMovies';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function Movies() {
  const { movies, moviesLoadingError, fetchMovies } = useFetchMovies();

  return (
    <div className="Movies-container">
      <h1>This page displays the movies</h1>
      <AddMovieForm onSuccessfulMovieCreation={fetchMovies} />

      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default Movies;
