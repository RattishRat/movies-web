// Importuojam React Router nuorodų komponentą
import { NavLink } from "react-router-dom";

// Importuojam CSS stilius šoninei juostai
import "./Sidebar.css";

// Importuojam visus paveikslėlius / ikonėles
import logo from "../assets/logo.svg";
import homeIcon from "../assets/icon-nav-home.svg";
import moviesIcon from "../assets/icon-nav-movies.svg";
import seriesIcon from "../assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../assets/icon-nav-bookmark.svg";
import avatar from "../assets/image-avatar.png";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Viršus – logotipas */}
      <div className="sidebar-top">
        <img src={logo} alt="movie-logo" className="sidebar-logo" />
      </div>

      {/* Navigacijos nuorodos */}
      <nav className="sidebar-nav">
        {/* Pradinis puslapis */}
        <NavLink to="/HomePage" end title="Home">
          <img src={homeIcon} alt="home" />
        </NavLink>

        {/* Filmai */}
        <NavLink to="/Movies" end title="Movies">
          <img src={moviesIcon} alt="movies" />
        </NavLink>

        {/* Serialai */}
        <NavLink to="/TVseries" end title="TV series">
          <img src={seriesIcon} alt="tv-series" />
        </NavLink>

        {/* Žymės */}
        <NavLink to="/Bookmarks" end title="Bookmarks">
          <img src={bookmarkIcon} alt="bookmarks" />
        </NavLink>

        {/* 👇 Registracijos (Sign up) nuoroda */}
        <NavLink to="/signup" end title="Sign up" className="sidebar-signup">
          <span style={{ color: "#E5E7EB", fontSize: "12px" }}>Sign&nbsp;Up</span>
        </NavLink>
      </nav>

      {/* Apačia – vartotojo avataras */}
      <div className="sidebar-bottom">
        <img src={avatar} alt="user avatar" className="sidebar-avatar" />
      </div>
    </aside>
  );
}
