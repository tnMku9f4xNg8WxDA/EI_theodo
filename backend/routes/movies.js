import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
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
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newMovie.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
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
