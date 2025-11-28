import React, { useState, useEffect } from "react";

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch health status:", err);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <>
      <style>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
        }

        .card {
          background: white;
          padding: 48px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .title {
          font-size: 48px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: 18px;
          color: #4b5563;
          margin-bottom: 32px;
        }

        .status {
          margin-top: 32px;
        }

        .status-item {
          font-weight: 600;
          margin-bottom: 12px;
        }

        .green { color: #16a34a; }
        .yellow { color: #ca8a04; }
        .red { color: #dc2626; }
        .blue { color: #2563eb; }

        .endpoint {
          font-size: 14px;
          color: #6b7280;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .tech-box {
          margin-top: 32px;
          padding: 16px;
          background: #dbeafe;
          border-radius: 10px;
        }

        .tech-text {
          font-size: 14px;
          color: #374151;
        }
      `}</style>

      <div className="app-container">
        <div className="card">
          <h1 className="title">🏙️ Urban Nexus - Boilerplate</h1>
          <p className="subtitle">AI-Powered Urban Governance Platform</p>

          <div className="status">
            <div className="status-item green">
              ✅ Frontend Running (Vite + React)
            </div>

            {loading ? (
              <div className="status-item yellow">
                🔄 Checking backend connection...
              </div>
            ) : healthStatus ? (
              <>
                <div className="status-item green">✅ Backend Connected</div>
                <div className="status-item blue">
                  🗄️ {healthStatus.database || "PostgreSQL"}
                </div>
              </>
            ) : (
              <div className="status-item red">❌ Backend Disconnected</div>
            )}

            <div className="endpoint">API Endpoint: {apiUrl}</div>
          </div>

          <div className="tech-box">
            <p className="tech-text">
              <strong>Tech Stack:</strong> React (Vite) + Node.js + PostgreSQL +
              Python AI
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
