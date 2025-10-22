// Importuojam React hook'us ir API funkciją
import { useState } from "react";
import { signupUser } from "../components/api/authApi";
import "./Signup.css";

export default function Signup(){
  // Reikalingos būsenos laukų reikšmėms saugoti
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");

  // Papildomos būsenos (užkrovimo indikatorius ir žinutės)
  const [loading, setLoading]     = useState(false);
  const [msg, setMsg]             = useState({ type: "", text: "" });

  // El. pašto patikros regex
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // Funkcija apskaičiuoti slaptažodžio stiprumui (0–5)
  const strengthScore = (pw)=>{
    let s=0;
    if(pw.length>=8) s++;
    if(/[A-Z]/.test(pw)) s++;
    if(/[a-z]/.test(pw)) s++;
    if(/\d/.test(pw)) s++;
    if(/[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(s,5);
  };

  // Kai vartotojas paspaudžia „Registruotis“
  const onSubmit = async (e)=>{
    e.preventDefault();              // sustabdom formos reload
    setMsg({type:"", text:""});      // išvalom pranešimus

    // ✅ Laukų validacija
    if(!firstName || !lastName){ setMsg({type:"err", text:"Įvesk vardą ir pavardę."}); return; }
    if(!emailRe.test(email)){ setMsg({type:"err", text:"Neteisingas el. pašto formatas."}); return; }
    if(password.length<8 || strengthScore(password)<3){ 
      setMsg({type:"err", text:"Slaptažodis per silpnas (min. 8 simboliai)."}); 
      return; 
    }
    if(password !== confirm){ setMsg({type:"err", text:"Slaptažodžiai nesutampa."}); return; }

    // 📨 Siunčiam duomenis į serverį
    setLoading(true);
    try {
      const res = await signupUser({ firstName, lastName, email, password });
      if(!res){ throw new Error("signup failed"); }
      setMsg({type:"ok", text:"Sėkmingai užsiregistravai! Peradresuojama..." });
      setTimeout(()=>{ window.location.href="/HomePage"; }, 1000);
    } catch(err){
      setMsg({type:"err", text:"Registracija nepavyko. Bandyk dar kartą."});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrap">
      <h1>Sukurti paskyrą</h1>

      <form onSubmit={onSubmit} className="signup-form" noValidate>
        {/* Vardas ir pavardė */}
        <div className="row">
          <label>Vardas
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Jonas" required />
          </label>
          <label>Pavardė
            <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Jonaitis" required />
          </label>
        </div>

        {/* El. paštas */}
        <label>El. paštas
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vardas@pastas.lt" required />
        </label>

        {/* Slaptažodis + stiprumo indikatorius */}
        <label>Slaptažodis
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
          <div className="pw-bar">
            <div style={{width:`${(strengthScore(password)/5)*100}%`}} />
          </div>
        </label>

        {/* Pakartoti slaptažodį */}
        <label>Pakartok slaptažodį
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" required />
        </label>

        {/* Pranešimai (sėkmė / klaida) */}
        {msg.text ? <div className={`alert ${msg.type}`}>{msg.text}</div> : null}

        {/* Pateikti */}
        <button type="submit" disabled={loading}>
          {loading ? "Siunčiama..." : "Registruotis"}
        </button>
      </form>
    </div>
  );
}
