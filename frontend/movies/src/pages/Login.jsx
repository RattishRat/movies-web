import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-center">
      <div className="auth-card">
        <h1 className="auth-title">Prisijunk</h1>
        <form>
          <input type="email" placeholder="El. paštas" />
          <input type="password" placeholder="Slaptažodis" />
          <button type="submit" className="btn btn-primary">Prisijungti</button>
        </form>
        <p className="auth-links">
          <a href="/signup">Neturi paskyros? Registruokis</a><br/>
          <a href="#">Pamiršai slaptažodį?</a>
        </p>
      </div>
    </div>
  );
}
