import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "ft_users";
const AUTH_KEY = "ft_auth";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function sanitize(value) {
  return String(value).replace(/[<>]/g, "").trim();
}

function createToken() {
  return `ft_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(AUTH_KEY));
      if (!saved) return;

      if (saved.expiresAt && Date.now() > saved.expiresAt) {
        sessionStorage.removeItem(AUTH_KEY);
        return;
      }

      setUser(saved.user);
    } catch {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const timer = setInterval(() => {
      try {
        const saved = JSON.parse(sessionStorage.getItem(AUTH_KEY));
        if (saved?.expiresAt && Date.now() > saved.expiresAt) {
          logout();
        }
      } catch {
        logout();
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [user]);

  const isAuthenticated = !!user;

  function register({ username, email, password, role = "regular" }) {
    const cleanUsername = sanitize(username);
    const cleanEmail = sanitize(email).toLowerCase();

    if (!cleanUsername || !cleanEmail || !password) {
      throw new Error("All fields are required.");
    }

    const users = readUsers();
    const exists = users.some(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() || u.email === cleanEmail
    );

    if (exists) {
      throw new Error("User already exists.");
    }

    const safeRole = role === "admin" ? "admin" : "regular";

    const newUser = {
      username: cleanUsername,
      email: cleanEmail,
      password,
      role: safeRole,
    };

    writeUsers([...users, newUser]);
    return newUser;
  }

  function login({ usernameOrEmail, password }) {
    const cleanValue = sanitize(usernameOrEmail).toLowerCase();

    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email === cleanValue ||
        u.username.toLowerCase() === cleanValue
    );

    if (!found || found.password !== password) {
      throw new Error("Invalid credentials.");
    }

    const authUser = {
      username: found.username,
      email: found.email,
      role: found.role,
      token: createToken(),
    };

    const payload = {
      user: authUser,
      expiresAt: Date.now() + 1000 * 60 * 60 * 2,
    };

    sessionStorage.setItem(AUTH_KEY, JSON.stringify(payload));
    setUser(authUser);
    return authUser;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
  }

  function isAdmin() {
    return user?.role === "admin";
  }

  function getAuthHeader() {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      register,
      login,
      logout,
      isAdmin,
      getAuthHeader,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}