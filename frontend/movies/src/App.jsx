import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //  maršrutų valdymui
import Sidebar from './components/Sidebar'; //  šoninė navigacija (visada rodoma)

// 👇 puslapiai
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVseries from './pages/TVseries';
import Bookmarks from './pages/Bookmarks';
import SignUp from './pages/SignUp';     // registracija
import Login from './pages/Login';       // prisijungimas
import AuthLanding from './pages/AuthLanding'; // pasirinkimo ekranas

export default function App() {
  return (
    //  Router sako React'ui, kad turime kelis puslapius (Routes)
    <Router>
      <div className="app-layout">
        <Sidebar /> {/*  šoninė juosta visada matoma */}
        <main className="main-content">
          <Routes>
            {/* Pagrindinis (root) - čia rodome Login/Register pasirinkimą */}
            <Route path="/" element={<AuthLanding />} />

            {/* Auth puslapiai */}
            <Route path="/login" element={<Login />} />   {/* Prisijungimas */}
            <Route path="/signup" element={<SignUp />} /> {/* Registracija */}

            {/* Kiti puslapiai */}
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
