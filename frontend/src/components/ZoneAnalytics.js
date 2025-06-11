import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Ruler, Route } from "lucide-react";

const ZoneAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="zone-analytics-container">
      <style>{`
        .zone-analytics-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .zone-analytics-container h2 {
          font-size: 2rem;
          margin-bottom: 24px;
          color: #1e3a8a;
        }
        .card-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .card-button {
          background-color: rgba(147, 197, 253, 0.4);
          color: #1e3a8a;
          width: 100%;
          max-width: 300px;
          padding: 24px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .card-button:hover {
          background-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <h2>Zone Analytics</h2>

      <div className="card-grid">
        <button className="card-button" onClick={() => navigate("/zone-overview")}>
          <Grid size={32} />
          Zone Overview
        </button>

        <button className="card-button" onClick={() => navigate("/average-distance")}>
          <Ruler size={32} />
          Average Distance Between Zones
        </button>

        <button className="card-button" onClick={() => navigate("/train-zone-hops")}>
          <Route size={32} />
          Zone Hops for Trains
        </button>
      </div>
    </div>
  );
};

export default ZoneAnalytics;
