import { useState } from "react";

const ApplyCard = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    income: "",
    cardType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted Successfully!");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.hero}>
        <h1>Apply for Your Dream Card</h1>
        <p>Unlock premium benefits and exclusive rewards</p>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label>Annual Income (₹)</label>
              <input
                type="number"
                name="income"
                placeholder="500000"
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Select Card Type</label>
              <select name="cardType" onChange={handleChange} required>
                <option value="">Choose Card</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Submit Application →
          </button>

        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "40px",
  },
  hero: {
    marginBottom: "30px",
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    padding: "30px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    maxWidth: "900px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default ApplyCard;
