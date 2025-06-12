import React, { useState, useEffect } from "react";

const InterZoneTrains = () => {
  const [fromZoneCode, setFromZoneCode] = useState("");
  const [toZoneCode, setToZoneCode] = useState("");
  const [zones, setZones] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/zones");
        const data = await response.json();
        setZones(data);
      } catch (err) {
        alert("Failed to load zones. Check backend.");
      }
    };
    fetchZones();
  }, []);

  const handleSearch = async () => {
    if (!fromZoneCode || !toZoneCode) return;

    try {
      const url = `http://localhost:8080/api/trains/${fromZoneCode}/trains/${toZoneCode}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      alert("Failed to fetch trains. Check backend or network.");
    }
  };

  return (
    <div className="interzone-container">
      <style>{`
        .interzone-container {
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
        }
        button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #3b82f6;
        }
        .results {
          margin-top: 24px;
        }
        .results h3 {
          color: #1e3a8a;
          margin-bottom: 12px;
        }
        .results ul {
          list-style-type: none;
          padding-left: 0;
        }
        .results li {
          padding: 8px 12px;
          background-color: #dbeafe;
          border-radius: 8px;
          margin-bottom: 8px;
          color: #1e40af;
        }
      `}</style>

      <h2>Inter-Zone Trains</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fromZone">From Zone:</label>
          <select
            id="fromZone"
            value={fromZoneCode}
            onChange={(e) => setFromZoneCode(e.target.value)}
          >
            <option value="">Select From Zone</option>
            {zones.map((zone) => (
              <option key={zone.code} value={zone.code}>
                {zone.code} - {zone.railwayZone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="toZone">To Zone:</label>
          <select
            id="toZone"
            value={toZoneCode}
            onChange={(e) => setToZoneCode(e.target.value)}
          >
            <option value="">Select To Zone</option>
            {zones.map((zone) => (
              <option key={zone.code} value={zone.code}>
                {zone.code} - {zone.railwayZone}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} disabled={!fromZoneCode || !toZoneCode}>
          Search Trains
        </button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Trains Found:</h3>
          <ul>
            {results.map((train, index) => (
              <li key={index}>
                Train No: {train.trainNo} | Train Name: {train.trainName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterZoneTrains;
