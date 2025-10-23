import React, { useEffect, useState } from "react";
import "./movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load data from JSON
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.filter((item) => item.category === "Movie"));
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  // Handle bookmark toggle
  const toggleBookmark = (movie) => {
    const updated = movies.map((m) =>
      m.title === movie.title ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setMovies(updated);

    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    saved[movie.title] = !movie.isBookmarked;
    localStorage.setItem("bookmarks", JSON.stringify(saved));
  };

  // Filter movies by search term
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render each movie card
  const renderCard = (movie) => {
    return (
      <div key={movie.title} className="movie-card">
        <div className="thumb-container">
          <img
            src={movie.thumbnail?.regular?.large}
            alt={movie.title}
            className="movie-thumb"
          />
          <div className="play-overlay">
            <div className="play-button">
              <img src="../assets/icon-play.svg" alt="Play icon" />
              <span>Play</span>
            </div>
          </div>
        </div>

        <div
          className={`bookmark-icon ${movie.isBookmarked ? "bookmarked" : ""}`}
          onClick={() => toggleBookmark(movie)}
        >
          <img src="../assets/icon-nav-bookmark.svg" alt="bookmark icon" />
        </div>

        <div className="movie-info">
          <p className="meta">
            {movie.year} • {movie.category} • {movie.rating}
          </p>
          <h3>{movie.title}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="movies-page">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="movies-section">
        <h2>Movies</h2>
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => renderCard(movie))
          ) : (
            <p className="empty-msg">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}