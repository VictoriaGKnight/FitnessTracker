import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const from = location.state?.from || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!usernameOrEmail.trim() || !password.trim()) {
      setError("Please complete all fields.");
      return;
    }

    try {
      login({ usernameOrEmail, password });
      setSuccess("Login successful.");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="panel stack" style={{ maxWidth: "32rem", margin: "2rem auto" }}>
      <h1>Login</h1>

      {error ? <p className="error">{error}</p> : null}
      {success ? <p className="muted">{success}</p> : null}

      <form className="stack" onSubmit={handleSubmit}>
        <div>
          <label className="label">Username or Email</label>
          <input
            className="input"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">Login</button>
      </form>

      <p className="muted">
        Need an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}