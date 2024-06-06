import typeorm from 'typeorm';

const evaluation_film = new typeorm.EntitySchema({
  name: 'evaluation_film',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    is_a_like: { type: Boolean },
  },
  relations: {
    film: {
      type: 'one-to-many',
      target: 'Movie',
      joinColumn: true,
      cascade: true,
    },
    user: {
      type: 'one-to-many',
      target: 'User',
      joinColumn: true,
      cascade: true,
    },
  },
});

export default evaluation_film;
