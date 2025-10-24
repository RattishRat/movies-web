import React, { useEffect, useState } from "react";
import "./Bookmarks.css";


export default function Bookmarks({ page = "bookmarks" }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.filter((item) => item.category === "Movie"));
        setSeries(json.filter((item) => item.category === "TV Series"));
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setMovies((prev) =>
      prev.map((m) => ({ ...m, isBookmarked: saved[m.title] || false }))
    );
    setSeries((prev) =>
      prev.map((s) => ({ ...s, isBookmarked: saved[s.title] || false }))
    );
  }, []);

  // Toggle bookmark
  const toggleBookmark = (item, type) => {
    if (type === "Movie") {
      setMovies((prev) =>
        prev.map((m) =>
          m.title === item.title ? { ...m, isBookmarked: !m.isBookmarked } : m
        )
      );
    } else {
      setSeries((prev) =>
        prev.map((s) =>
          s.title === item.title ? { ...s, isBookmarked: !s.isBookmarked } : s
        )
      );
    }

    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    saved[item.title] = !item.isBookmarked;
    localStorage.setItem("bookmarks", JSON.stringify(saved));
  };

  const filteredMovies = movies
    .filter((m) => m.isBookmarked)
    .filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredSeries = series
    .filter((s) => s.isBookmarked)
    .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderCard = (item, type) => {
    // Nustatome spalvą pagal puslapį
    const color = page === "bookmarks" ? "#ff5555" : "#1e90ff";

    return (
      <div key={item.title} className="bookmark-card">
        <div className="thumb-container">
          <img
            src={item.thumbnail?.regular?.large}
            alt={item.title}
            className="bookmark-thumb"
          />
          <div className="play-overlay">
            <div className="play-button">
              <img src="../assets/icon-play.svg" alt="Play icon" />
              <span>Play</span>
            </div>
          </div>
        </div>

        <div
          className={`bookmark-icon`}
          onClick={() => toggleBookmark(item, type)}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill={item.isBookmarked ? color : "transparent"}
            stroke={item.isBookmarked ? color : "#ff5555"}
            strokeWidth="2"
          >
            <path d="M6 4v17l6-5.5L18 21V4z" />
          </svg>
        </div>

        <div className="bookmark-info">
          <p className="meta">
            {item.year} • {item.category} • {item.rating}
          </p>
          <h3>{item.title}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="bookmarks-page">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for bookmarked shows"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="bookmarks-section">
        <h2>Bookmarked Movies</h2>
        <div className="bookmark-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => renderCard(movie, "Movie"))
          ) : (
            <p className="empty-msg">No bookmarked movies found.</p>
          )}
        </div>
      </div>

      <div className="bookmarks-section">
        <h2>Bookmarked TV Series</h2>
        <div className="bookmark-grid">
          {filteredSeries.length > 0 ? (
            filteredSeries.map((s) => renderCard(s, "TV Series"))
          ) : (
            <p className="empty-msg">No bookmarked TV series found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
