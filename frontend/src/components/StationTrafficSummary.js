import React, { useState } from "react";

const StationTrafficSummary = () => {
  const [stationCode, setStationCode] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!stationCode) return;

    setError("");
    setLoading(true);

    try {
      const url = `http://localhost:8080/api/stations/traffic-summary/${stationCode}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setResults([]);
        setError("No trains found for this station.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch station traffic summary.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "-";
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div className="station-traffic-summary-container">
      <style>{`
        .station-traffic-summary-container {
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
          margin-bottom: 8px;
          color: #1e40af;
        }
        input {
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
        button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        .error {
          color: #dc2626;
          margin-top: 16px;
          text-align: center;
        }
        .loading {
          text-align: center;
          color: #2563eb;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #e0f2fe;
          margin: 6px 0;
          padding: 12px;
          border-radius: 8px;
          color: #1e3a8a;
          font-size: 1rem;
          line-height: 1.6;
        }
        strong {
          color: #0f172a;
        }
      `}</style>

      <h2>Station Traffic Summary</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="stationCode">Station Code:</label>
          <input
            id="stationCode"
            type="text"
            value={stationCode}
            onChange={(e) => setStationCode(e.target.value.toUpperCase())}
            placeholder="Enter station code (e.g., NDLS)"
          />
        </div>

        <button onClick={handleSearch} disabled={!stationCode || loading}>
          {loading ? "Loading..." : "Get Traffic Summary"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="results">
          <h3 style={{ marginTop: "24px", color: "#1e3a8a" }}>Train Summary:</h3>
          <ul>
            {results.map((row, idx) => (
              <li key={idx}>
                <strong>{row.train_no}</strong> - {row.train_name}<br />
                Arrival: {formatTime(row.arrival_time)}, Departure: {formatTime(row.departure_time)}<br />
                Route: {row.source_station} ➝ {row.destination_station}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StationTrafficSummary;
