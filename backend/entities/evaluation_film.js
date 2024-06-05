import typeorm from 'typeorm';

const evaluation_film = new typeorm.EntitySchema({
  name: 'evaluation_film',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    id_user: { type: Number },
    id_film: { type: Number },
    is_a_like: { type: Boolean },
  },
});

export default evaluation_film;
