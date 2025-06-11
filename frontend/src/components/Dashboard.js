import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Train, Activity, Share2, Clock } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Zone Analytics", path: "/zone-analytics", icon: <MapPin size={32} /> },
    { title: "Station Analytics", path: "/station-analytics", icon: <Train size={32} /> },
    { title: "Train Analytics", path: "/train-analytics", icon: <Activity size={32} /> },
  ];

  return (
    <section className="dashboard-container">
      <style>{`
        .dashboard-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .dashboard-container h1 {
          font-size: 2.25rem;
          margin-bottom: 24px;
          color: #1e3a8a;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        .dashboard-button {
          background-color: rgba(147, 197, 253, 0.4);
          color: #1e3a8a;
          width: 100%;
          aspect-ratio: 1 / 1;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          backdrop-filter: blur(6px);
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .dashboard-button:hover {
          background-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        {sections.map((section, index) => (
          <button
            key={index}
            className="dashboard-button"
            onClick={() => navigate(section.path)}
          >
            {section.icon}
            {section.title}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
