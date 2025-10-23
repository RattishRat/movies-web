import { useNavigate } from "react-router-dom";
import "./AuthLanding.css";


export default function AuthLanding() {
  const navigate = useNavigate();

  return (
    <div className="auth-center">
      <div className="auth-card">
        <h1 className="auth-title">Pati pradžia</h1>
        <p className="auth-subtitle">Prisijunk, registruokis arba tęsk kaip svečias</p>
        <div className="actions-row">
          <button className="btn btn-secondary" onClick={() => navigate("/login")}>Prisijungti</button>
          <button className="btn btn-primary" onClick={() => navigate("/signup")}>Registruotis</button>
          <button className="btn btn-guest" onClick={() => navigate("/HomePage")}>Svečias</button>
        </div>
      </div>
    </div>
  );
}
