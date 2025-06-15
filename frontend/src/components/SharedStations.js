import React, { useState, useEffect } from "react";

const SharedStations = () => {
  const [zone1, setZone1] = useState("");
  const [zone2, setZone2] = useState("");
  const [zones, setZones] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/zones"); // your actual endpoint
        const data = await res.json();

        // Each item now contains both code and full name
        const formattedZones = data
          .filter((z) => z.code && z.railwayZone)
          .map((z) => ({
            code: z.code.trim(),
            name: z.railwayZone.trim(),
          }));

        setZones(formattedZones);
      } catch (error) {
        console.error("Error fetching zones:", error);
        alert("Failed to load zones.");
      }
    };

    fetchZones();
  }, []);

  const handleSearch = async () => {
    if (!zone1 || !zone2) return;

    try {
      const res = await fetch(`http://localhost:8080/api/stations/shared-stations/${zone1}/${zone2}`);
      if (!res.ok) throw new Error("Failed to fetch shared stations.");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch shared stations.");
    }
  };

  return (
    <div className="shared-stations-container">
      <style>{`
        .shared-stations-container {
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
          color: #1e3a8a;
          margin-bottom: 24px;
          font-size: 2rem
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        label {
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
          color: #1e40af;
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
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #dbeafe;
          margin: 6px 0;
          padding: 10px;
          border-radius: 8px;
          color: #1e3a8a;
        }
        
      `}</style>

      <h2>Shared Stations Between Zones</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="zone1">Zone 1:</label>
          <select id="zone1" value={zone1} onChange={(e) => setZone1(e.target.value)}>
            <option value="">Select Zone 1</option>
            {zones.map((z) => (
              <option key={z.code} value={z.code}>
                {z.code} - {z.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="zone2">Zone 2:</label>
          <select id="zone2" value={zone2} onChange={(e) => setZone2(e.target.value)}>
            <option value="">Select Zone 2</option>
            {zones.map((z) => (
              <option key={z.code} value={z.code}>
                {z.code} - {z.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} disabled={!zone1 || !zone2}>
          Find Shared Stations
        </button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Shared Stations:</h3>
          <ul>
            {results.map((station, idx) => (
              <li key={idx}>
                {station.station_code || station.stn_code} - {station.station_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SharedStations;
