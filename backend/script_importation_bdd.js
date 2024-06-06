import { appDataSource } from './datasource.js';
import Movie from './entities/movies.js';
import Genre from './entities/genre.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
  },
};
appDataSource.initialize().then(() => {
  appDataSource
    .getRepository(Genre)
    .find({})
    .then(function (genre) {
      if (genre.length === 0) {
        fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=fr',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            response.genres.map((theme) => {
              const genreRepository = appDataSource.getRepository(Genre);
              const newGenre = genreRepository.create({
                id: theme.id,
                name: theme.name,
              });

              genreRepository
                .save(newGenre)
                .then(function (savedGenre) {
                  console.log('Genre added successfully : ' + savedGenre.id);
                })
                .catch(function (error) {
                  console.error(error);
                });
            });
          })
          .catch((err) => console.error(err));
      }
    });

  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movie) {
      if (movie.length === 0) {
        for (let i = 0; i < 1000; i++) {
          fetch(
            'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=' +
              i,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              response.results?.map((film) => {
                const movieRepository = appDataSource.getRepository(Movie);
                const genreRepository = appDataSource.getRepository(Genre);
                genreRepository.findByIds(film.genre_ids).then((categories) => {
                  const newMovie = movieRepository.create({
                    title: film.title,
                    date: new Date(film.release_date),
                    description: film.overview,
                    note: film.vote_average,
                    note_user: film.vote_average,
                    link: film.poster_path,
                    categories: categories,
                  });
                  if (
                    newMovie.description.length > 0 &&
                    newMovie.categories.length > 0 &&
                    film.adult === false
                  ) {
                    movieRepository
                      .save(newMovie)
                      .then(function (savedMovie) {
                        console.log(
                          'Movie added successfully : ' + savedMovie.id
                        );
                      })
                      .catch(function (error) {
                        console.error(error);
                      });
                  } else {
                    console.log('Film mal référencé');
                  }
                });
              });
            })
            .catch((err) => console.error(err));
        }
      }
    });
});

/* Il faut executer dans la console : node --env-file=.env script_importation_bdd.js */
