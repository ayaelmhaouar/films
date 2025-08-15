import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const utilisateur = { username: "utilisateur", password: "utilisateur123" };

    if (username === utilisateur.username && password === utilisateur.password) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setErrorMessage("Nom d'utilisateur ou mot de passe invalide");
    }
  };

  return (
    <div className="login" style={{ textAlign: "center", padding: "145px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Username"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ marginBottom: "10px" }}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" style={{ marginLeft: "5px" }}>
            Remember me
          </label>
        </div>
        <button className="button" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Login;
