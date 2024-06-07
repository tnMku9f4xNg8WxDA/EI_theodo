import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Users from './pages/Users/Users';
import Movies from './pages/Movies/Movies';
import MoviesCreate from './pages/MoviesCreate/MoviesCreate';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="moviesCreate" element={<MoviesCreate />} />
        <Route path="movies/:movieId" element={<Movies />} />
      </Routes>
    </Layout>
  );
}

export default App;
