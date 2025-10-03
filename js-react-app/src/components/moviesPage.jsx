import React, { useState, useEffect } from 'react';
import { movieService } from '../api/rest/movieService';
import MovieRecord from './movieRecord';
import CreateMovieForm from './createMovieForm';
import {
  Alert,
  Button,
  ButtonGroup,
  Collection,
  FormGroup,
  Label,
  TextInput,
} from '@trussworks/react-uswds';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await movieService.getAll();
      setMovies(data);
    } catch (error) {
      setError('Failed to load movies: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await movieService.create({
        originalTitle: title,
        title: title,
        releaseDate: new Date('2000-01-01').toISOString(),
        synopsis: synopsis,
        runtime: 0,
        country: '',
        budget: 0,
        mainCast: [],
      });
      await loadMovies();

      setTitle('');
      setSynopsis('');
    } catch (error) {
      setError(`Failed to create movie: ` + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchTitle) {
        const results = await movieService.findByTitle(searchTitle);
        setMovies(results);
      } else {
        await loadMovies();
      }
    } catch (error) {
      setError('Search failed: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert type="error" heading="Error" headingLevel="h4">
          {error}
        </Alert>
      )}

      <div className="margin-bottom-6">
        <FormGroup>
          <div className="display-flex flex-align-end">
            <div className="flex-fill margin-right-1">
              <Label htmlFor="search">Search Movies</Label>
              <TextInput
                id="search"
                name="search"
                type="text"
                placeholder="Search by movie title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <ButtonGroup>
              <Button type="button" onClick={handleSearch} disabled={loading}>
                Search
              </Button>
              <Button
                type="button"
                onClick={loadMovies}
                disabled={loading}
                outline
              >
                Clear Search
              </Button>
            </ButtonGroup>
          </div>
        </FormGroup>
      </div>

      <CreateMovieForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        synopsis={synopsis}
        setSynopsis={setSynopsis}
        loading={loading}
      />

      <div className="margin-top-6">
        <h2 className="font-heading-xl margin-bottom-3">Movie List</h2>
        <Collection>
          {movies.map((movie) => (
            <MovieRecord key={movie.title} movie={movie} />
          ))}
        </Collection>
      </div>
    </div>
  );
};

export default MoviesPage;
