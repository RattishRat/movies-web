import { NavLink } from "react-router-dom"; //  kad veiktų nuorodos
import "./Sidebar.css";

//  ikonos ir avataras
import logo from "../assets/logo.svg";
import homeIcon from "../assets/icon-nav-home.svg";
import moviesIcon from "../assets/icon-nav-movies.svg";
import seriesIcon from "../assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../assets/icon-nav-bookmark.svg";
import avatar from "../assets/image-avatar.png";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* logotipas viršuje */}
      <div className="sidebar-top">
        <img src={logo} alt="movie-logo" className="sidebar-logo" />
      </div>

      {/* navigacija per puslapius */}
      <nav className="sidebar-nav">
        <NavLink to="/HomePage" end title="Home">
          <img src={homeIcon} alt="home" />
        </NavLink>
        <NavLink to="/Movies" end title="Movies">
          <img src={moviesIcon} alt="movies" />
        </NavLink>
        <NavLink to="/TVseries" end title="TV series">
          <img src={seriesIcon} alt="tv-series" />
        </NavLink>
        <NavLink to="/Bookmarks" end title="Bookmarks">
          <img src={bookmarkIcon} alt="bookmarks" />
        </NavLink>
        {/*  Login / Register nuorodų čia nėra */}
      </nav>

      {/* vartotojo avataras apačioje */}
      <div className="sidebar-bottom">
        <img src={avatar} alt="user avatar" className="sidebar-avatar" />
      </div>
    </aside>
  );
}
