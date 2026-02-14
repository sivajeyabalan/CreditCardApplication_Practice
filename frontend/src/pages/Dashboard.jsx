import { useEffect, useState } from "react";
import { getDashboardData } from "../api/applicationApi";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getErrorMessage = (err) => {
    if (!err) return "Failed to load dashboard";
    const resp = err.response?.data;
    if (!resp) return err.message || "Failed to load dashboard";
    if (typeof resp === 'string') return resp;
    if (typeof resp === 'object') return resp.message || JSON.stringify(resp);
    return String(resp);
  };

  useEffect(() => {
    const fetch = async () => {
      setError("");
      setLoading(true);
      try {
        const res = await getDashboardData();
        setData(res);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Admin 👋</p>
      </div>

      <div style={styles.cards}>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
          <h3>Total Applications</h3>
          <p style={styles.number}>{loading ? "..." : data?.totalApplications ?? 0}</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #10b981, #059669)" }}>
          <h3>Approved</h3>
          <p style={styles.number}>{loading ? "..." : data?.approved ?? 0}</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          <h3>Pending</h3>
          <p style={styles.number}>{loading ? "..." : data?.pending ?? 0}</p>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
          <h3>Rejected</h3>
          <p style={styles.number}>{loading ? "..." : data?.rejected ?? 0}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Recent Applications</h3>
        {error && <div style={{ color: "#ef4444" }}>{error}</div>}
        <div style={styles.table}>
          <div style={styles.rowHeader}>
            <span>Name</span>
            <span>Applied On</span>
            <span>Status</span>
          </div>

          {loading && <div>Loading...</div>}

          {!loading && data?.recentApplications?.length === 0 && <div style={{ padding: 12 }}>No recent applications</div>}

          {!loading && data?.recentApplications?.map((app) => (
            <div key={app.applicationNumber} style={styles.row}>
              <span>{app.fullName}</span>
              <span>{new Date(app.appliedOn).toLocaleString()}</span>
              <span style={{ color: app.status === 'APPROVED' ? '#10b981' : app.status === 'PENDING' ? '#f59e0b' : '#ef4444' }}>{app.status}</span>
            </div>
          ))}
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
