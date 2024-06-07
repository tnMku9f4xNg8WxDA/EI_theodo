import express from 'express';
import { appDataSource } from '../datasource.js';
import evaluation_Film from '../entities/evaluation_film.js';
import Movie from '../entities/movies.js';
import User from '../entities/user.js';
import Genre from '../entities/genre.js';

const router = express.Router();

router.post('/', async function (req, res) {
  const evalRepository = appDataSource.getRepository(evaluation_Film);
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);
  const user_genre = {};
  try {
    const movie = await movieRepository.findOneBy({ id: req.body.movie_id });
    const user = await userRepository.findOneBy({ id: req.body.user_id });
    if (!movie || !user) {
      return res.status(404).json({ message: 'Movie or User not found' });
    }
    const newEval = evalRepository.create({
      is_a_like: req.body.is_a_like,
      film: movie,
      user: user,
    });

    evalRepository
      .save(newEval)
      .then(function (savedEval) {
        res.status(201).json({
          message: 'Evaluation successfully created',
          id: savedEval.id,
        });
      })
      .catch(function (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: 'Error while creating the evaluation' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating the evaluation' });
  }
  appDataSource
    .getRepository(Genre)
    .find({})
    .then((genres) => {
      genres.map(async (genre) => {
        const count_true = await appDataSource
          .getRepository(evaluation_Film)
          .createQueryBuilder('evaluation')
          .innerJoin('evaluation.film', 'Movie')
          .innerJoin('evaluation.user', 'User')
          .innerJoin('Movie.categories', 'Genre')
          .where('User.id = :user_id', { user_id: req.body.user_id })
          .andWhere('Genre.id = :genre', { genre: genre.id })
          .andWhere('is_a_like = :is_a_like', { is_a_like: true })
          .getCount();
        const count_false = await appDataSource
          .getRepository(evaluation_Film)
          .createQueryBuilder('evaluation')
          .clone()
          .andWhere('is_a_like = :isALike', { isALike: false })
          .getCount();
        if (count_true + count_false > 0) {
          user_genre[genre.id] = 0.01 + count_true / (count_true + count_false);
        } else {
          user_genre[genre.id] = 0.4;
        }
        appDataSource
          .getRepository(Movie)
          .find({ relations: { categories: true } })
          .then((movies) => {
            const updatedMovies = movies.map((movie) => {
              movie.note_user =
                movie.note *
                Math.pow(
                  movie.categories
                    .map((genre_result) => user_genre[genre_result.id])
                    .reduce((acc, current) => acc * current, 1),
                  1 / movie.categories.length
                );

              return movie;
            });
            for (
              let i = 0;
              i < Math.floor(updatedMovies.length / 500) + 1;
              i++
            ) {
              appDataSource
                .getRepository(Movie)
                .save(updatedMovies.slice(500 * i, 500 * (i + 1)));
            }
          });
      });
    });
});

export default router;
