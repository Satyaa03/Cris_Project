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
          background: #f8fafc;
          padding: 40px;
          border-radius: 16px;
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          color: #1e3a8a;
          margin-bottom: 24px;
        }
        label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #1e40af;
        }
        select {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #93c5fd;
          margin-bottom: 20px;
          font-size: 1rem;
          background-color: #f0f9ff;
          color: #1e3a8a;
        }
        button {
          background-color: #2563eb;
          color: white;
          padding: 12px;
          font-size: 1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #1d4ed8;
        }
        button:disabled {
          background-color: #bfdbfe;
          cursor: not-allowed;
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
        .results h3 {
          margin-top: 30px;
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
