import { useState } from "react";

const TrackStatus = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const handleTrack = () => {
    setData({
      status: "Approved",
      cardType: "Platinum",
      appliedOn: "12 Feb 2026",
      creditLimit: "₹2,00,000",
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.hero}>
        <h1>Track Your Application</h1>
        <p>Stay updated on your credit card approval journey</p>
      </div>

      <div style={styles.searchSection}>
        <input
          placeholder="Enter Application ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleTrack} style={styles.button}>
          Track Now
        </button>
      </div>

      {data && (
        <div style={styles.resultCard}>
          <div style={styles.statusBadge}>{data.status}</div>

          <div style={styles.infoGrid}>
            <div>
              <h4>Card Type</h4>
              <p>{data.cardType}</p>
            </div>
            <div>
              <h4>Applied On</h4>
              <p>{data.appliedOn}</p>
            </div>
            <div>
              <h4>Approved Limit</h4>
              <p>{data.creditLimit}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "40px",
  },
  hero: {
    marginBottom: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "30px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  searchSection: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    maxWidth: "600px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#fff",
    cursor: "pointer",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    maxWidth: "800px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: "#16a34a",
    color: "#fff",
    fontWeight: "600",
    marginBottom: "20px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
};

export default TrackStatus;
