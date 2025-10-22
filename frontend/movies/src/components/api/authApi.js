// Paprastas auth per json-server
const BASE_URL = "http://localhost:3001"; // 👈 pakeista iš 3000 į 3001

// tikrina ar toks el. paštas jau yra
async function emailExists(email) {
  const r = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
  const list = await r.json();
  return Array.isArray(list) && list.length > 0;
}

// saugo prisijungimo duomenis naršyklėje
function saveSession(user) {
  const token = `token-${user.id}-${Date.now()}`;
  localStorage.setItem("auth_user", JSON.stringify(user));
  localStorage.setItem("auth_token", token);
  return token;
}

// prisijungimas
export const loginUser = async (email, password) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    const list = await resp.json();

    if (!Array.isArray(list) || list.length === 0) {
      return { ok: false, error: "INVALID_CREDENTIALS" };
    }

    const user = list[0];
    const token = saveSession(user);
    return { ok: true, user, token };
  } catch (error) {
    console.error("Login API Error:", error);
    return { ok: false, error: "SERVER" };
  }
};

// registracija
export const signupUser = async ({ firstName, lastName, email, password }) => {
  try {
    if (await emailExists(email)) {
      return { ok: false, error: "EMAIL_IN_USE" };
    }

    const resp = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const user = await resp.json();
    const token = saveSession(user);
    return { ok: true, user, token };
  } catch (error) {
    console.error("Signup API Error:", error);
    return { ok: false, error: "SERVER" };
  }
};

// atsijungimas
export const logoutUser = async () => {
  localStorage.removeItem("auth_user");
  localStorage.removeItem("auth_token");
  return { ok: true };
};

// pagalbinės funkcijos
export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem("auth_user")) || null; }
  catch { return null; }
};
export const isAuthed = () => !!localStorage.getItem("auth_token");
