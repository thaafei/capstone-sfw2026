import React, { useState } from "react";
import "./Home2.css"; // ادامه استفاده از همان تم
import { useNavigate } from "react-router-dom";

const domains = [
  { name: "Domain X", version: "v1.0" },
  { name: "Domain Y", version: "v2.1" },
  { name: "Domain Z", version: "v3.0" },
];

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);

  return (
    <div className="dx-bg" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* ========== SIDEBAR ========== */}
      <div
        className="dx-card"
        style={{
          width: sidebarOpen ? 260 : 60,
          transition: "0.28s",
          padding: sidebarOpen ? "16px" : "16px 6px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{ cursor: "pointer", fontSize: 24 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "⟨" : "⟩"}
        </div>

        {sidebarOpen && (
          <input
            className="dx-input"
            placeholder="Filter domains..."
            style={{ marginBottom: 12 }}
          />
        )}

        <div style={{ flex: 1, overflowY: "auto" }}>
          {domains.map((d, i) => (
            <div
              key={i}
              className="dx-side-item"
              onClick={() => setSelectedDomain(d)}
              style={{
                padding: sidebarOpen ? "10px" : "10px 0",
                cursor: "pointer",
                color: d.name === selectedDomain.name ? "var(--accent)" : "var(--text-main)",
                fontWeight: d.name === selectedDomain.name ? 600 : 400,
              }}
            >
              {sidebarOpen ? (
                <>
                  {d.name}
                  <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>{d.version}</div>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>{d.name.charAt(0)}</div>
              )}
            </div>
          ))}
        </div>

        {sidebarOpen && (
          <button
            className="dx-btn dx-btn-outline"
            onClick={() => navigate("/visualize")}
          >
            Compare Domains
          </button>
        )}
      </div>

      {/* ========== MAIN CENTER CONTENT ========== */}
      <div style={{ flex: 1, padding: "28px 34px", overflowY: "auto" }}>
        <h1 style={{ color: "var(--accent)", marginTop: 0 }}>{selectedDomain.name}</h1>

        <div className="dx-card" style={{ marginBottom: 20, padding: 18 }}>
          <h3>Package Rankings (Overall)</h3>
          <div className="dx-chart-placeholder" />
        </div>

        <div className="dx-card" style={{ padding: 18 }}>
          <h3>Category Rankings</h3>
          <div className="dx-chart-placeholder" />
        </div>
      </div>

      {/* ========== RIGHT INFO PANEL ========== */}
      <div
        className="dx-card"
        style={{
          width: 260,
          padding: 18,
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Details</h3>
        <div className="dx-info-field">
          <strong>Name:</strong> {selectedDomain.name}
        </div>
        <div className="dx-info-field">
          <strong>Version:</strong> {selectedDomain.version}
        </div>
        <div className="dx-info-field">
          <strong>Authors:</strong>
          <ul style={{ margin: "6px 0 0 16px" }}>
            <li>Unknown</li>
            <li>Unknown</li>
          </ul>
        </div>
        <div className="dx-info-field">
          <strong>Description:</strong>
          <p style={{ marginTop: 6, opacity: 0.75 }}>
            Placeholder description text about the domain.
          </p>
        </div>
        <div className="dx-info-field">
          <strong>Link:</strong> <a href="#">Not available</a>
        </div>
      </div>
    </div>
  );
};

export default Main;
