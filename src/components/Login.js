import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title1}>Maya Stationary Mart</h2>
        <h3 style={styles.title2}>Phone Directory Login</h3>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  card: {
    width: "320px",
    padding: "24px",
    borderRadius: "8px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title1: {
    // marginBottom: "0px",
    color: "#1976d2"
  },
  title2: {
    marginTop: "0px",
    marginBottom: "20px",
    color: "#333"
  },
  input: {
    width: "93%",
    padding: "10px",
    marginBottom: "12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "14px"
  }
};

export default Login;
