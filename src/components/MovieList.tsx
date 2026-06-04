import React from 'react';
import { MovieCard } from './MovieCard';
import { type MovieSearchResult } from '../services/omdb';
import './MovieList.css';

interface MovieListProps {
  movies: MovieSearchResult[];
  onMovieClick: (id: string) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div 
          key={`${movie.imdbID}-${index}`} 
          className="movie-grid-item"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <MovieCard movie={movie} onClick={onMovieClick} />
        </div>
      ))}
    </div>
  );
};
