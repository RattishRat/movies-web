import React, { useEffect, useState } from "react";
import "./Bookmarks.css";

export default function Bookmarks() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.filter((item) => item.category === "Movie"));
        setSeries(json.filter((item) => item.category === "TV Series"));
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setMovies((prev) =>
      prev.map((m) => ({ ...m, isBookmarked: savedBookmarks[m.title] || m.isBookmarked }))
    );
    setSeries((prev) =>
      prev.map((s) => ({ ...s, isBookmarked: savedBookmarks[s.title] || s.isBookmarked }))
    );
  }, []);

  
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

    
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    savedBookmarks[item.title] = !item.isBookmarked;
    localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
  };

  
  const filteredMovies = movies
    .filter((m) => m.isBookmarked)
    .filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredSeries = series
    .filter((s) => s.isBookmarked)
    .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  
  const renderCard = (item, type) => (
    <div key={item.title} className="bookmark-card">
      <img
        src={item.thumbnail.regular.large}
        alt={item.title}
        className="bookmark-thumb"
      />
      <div
        className={`bookmark-icon ${item.isBookmarked ? "bookmarked" : ""}`}
        onClick={() => toggleBookmark(item, type)}
      >
        
       <img
            src= "../assets/icon-nav-bookmark.svg" alt="bookmark icon"
       />
      </div>
      <div className="bookmark-info">
        <p className="meta">
          {item.year} • {item.category} • {item.rating}
        </p>
        <h3>{item.title}</h3>
      </div>
    </div>
  );

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
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => renderCard(movie, "Movie"))
            : <p className="empty-msg">No bookmarked movies found.</p>}
        </div>
      </div>

      <div className="bookmarks-section">
        <h2>Bookmarked TV Series</h2>
        <div className="bookmark-grid">
          {filteredSeries.length > 0
            ? filteredSeries.map((s) => renderCard(s, "TV Series"))
            : <p className="empty-msg">No bookmarked TV series found.</p>}
        </div>
      </div>
    </div>
  );
}