import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = () => {
    const n = {};
    if (!form.email.trim()) n.email = "Įvesk el. paštą";
    if (!form.password.trim()) n.password = "Įvesk slaptažodį";
    return n;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const n = validate();
    if (Object.keys(n).length) { setErrors(n); return; }

    setSubmitting(true);

    // čia paprastai siųstum į backendą
    // fetch('/api/login', { ... })

    setTimeout(() => {
      setSubmitting(false);
      navigate("/HomePage"); // demo: po login'o meta į Home
    }, 500);
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1>Prisijunk</h1>
        <p className="subtitle">Sveikas sugrįžęs 👋</p>

        <form onSubmit={onSubmit} noValidate>
          <div className={`field ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">El. paštas</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="vardas@pastas.lt"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className={`field ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Slaptažodis</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Tavo slaptažodis"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="row-between">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={onChange}
              />
              Atminti mane
            </label>
            <a className="link" href="#" onClick={(e)=>e.preventDefault()}>Pamiršai slaptažodį?</a>
          </div>

          <button className="primary" type="submit" disabled={submitting}>
            {submitting ? "Jungiama..." : "Prisijungti"}
          </button>

          <p className="hint">
            Neturi paskyros? <Link to="/signup">Registruokis</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
