const Dashboard = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Admin 👋</p>
      </div>

      <div style={styles.cards}>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
          <h3>Total Applications</h3>
          <p style={styles.number}>1,240</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #10b981, #059669)" }}>
          <h3>Approved</h3>
          <p style={styles.number}>980</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          <h3>Pending</h3>
          <p style={styles.number}>180</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
          <h3>Rejected</h3>
          <p style={styles.number}>80</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Recent Applications</h3>
        <div style={styles.table}>
          <div style={styles.rowHeader}>
            <span>Name</span>
            <span>Card Type</span>
            <span>Status</span>
          </div>

          <div style={styles.row}>
            <span>Sharma</span>
            <span>Platinum</span>
            <span style={{ color: "#10b981" }}>Approved</span>
          </div>

          <div style={styles.row}>
            <span>Anita</span>
            <span>Gold</span>
            <span style={{ color: "#f59e0b" }}>Pending</span>
          </div>

          <div style={styles.row}>
            <span>Vikram</span>
            <span>Silver</span>
            <span style={{ color: "#ef4444" }}>Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "40px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "30px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    padding: "25px",
    borderRadius: "14px",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  number: {
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "10px",
  },
  section: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  table: {
    marginTop: "20px",
  },
  rowHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontWeight: "600",
    paddingBottom: "10px",
    borderBottom: "1px solid #e5e7eb",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "12px 0",
    borderBottom: "1px solid #f3f4f6",
  },
};

export default Dashboard;
