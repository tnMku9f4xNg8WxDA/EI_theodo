import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  title: '',
  date: '',
  description: '',
  note: '',
  link: '',
};

function AddMovieForm({ onSuccessfulMovieCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    setMovieCreationError(null);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulMovieCreation();
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return (
    <div>
      <form className="add-movie-form" onSubmit={saveMovie}>
        <input
          className="add-movie-input"
          placeholder="Titre"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Date de sortie"
          value={formValues.date}
          onChange={(event) =>
            setFormValues({ ...formValues, date: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Description"
          value={formValues.description}
          onChange={(event) =>
            setFormValues({ ...formValues, description: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Note"
          value={formValues.note}
          onChange={(event) =>
            setFormValues({ ...formValues, note: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Lien image"
          value={formValues.link}
          onChange={(event) =>
            setFormValues({ ...formValues, link: event.target.value })
          }
        />
        <button className="add-movie-button" type="submit">
          Ajouter
        </button>
      </form>
      {movieCreationSuccess !== null && (
        <div className="movie-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError !== null && (
        <div className="movie-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
