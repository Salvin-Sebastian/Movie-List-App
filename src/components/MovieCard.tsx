import React from 'react';
import { type MovieSearchResult } from '../services/omdb';
import './MovieCard.css';

interface MovieCardProps {
  movie: MovieSearchResult;
  onClick: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const placeholderPoster = 'https://via.placeholder.com/300x450/141419/a1a1aa?text=No+Poster+Available';
  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : placeholderPoster;

  return (
    <div className="movie-card glass-panel" onClick={() => onClick(movie.imdbID)}>
      <div className="movie-poster-container">
        <img src={posterSrc} alt={movie.Title} className="movie-poster" loading="lazy" />
        <div className="movie-overlay">
          <span className="movie-type">{movie.Type}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" title={movie.Title}>{movie.Title}</h3>
        <span className="movie-year">{movie.Year}</span>
      </div>
    </div>
  );
};
