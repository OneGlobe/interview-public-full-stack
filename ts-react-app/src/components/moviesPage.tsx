import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { movieService } from '../api/rest/movieService';
import MovieRecord from './movieRecord';
import CreateMovieForm from './createMovieForm';
import { Button } from '@headlessui/react';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      await movieService.create({ originalTitle: title, title: title, releaseDate: new Date('2000-01-01').toISOString(), synopsis: synopsis, runtime: 0, country: '', budget: 0, mainCast: [] });
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
    <div className="p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by movie title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <Button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded data-[hover]:bg-green-600"
            disabled={loading}
          >
            Search
          </Button>
          <Button
            onClick={loadMovies}
            className="bg-gray-500 text-white px-4 py-2 rounded data-[hover]:bg-gray-600"
            disabled={loading}
          >
            Clear Search
          </Button>
        </div>
      </div>
      <CreateMovieForm 
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        synopsis={synopsis}
        setSynopsis={setSynopsis}
        loading={loading}
        />
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Movie List</h2>
        {movies.map((movie) => (
          <MovieRecord key={movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;