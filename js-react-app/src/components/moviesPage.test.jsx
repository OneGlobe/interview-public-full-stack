import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { movieService } from '../api/rest/movieService';
import MoviesPage from './moviesPage';

vi.mock('../api/rest/movieService', () => ({
  movieService: {
    getAll: vi.fn(),
    create: vi.fn(),
    findByTitle: vi.fn(),
  },
}));

describe('MoviesPage', () => {

  const mockMovies = [
    {
      id: "1",
      title: "The Shawshank Redemption",
      originalTitle: "The Shawshank Redemption",
      synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      runtime: 142,
      releaseDate: "1994-09-23",
      country: "United States",
      budget: 25000000,
      mainCast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
      id: "2",
      title: "The Dark Knight",
      originalTitle: "The Dark Knight",
      synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      runtime: 152,
      releaseDate: "2008-07-18",
      country: "United States",
      budget: 185000000,
      mainCast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (movieService.getAll).mockResolvedValue(mockMovies);
    (movieService.create).mockResolvedValue(null);
    (movieService.findByTitle).mockResolvedValue([mockMovies[0]]);
  });

  it('renders the form and list', async () => {
    render(<MoviesPage />);

    expect(screen.getByLabelText(/title/i)).toBeDefined();
    expect(screen.getByLabelText(/synopsis/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/search by movie title/i)).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(/The Dark Knight/)).toBeDefined();
      expect(screen.getByText(/The Shawshank Redemption/)).toBeDefined();
    });
  });

  it('creates a new movie successfully', async () => {
    const user = userEvent.setup();
    render(<MoviesPage />);

    await user.type(screen.getByLabelText(/title/i), 'Avengers: Endgame'); 
    await user.type(screen.getByLabelText(/synopsis/i), 'Johnson');

    await user.click(screen.getByRole('button', { name: /create movie/i }));

    expect(movieService.create).toHaveBeenCalledWith({
      budget: 0,
      country: '',
      mainCast: [],
      originalTitle: 'Avengers: Endgame',
      releaseDate: '2000-01-01T00:00:00.000Z',
      runtime: 0,
      synopsis: 'Johnson',
      title: 'Avengers: Endgame'
    });

    expect(movieService.getAll).toHaveBeenCalled();
  });

  it('displays error message when create fails', async () => {
    const user = userEvent.setup();
    (movieService.create).mockRejectedValue('API Error');

    render(<MoviesPage />);

    await user.type(screen.getByLabelText(/title/i), 'Avengers: Endgame');
    await user.type(screen.getByLabelText(/synopsis/i), 'Johnson');
    await user.click(screen.getByRole('button', { name: /create movie/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create movie: api error/i)).toBeDefined();
    });
  });

  it('handles initial load error', async () => {
    (movieService.getAll).mockRejectedValue('Load Error');

    render(<MoviesPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load movies: load error/i)).toBeDefined();
    });
  });
});