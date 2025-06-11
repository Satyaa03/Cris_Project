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
          border: 1px solid #cbd5e1;
          margin-bottom: 20px;
          font-size: 1rem;
        }
        button {
          background-color: #1d4ed8;
          color: white;
          padding: 12px;
          font-size: 1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }
        button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
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
