import express from 'express';
import { appDataSource } from '../datasource.js';
import evaluation_Film from '../entities/evaluation_film.js';
import Movie from '../entities/movies.js';
import User from '../entities/user.js';
import Genre from '../entities/genre.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  userRepository
    .save(newUser)
    .then(function (savedUser) {
      res.status(201).json({
        message: 'User successfully created',
        id: savedUser.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.post('/connect', async function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const user_genre = {};
  const user = await userRepository.findOneBy({ id: req.body.user_id });
  if (!user) {
    return res.status(404).json({ message: 'Movie or User not found' });
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
          user_genre[genre.id] = 0.3;
        }
        appDataSource
          .getRepository(Movie)
          .find({ relations: { categories: true } })
          .then((movies) => {
            const updatedMovies = movies.map((movie) => {
              movie.note_user =
                movie.note *
                movie.categories
                  .map((genre_result) => user_genre[genre_result.id])
                  .reduce((acc, current) => acc * current, 1);

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

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
