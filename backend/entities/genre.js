import typeorm from 'typeorm';

const Genre = new typeorm.EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    name: { type: String },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      inverseSide: 'categories',
    },
  },
});

export default Genre;
