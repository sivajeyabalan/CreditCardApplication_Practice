import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      {/* Left Branding Section */}
      <div style={styles.left}>
        <div>
          <h1 style={styles.brandTitle}>ABC Bank</h1>
          <p style={styles.brandSubtitle}>
            Smart Credit Solutions for a Digital Future
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to access your dashboard</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email address"
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button}>
              Login →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Inter, sans-serif",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding: "40px",
  },
  brandTitle: {
    fontSize: "40px",
    fontWeight: "700",
  },
  brandSubtitle: {
    marginTop: "15px",
    fontSize: "16px",
    opacity: 0.9,
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    width: "400px",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#6b7280",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;
