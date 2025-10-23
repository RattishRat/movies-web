import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth-center">
      <div className="auth-card">
        <h1 className="auth-title">Registracija</h1>
        <form>
          <input type="text" placeholder="Vardas" />
          <input type="email" placeholder="El. paštas" />
          <input type="password" placeholder="Slaptažodis" />
          <button type="submit" className="btn btn-primary">Sukurti paskyrą</button>
        </form>
        <p className="auth-links">
          <a href="/login">Jau turi paskyrą? Prisijunk</a>
        </p>
      </div>
    </div>
  );
}
