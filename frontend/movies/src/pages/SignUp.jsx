import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  //  formos reikšmės
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //  kai keiti įvesties laukus
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  //  paprasta validacija
  const validate = () => {
    const n = {};
    if (!form.name.trim()) n.name = "Įvesk vardą";
    if (!form.email.trim()) n.email = "Įvesk el. paštą";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) n.email = "Neteisingas formatas";
    if (form.password.length < 8) n.password = "Slaptažodis per trumpas";
    if (form.confirm !== form.password) n.confirm = "Slaptažodžiai nesutampa";
    return n;
  };

  //  kai spaudi registruotis
  const onSubmit = (e) => {
    e.preventDefault();
    const n = validate();
    if (Object.keys(n).length) { setErrors(n); setSubmitted(false); return; }

    setSubmitted(true);
    navigate("/login"); //  po registracijos meta į Login
  };

  return (
    <div className="signup-wrap">
      <div className="signup-card">
        <h1>Susikurk paskyrą</h1>
        <p className="subtitle">Prisijunk ir išsaugok mėgstamus filmus</p>

        {!submitted ? (
          <form onSubmit={onSubmit} noValidate>
            {/* vardas */}
            <div className={`field ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="name">Vardas</label>
              <input id="name" name="name" type="text"
                placeholder="pvz., Danielius"
                value={form.name}
                onChange={onChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* el.paštas */}
            <div className={`field ${errors.email ? "has-error" : ""}`}>
              <label htmlFor="email">El. paštas</label>
              <input id="email" name="email" type="email"
                placeholder="vardas@pastas.lt"
                value={form.email}
                onChange={onChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* slaptažodis */}
            <div className={`field ${errors.password ? "has-error" : ""}`}>
              <label htmlFor="password">Slaptažodis</label>
              <div className="password-row">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Bent 8 simboliai"
                  value={form.password}
                  onChange={onChange}
                />
                <button type="button" className="toggle" onClick={() => setShowPassword(v=>!v)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {/* patvirtinti slaptažodį */}
            <div className={`field ${errors.confirm ? "has-error" : ""}`}>
              <label htmlFor="confirm">Pakartok slaptažodį</label>
              <input id="confirm" name="confirm" type={showPassword ? "text" : "password"}
                placeholder="Pakartok"
                value={form.confirm}
                onChange={onChange}
              />
              {errors.confirm && <span className="error">{errors.confirm}</span>}
            </div>

            <button className="primary" type="submit">Registruotis</button>
            <p className="hint">Jau turi paskyrą? <a href="/login">Prisijunk</a></p>
          </form>
        ) : (
          <div className="success">Paskyra sukurta! Nukreipiama į prisijungimą…</div>
        )}
      </div>
    </div>
  );
}
