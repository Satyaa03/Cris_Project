import React, { useEffect, useState } from "react";

const TrainTimeline = () => {
  const [zones, setZones] = useState([]);
  const [zoneCode, setZoneCode] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/zones");
        const data = await res.json();
        setZones(data);
      } catch (error) {
        alert("Failed to load zones.");
      }
    };
    fetchZones();
  }, []);

  const handleSearch = async () => {
    if (!zoneCode) return;
    try {
      const query = trainNo ? `?trainNo=${trainNo}` : "";
      const res = await fetch(`http://localhost:8080/api/trains/${zoneCode}/timeline${query}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      alert("Failed to fetch timeline.");
    }
  };

  return (
    <div className="timeline-container">
      <style>{`
        .timeline-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 700px;
          margin: 0 auto;
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
          margin-bottom: 6px;
        }
        select, input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 1rem;
          background-color: #e0f2fe;
        }
        button {
          background-color: #1e3a8a;
          color: white;
          padding: 12px;
          font-size: 1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
        }
        button:hover {
          background-color: #3b82f6;
        }
        .timeline-results {
          margin-top: 30px;
        }
        .timeline-results h3 {
          color: #1e3a8a;
          margin-bottom: 12px;
        }
        .timeline-entry {
        background: #e0f2fe; /* brighter light blue */
        border-left: 6px solid #2563eb;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 12px;
        transition: background-color 0.3s ease;
        color: #0f172a; /* darker text */
        }

        .timeline-entry:hover {
        background: #bae6fd; /* hover effect */
        }

        .timeline-entry p {
        margin: 6px 0;
        font-size: 1rem;
        color: #1e293b;
        }

        .timeline-label {
        font-weight: 600;
        color: #1e40af;
        }


      `}</style>

      <h2>Train Timeline Through a Zone</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="zone">Select Zone:</label>
          <select
            id="zone"
            value={zoneCode}
            onChange={(e) => setZoneCode(e.target.value)}
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone.code} value={zone.code}>
                {zone.code} - {zone.railwayZone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="trainNo">Train Number (optional):</label>
          <input
            id="trainNo"
            type="text"
            value={trainNo}
            onChange={(e) => setTrainNo(e.target.value)}
            placeholder="Enter Train Number"
          />
        </div>

        <button onClick={handleSearch}>Show Timeline</button>
      </form>

      {results.length > 0 && (
        <div className="timeline-results">
          <h3>Timeline Entries:</h3>
          {results.map((entry, index) => (
            <div className="timeline-entry" key={index}>
              <strong>Train:</strong> {entry.train_no} - {entry.train_name}<br />
              <strong>Station:</strong> {entry.station_code} ({entry.station_name})<br />
              <strong>Arrival:</strong> {entry.arrival_time} | <strong>Departure:</strong> {entry.departure_time}<br />
              <strong>Sequence:</strong> {entry.sequence}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainTimeline;
