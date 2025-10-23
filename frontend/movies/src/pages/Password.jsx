import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Password.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // Čia siųstum slaptažodžio atkūrimo el. laišką
    navigate("/login");
  };

  return (
    <div className="auth-center">
      <div className="auth-card">
        <h1 className="auth-title">Pakeisti slaptažodį</h1>
        <p className="auth-subtitle">Įvesk el. paštą ir atsiųsime nuorodą</p>

        <form className="auth-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">El. paštas</label>
            <input
              id="email" name="email" type="email" className="input"
              placeholder="vardas@pastas.lt" value={email}
              onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <button className="btn btn-primary" type="submit">Siųsti nuorodą</button>

          <div className="actions-row" style={{marginTop:12, justifyContent:"space-between"}}>
            <Link className="link" to="/login">Grįžti į prisijungimą</Link>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/")}>
              Grįžti į pradžią
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
