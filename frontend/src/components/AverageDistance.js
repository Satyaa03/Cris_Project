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
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 24px;
          color: #1e3a8a;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        label {
          font-weight: 600;
          color: #1e40af;
          display: block;
          margin-bottom: 6px;
        }
        select {
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background-color: #e0f2fe;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        button {
          background-color: #1e3a8a;
          color: white;
          padding: 12px;
          font-size: 1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s ease;
          margin-top: 16px;
        }
        button:hover:not(:disabled) {
          background-color: #3b82f6;
        }
        button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
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
