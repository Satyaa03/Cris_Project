import React, { useState, useEffect } from "react";

const CommonStations = () => {
  const [divisionA, setDivisionA] = useState("");
  const [divisionB, setDivisionB] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/stations");
        const stations = await response.json();

        // Extract unique division codes
        const allDivisions = stations.map((station) => station.division?.trim());
        const uniqueDivisions = [...new Set(allDivisions.filter(Boolean))];

        setDivisions(uniqueDivisions);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        alert("Failed to load divisions.");
      }
    };

    fetchDivisions();
  }, []);

  const handleSearch = async () => {
    if (!divisionA || !divisionB) return;

    try {
      const url = `http://localhost:8080/api/stations/common/${divisionA}/${divisionB}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching common stations.");
    }
  };

  return (
    <div className="common-stations-container">
      <style>{`
        .common-stations-container {
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
          color: #1e3a8a;
          margin-bottom: 24px;
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
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #e0f2fe;
          margin: 6px 0;
          padding: 10px;
          border-radius: 8px;
          color: #1e3a8a;
        }
      `}</style>

      <h2>Common Stations Between Divisions</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="divisionA">Division A:</label>
          <select
            id="divisionA"
            value={divisionA}
            onChange={(e) => setDivisionA(e.target.value)}
          >
            <option value="">Select Division A</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="divisionB">Division B:</label>
          <select
            id="divisionB"
            value={divisionB}
            onChange={(e) => setDivisionB(e.target.value)}
          >
            <option value="">Select Division B</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} disabled={!divisionA || !divisionB}>
          Find Common Stations
        </button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Common Stations:</h3>
          <ul>
            {results.map((station, idx) => (
              <li key={idx}>
                {station.station_code} - {station.station_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommonStations;
