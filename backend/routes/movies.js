import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
const router = express.Router();

router.get('/search', function (req, res) {
  const offset = req.query.page ? (parseInt(req.query.page, 10) - 1) * 100 : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
  const name = req.query.name ? req.query.name : '';
  appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie')
    .where('movie.title LIKE :name', { name: `%${name}%` })
    .orderBy('movie.note_user', 'DESC')
    .offset(offset)
    .limit(limit)
    .getMany()
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    note: req.body.note,
    link: req.body.link,
  });

  movieRepository
    .save(newMovie)
    .then(function (savedMovie) {
      res.status(201).json({
        message: 'Movie successfully created',
        id: savedMovie.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the movie' });
    });
});

router.get('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .findOne({ where: { id: req.params.movieId } })
    .then(function (movie) {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function (error) {
      res.status(500).json({ message: 'Error retrieving movie', error });
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .findOne({ where: { id: req.params.movieId } })
    .then(function (movie) {
      if (movie) {
        appDataSource
          .getRepository(Movie)
          .delete({ id: req.params.movieId })
          .then(function () {
            res.status(200).json({ message: 'Movie successfully deleted' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;

/*
router.get('/search', function (req, res) {
  const offset = req.query.page ? (parseInt(req.query.page, 10) - 1) * 100 : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
  const name = req.query.name ? req.query.name : '';
  const user_id = req.query.user_id ? req.query.user_id : 0;
  const user_genre = {};
  appDataSource
    .getRepository(Genre)
    .find({})
    .then((genres) => {
      genres.map(async (genre) => {
        const count_true = await appDataSource
          .getRepository(Evaluation_Film)
          .createQueryBuilder('evaluation')
          .join('INNER', 'evaluation.film', 'Movie')
          .join('INNER', 'evaluation.user', 'User')
          .join('INNER', 'Movie.categories', 'Genre')
          .where('User.id = :user_id', { user_id: user_id })
          .andWhere('Genre.id = :genre', { genre: genre.id })
          .andWhere('is_a_like = :is_a_like', { is_a_like: true })
          .getCount();
        const count_false = await appDataSource
          .getRepository(Evaluation_Film)
          .createQueryBuilder('evaluation')
          .join('INNER', 'evaluation.film', 'Movie')
          .join('INNER', 'evaluation.user', 'User')
          .join('INNER', 'Movie.categories', 'Genre')
          .where('User.id = :user_id', { user_id: user_id })
          .andWhere('Genre.id = :genre', { genre: genre.id })
          .andWhere('is_a_like = :is_a_like', { is_a_like: false })
          .getCount();
        user_genre[genre.id] = count_true / (count_true + count_false);
      });
    })
    .then(() => {
      const temp_EvalRepository = appDataSource.getRepository(temp_Eval);
      appDataSource
        .getRepository(Movie)
        .createQueryBuilder('movie')
        .where('movie.title LIKE :name', { name: `%${name}%` })
        .andwhere('note > 0.5')
        .getMany()
        .then(function (movies) {
          movies.map(async (movie) => {
            const newtemp_eval = temp_EvalRepository
              .create({
                id: movie.id,
                note: movie.note * Math.pow(5, 1 / movie.categories.length),
              })
              .then(temp_EvalRepository.save(newtemp_eval));
          });
        })
        .then(
          temp_EvalRepository
            .createQueryBuilder('evaluation')
            .orderby('evaluation.note', 'DESC')
            .offset(offset)
            .limit(limit)
            .getMany()
            .then(function (movies) {
              res.json({ movies: movies });
            })
        );
    });
});
*/
