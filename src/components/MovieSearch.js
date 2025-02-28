import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate"; // Import Pagination Component
import clearSearchIcon from "../icons/Clearsearch.png"; 
import "./MovieSearch.css"; 

const MovieSearch = () => {
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("searchResults")) || []
  );
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const moviesPerPage = 5; // Number of movies per page

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    const savedResults = localStorage.getItem("searchResults");

    if (savedQuery) setQuery(savedQuery);
    if (savedResults) setMovies(JSON.parse(savedResults));
  }, []);

  const fetchMovies = async () => {
    if (!query.trim()) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();

    setMovies(data.results || []);
    localStorage.setItem("searchQuery", query);
    localStorage.setItem("searchResults", JSON.stringify(data.results || []));
    setCurrentPage(0); // Reset to first page when a new search is made
  };

  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("searchResults");
  };

  // Pagination Logic
  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = currentPage * moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchMovies}>Search</button>
        <button onClick={clearSearch} className="clear-search-button">
          <img src={clearSearchIcon} alt="Clear Search" width="20" height="20" />
        </button>
      </div>

      <div className="movies-container">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {movies.length > moviesPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(movies.length / moviesPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default MovieSearch;


