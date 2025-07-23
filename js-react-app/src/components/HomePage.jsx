import React from 'react';
import MoviesPage from './moviesPage';

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-custom-bg">
      <div className="container mx-auto px-4 py-6">
        <MoviesPage />
      </div>
    </div>
  );
}

export default HomePage;
