import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>ABC Bank</h3>

      <nav style={styles.nav}>
        <Link style={styles.link} to="/dashboard">
          Dashboard
        </Link>
        <Link style={styles.link} to="/apply">
          Apply Card
        </Link>
        <Link style={styles.link} to="/track">
          Track Application
        </Link>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#1e293b",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    marginBottom: "15px",
  },
};

export default Sidebar;
