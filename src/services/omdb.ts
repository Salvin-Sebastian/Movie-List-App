const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBApiSearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string, page: number = 1): Promise<OMDBApiSearchResponse> => {
  if (!API_KEY) {
    throw new Error('OMDB API Key is missing. Please add it to your .env file.');
  }
  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
  if (!response.ok) {
    try {
      const errorData = await response.json();
      if (errorData.Error) {
        throw new Error(errorData.Error);
      }
    } catch (e) {
      // Fallback if parsing fails
    }
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  if (!API_KEY) {
    throw new Error('OMDB API Key is missing. Please add it to your .env file.');
  }
  const response = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`);
  if (!response.ok) {
    try {
      const errorData = await response.json();
      if (errorData.Error) {
        throw new Error(errorData.Error);
      }
    } catch (e) {
      // Fallback if parsing fails
    }
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
