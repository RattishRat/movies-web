import React, { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Klaida kraunant data.json:", err));
  }, []);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setData((prev) =>
      prev.map((item) => ({ ...item, isBookmarked: saved[item.title] || false }))
    );
  }, []);

 
  const toggleBookmark = (item) => {
    const updated = data.map((m) =>
      m.title === item.title ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setData(updated);

    const saved = JSON.parse(localStorage.getItem("bookmarks")) || {};
    saved[item.title] = !item.isBookmarked;
    localStorage.setItem("bookmarks", JSON.stringify(saved));
  };


  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trending = filteredData.filter((item) => item.isTrending);
  const recommended = filteredData.filter((item) => !item.isTrending);


  const renderCard = (item) => (
    <div key={item.title} className="home-card">
      <div className="thumb-container">
        <img
          src={item.thumbnail?.regular?.large}
          alt={item.title}
          className="home-thumb"
        />
        <div className="play-overlay">
          <div className="play-button">
            <img src="../assets/icon-play.svg" alt="Play" />
            <span>Play</span>
          </div>
        </div>
        <div
          className={`bookmark-icon ${item.isBookmarked ? "bookmarked" : ""}`}
          onClick={() => toggleBookmark(item)}
        >
          <img src="../assets/icon-nav-bookmark.svg" alt="bookmark" />
        </div>
      </div>

      <div className="home-info">
        <p className="meta">
          {item.year} • {item.category} • {item.rating}
        </p>
        <h3>{item.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="home-section">
        <h2>Trending</h2>
        <div className="trending-scroll">
          {trending.length > 0 ? (
            trending.map((item) => (
              <div key={item.title} className="trending-card">
                <img
                  src={item.thumbnail?.trending?.large || item.thumbnail?.regular?.large}
                  alt={item.title}
                  className="trending-thumb"
                />
                <div
                  className={`bookmark-icon ${item.isBookmarked ? "bookmarked" : ""}`}
                  onClick={() => toggleBookmark(item)}
                >
                  <img src="../assets/icon-nav-bookmark.svg" alt="bookmark" />
                </div>
                <div className="trending-info">
                  <p className="meta">
                    {item.year} • {item.category} • {item.rating}
                  </p>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-msg">No trending shows found.</p>
          )}
        </div>
      </div>

      <div className="home-section">
        <h2>Recommended for you</h2>
        <div className="home-grid">
          {recommended.length > 0 ? (
            recommended.map((item) => renderCard(item))
          ) : (
            <p className="empty-msg">No recommended content found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
