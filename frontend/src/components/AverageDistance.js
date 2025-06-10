import React, { useState, useEffect } from "react";

const AverageDistance = () => {
  const [fromZone, setFromZone] = useState("");
  const [toZone, setToZone] = useState("");
  const [zones, setZones] = useState([]);
  const [avgDistance, setAvgDistance] = useState(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/zones");
        const data = await response.json();
        setZones(data);
      } catch (error) {
        alert("Failed to load zones.");
      }
    };

    fetchZones();
  }, []);

  const handleFetchAvgDistance = async () => {
    if (!fromZone || !toZone) return;

    try {
      const url = `http://localhost:8080/api/zones/${fromZone}/distance/${toZone}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setAvgDistance(data?.average_distance ?? null);
    } catch (error) {
      alert("Failed to fetch average distance.");
    }
  };

  return (
    <div className="avg-distance-container">
      <style>{`
        .avg-distance-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background: #f9fafb;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }
        h2 {
          text-align: center;
          color: #1e3a8a;
          margin-bottom: 24px;
        }
        label {
          font-weight: bold;
          color: #334155;
          display: block;
          margin-bottom: 8px;
        }
        select {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background: #eef2ff;
        }
        button {
          width: 100%;
          padding: 12px;
          background-color: #1d4ed8;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #2563eb;
        }
        .result {
          margin-top: 24px;
          font-size: 1.25rem;
          color: #1e40af;
          text-align: center;
        }
      `}</style>

      <h2>Average Travel Distance</h2>

      <label htmlFor="fromZone">From Zone:</label>
      <select
        id="fromZone"
        value={fromZone}
        onChange={(e) => setFromZone(e.target.value)}
      >
        <option value="">Select From Zone</option>
        {zones.map((zone) => (
          <option key={zone.code} value={zone.code}>
            {zone.code} - {zone.railwayZone}
          </option>
        ))}
      </select>

      <label htmlFor="toZone">To Zone:</label>
      <select
        id="toZone"
        value={toZone}
        onChange={(e) => setToZone(e.target.value)}
      >
        <option value="">Select To Zone</option>
        {zones.map((zone) => (
          <option key={zone.code} value={zone.code}>
            {zone.code} - {zone.railwayZone}
          </option>
        ))}
      </select>

      <button onClick={handleFetchAvgDistance} disabled={!fromZone || !toZone}>
        Calculate Average Distance
      </button>

      {avgDistance !== null && (
        <div className="result">
          Average Distance: <strong>{avgDistance.toFixed(2)} km</strong>
        </div>
      )}
    </div>
  );
};

export default AverageDistance;
