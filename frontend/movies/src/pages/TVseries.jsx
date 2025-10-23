import React, { useEffect, useState } from "react";
import "./TVseries.css";


export default function TVseries() {
  const [tvSeries, setTvSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load data from JSON
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setTvSeries(json.filter((item) => item.category === "TV Series"));
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  // Handle bookmark toggle
  const toggleBookmark = (series) => {
    const updated = tvSeries.map((s) =>
      s.title === series.title ? { ...s, isBookmarked: !s.isBookmarked } : s
    );
    setTvSeries(updated);

    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    saved[series.title] = !series.isBookmarked;
    localStorage.setItem("bookmarks", JSON.stringify(saved));
  };

  // Filter TV series by search term
  const filteredSeries = tvSeries.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const renderCard = (series) => (
    <div key={series.title} className="series-card">
      <div className="thumb-container">
        <img
          src={series.thumbnail?.regular?.large}
          alt={series.title}
          className="series-thumb"
        />
        <div className="play-overlay">
          <div className="play-button">
            <img src="../assets/icon-play.svg" alt="Play icon" />
            <span>Play</span>
          </div>
        </div>
        <div
          className={`bookmark-icon ${series.isBookmarked ? "bookmarked" : ""}`}
          onClick={() => toggleBookmark(series)}
        >
          <img src="../assets/icon-nav-bookmark.svg" alt="bookmark icon" />
        </div>
      </div>
      <div className="series-info">
        <p className="meta">
          {series.year} • {series.category} • {series.rating}
        </p>
        <h3>{series.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="series-page">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for TV series"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="series-section">
        <h2>TV Series</h2>
        <div className="series-grid">
          {filteredSeries.length > 0 ? (
            filteredSeries.map((series) => renderCard(series))
          ) : (
            <p className="empty-msg">No TV series found.</p>
          )}
        </div>
      </div>
    </div>
  );
}