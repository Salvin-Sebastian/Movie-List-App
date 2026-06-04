import React, { useEffect, useState } from 'react';
import { type MovieDetails, getMovieDetails } from '../services/omdb';
import { Loader } from './Loader';
import './MovieDetailsModal.css';

interface MovieDetailsModalProps {
  movieId: string;
  onClose: () => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(movieId);
        if (data.Response === 'False') {
          setError(data.Error || 'Failed to fetch movie details');
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!movieId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {loading ? (
          <div className="modal-loading">
            <Loader />
          </div>
        ) : error ? (
          <div className="modal-error">{error}</div>
        ) : movie ? (
          <div className="modal-body">
            <div className="modal-poster-container">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600/141419/a1a1aa?text=No+Poster'} 
                alt={movie.Title} 
                className="modal-poster" 
              />
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="modal-rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{movie.imdbRating}</span>
                </div>
              )}
            </div>
            
            <div className="modal-info">
              <h2 className="modal-title">{movie.Title}</h2>
              <div className="modal-meta">
                <span>{movie.Year}</span>
                <span className="dot">•</span>
                <span>{movie.Runtime}</span>
                <span className="dot">•</span>
                <span>{movie.Rated}</span>
              </div>
              
              <div className="modal-genres">
                {movie.Genre.split(', ').map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
              
              <div className="modal-plot">
                <h3>Plot</h3>
                <p>{movie.Plot}</p>
              </div>
              
              <div className="modal-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Director</span>
                  <span className="detail-value">{movie.Director}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Cast</span>
                  <span className="detail-value">{movie.Actors}</span>
                </div>
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div className="detail-item">
                    <span className="detail-label">Box Office</span>
                    <span className="detail-value">{movie.BoxOffice}</span>
                  </div>
                )}
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div className="detail-item full-width">
                    <span className="detail-label">Awards</span>
                    <span className="detail-value">{movie.Awards}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
