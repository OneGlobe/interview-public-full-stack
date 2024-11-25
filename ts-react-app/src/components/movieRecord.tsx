import React from 'react';
import { Movie } from '../types';

interface MovieRecordProps {
  movie: Movie;
}

const MovieRecord: React.FC<MovieRecordProps> = ({ movie }) => {
  return (
    <div
      key={movie.title}
      className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-slate-900">{movie.title}</h3>
              <span className="text-sm text-slate-500">({movie.releaseDate})</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{movie.synopsis}</p>
          </div>
          <div className="flex items-center gap-2 sm:text-right">
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecord;