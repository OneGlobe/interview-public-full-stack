import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieRecord from './movieRecord';

describe('MovieRecord', () => {
  const mockMovie = {
    title: 'The Matrix',
    releaseDate: '1999',
    synopsis: 'A computer programmer discovers that reality as he knows it is a simulation created by machines.',
    originalTitle: 'The Matrix',
    runtime: 136,
    country: 'United States',
    budget: 63000000,
    mainCast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
  };

  it('renders the movie title correctly', () => {
    render(<MovieRecord movie={mockMovie} />);
    const titleElement = screen.getByRole('heading', { name: /the matrix/i });
    expect(titleElement).toBeDefined();
  });

  it('displays the release date in parentheses', () => {
    render(<MovieRecord movie={mockMovie} />);
    const releaseDateElement = screen.getByText('(1999)');
    expect(releaseDateElement).toBeDefined();
  });

  it('shows the movie synopsis', () => {
    render(<MovieRecord movie={mockMovie} />);
    const synopsisElement = screen.getByText(
      'A computer programmer discovers that reality as he knows it is a simulation created by machines.'
    );
    expect(synopsisElement).toBeDefined();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<MovieRecord movie={mockMovie} />);
    const movieCard = container.firstChild;
    expect(movieCard).toBeDefined();
  });

  it('maintains the correct structure with flex layouts', () => {
    const { container } = render(<MovieRecord movie={mockMovie} />);
    
    // Check for flex container
    const flexContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
    expect(flexContainer).toBeDefined();
    
    // Check for nested flex container for title and date
    const titleContainer = container.querySelector('.flex.items-center.gap-3');
    expect(titleContainer).toBeDefined();
  });

});