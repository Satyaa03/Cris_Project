import React, { useState, useEffect } from "react";

const TrainsPassingStation = () => {
  const [stationCode, setStationCode] = useState("");
  const [stations, setStations] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/stations");
        if (!response.ok) throw new Error("HTTP error " + response.status);

        const stationsData = await response.json();

        // Extract only code and name
        const stationList = stationsData
          .filter((s) => s.stnCode && s.stationName)
          .map((s) => ({
            code: s.stnCode.trim(),
            name: s.stationName.trim(),
          }));

        setStations(stationList);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        alert("Failed to load station codes.");
      }
    };

    fetchStations();
  }, []);

  const handleSearch = async () => {
    if (!stationCode) return;

    try {
      const url = `http://localhost:8080/api/stations/trains-passing/${stationCode}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching trains.");
    }
  };

  return (
    <div className="trains-passing-container">
      <style>{`
        .trains-passing-container {
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
        .result {
          margin-top: 24px;
          font-size: 1.25rem;
          color: #1e40af;
          text-align: center;
        }
      `}</style>

      <h2>Trains Passing Through a Station</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="stationCode">Select Station:</label>
          <select
            id="stationCode"
            value={stationCode}
            onChange={(e) => setStationCode(e.target.value)}
          >
            <option value="">Select a station</option>
            {stations.map((station) => (
              <option key={station.code} value={station.code}>
                {station.code} - {station.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} disabled={!stationCode}>
          Find Trains
        </button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Trains Passing Through {stationCode}:</h3>
          <ul>
            {results.map((train, idx) => (
              <li key={idx}>
                {train.train_no} - {train.train_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrainsPassingStation;
