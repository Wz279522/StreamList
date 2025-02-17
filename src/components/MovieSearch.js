import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // Function to fetch movie data
  const searchMovies = async () => {
    if (!query) return;
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY, // Using the API key from .env
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div className="movie-search-container">
      <h2>Search for a Movie</h2>
      <input
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width="150"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
