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
      type: 'many-to-one',
      target: 'Movie',
      joinColumn: true,
      cascade: true,
      inverseSide: 'notes',
    },
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      cascade: true,
      inverseSide: 'evaluations',
    },
  },
});

export default evaluation_film;
