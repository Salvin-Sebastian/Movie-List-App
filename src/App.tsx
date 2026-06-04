import { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { MovieList } from './components/MovieList';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { searchMovies, type MovieSearchResult } from './services/omdb';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return;
    
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setPage(1);
    
    try {
      const data = await searchMovies(searchQuery, 1);
      if (data.Response === 'False') {
        setError(data.Error || 'No movies found.');
        setMovies([]);
        setTotalResults(0);
      } else {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = async () => {
    if (!query || loading) return;
    
    const nextPage = page + 1;
    setLoading(true);
    
    try {
      const data = await searchMovies(query, nextPage);
      if (data.Response === 'True') {
        setMovies(prev => [...prev, ...(data.Search || [])]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error('Failed to load more movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = movies.length < totalResults;

  return (
    <div className="app-container">
      <header className="header">
        <h1>Cinematic Explorer</h1>
        <SearchBar onSearch={handleSearch} isLoading={loading && page === 1} />
      </header>
      
      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        
        {!error && movies.length === 0 && !loading && (
          <div className="empty-state">
            <h2>Welcome to Cinematic Explorer</h2>
            <p>Search for your favorite movies, series, or games to get started.</p>
          </div>
        )}

        {movies.length > 0 && (
          <>
            <MovieList movies={movies} onMovieClick={setSelectedMovieId} />
            
            {hasMore && (
              <button 
                className="load-more-btn" 
                onClick={loadMore} 
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Results'}
              </button>
            )}
          </>
        )}
      </main>

      {selectedMovieId && (
        <MovieDetailsModal 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}

export default App;
