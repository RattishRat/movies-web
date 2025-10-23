import { useNavigate, Link } from "react-router-dom";
import "./AuthLanding.css";

export default function AuthLanding() {
  const navigate = useNavigate(); //  leidžia perkelti vartotoją į kitą puslapį

  return (
    <div className="auth-landing-wrap">
      <div className="auth-landing-card">
        <h1>Pasirink veiksmą</h1>
        <p className="subtitle">Prisijunk arba susikurk naują paskyrą</p>

        {/* 2 mygtukai - Login ir Register */}
        <div className="actions">
          <button className="btn secondary" onClick={() => navigate("/login")}>
            Prisijungti
          </button>
          <button className="btn primary" onClick={() => navigate("/signup")}>
            Registruotis
          </button>
        </div>

        {/* mažos papildomos nuorodos */}
        <div className="tiny-links">
          <Link to="/login">Turi paskyrą? Prisijunk</Link>
          <span>•</span>
          <Link to="/signup">Naujas? Registruokis</Link>
        </div>
      </div>
    </div>
  );
}
