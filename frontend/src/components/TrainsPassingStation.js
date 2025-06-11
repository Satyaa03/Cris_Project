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
          background: #f0f9ff;
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
