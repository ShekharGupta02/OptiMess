import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>OptiMess</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;