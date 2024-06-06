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
  },
  relations: {
    categories: {
      type: 'many-to-many',
      target: 'Genre',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Movie;
