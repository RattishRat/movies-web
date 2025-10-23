import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import TVseries from "./pages/TVseries";
import Bookmarks from "./pages/Bookmarks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AuthLanding from "./pages/AuthLanding";

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AuthLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/TVseries" element={<TVseries />} />
            <Route path="/Bookmarks" element={<Bookmarks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
