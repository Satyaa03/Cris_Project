// src/components/Trains.js
import React, { useEffect, useState } from "react";

function Trains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/trains")
      .then((res) => res.json())
      .then((data) => {
        setTrains(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching trains:", err));
  }, []);

  if (loading) return <p>Loading trains...</p>;

  return (
    <div>
      <h2>Trains</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Train No</th>
            <th>Name</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((t) => (
            <tr key={t.trainNo}>
              <td>{t.trainNo}</td>
              <td>{t.trainName}</td>
              <td>{t.sourceStationName}</td>
              <td>{t.destinationStationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trains;
