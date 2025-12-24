import { getAuth, signOut } from "firebase/auth";

function Header() {
  const handleLogout = async () => {
    await signOut(getAuth());
  };

  return (
    <div style={styles.header}>
      <h2 style={styles.title}>Maya Stationary Mart</h2>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#1976d2",
    color: "white"
  },
  title: {
    margin: 0
  },
  logout: {
    background: "white",
    color: "#1976d2",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold"
  }
};

export default Header;
