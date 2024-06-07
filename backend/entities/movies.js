import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: { type: String },
    date: { type: Date },
    description: { type: String },
    note: { type: Number },
    link: { type: String },
    note_user: { type: Number },
  },
  relations: {
    categories: {
      type: 'many-to-many',
      target: 'Genre',
      joinTable: true,
      cascade: true,
    },
    notes: {
      type: 'one-to-many',
      target: 'evaluation_film',
      inverseSide: 'film',
    },
  },
});

export default Movie;
