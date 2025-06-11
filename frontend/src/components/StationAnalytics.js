import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, RailSymbol, Link } from "lucide-react";

const StationAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="station-analytics-container">
      <style>{`
        .station-analytics-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .station-analytics-container h2 {
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

      <h2>Station Analytics</h2>

      <div className="card-grid">
        <button className="card-button" onClick={() => navigate("/common-stations")}>
          <BarChart size={32} />
          Common Stations Between Two Divisions
        </button>

        <button className="card-button" onClick={() => navigate("/shared-stations")}>
          <RailSymbol size={32} />
          Shared Stations for Trains Between Two Zones
        </button>

        <button className="card-button" onClick={() => navigate("/trains-passing-stations")}>
          <Link size={32} />
          Trains Passing Through a Specific Station
        </button>
      </div>
    </div>
  );
};

export default StationAnalytics;