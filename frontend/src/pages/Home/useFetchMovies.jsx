import { useEffect, useState } from 'react';

export function useFetchMovies() {
  const [movie, setmovie] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular', options)
      .then((response) => response.json())
      .then((response) => setmovie(response.results))
      .catch((err) => console.error(err));
  }, []);

  return movie;
}
