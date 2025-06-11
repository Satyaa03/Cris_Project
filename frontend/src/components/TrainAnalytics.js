import React from "react";
import { useNavigate } from "react-router-dom";
import { Share2, Link, History } from "lucide-react";

const TrainAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="train-analytics-container">
      <style>{`
        .train-analytics-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .train-analytics-container h2 {
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

      <h2>Train Analytics</h2>

      <div className="card-grid">
        <button className="card-button" onClick={() => navigate("/inter-zone-trains")}>
          <Share2 size={32} />
          Inter-Zone Trains
        </button>

        <button className="card-button" onClick={() => navigate("/trains-passing-stations")}>
          <Link size={32} />
          Trains Passing Through a Specific Station
        </button>

        <button className="card-button" onClick={() => navigate("/train-timeline")}>
          <History size={32} />
          Train Timeline Through a Zone
        </button>
      </div>
    </div>
  );
};

export default TrainAnalytics;