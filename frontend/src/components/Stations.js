// src/components/Stations.js
import React, { useEffect, useState } from "react";

function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/stations")
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  return (
    <div>
      <h2>Stations</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Station Code</th>
            <th>Name</th>
            <th>Division</th>
            <th>Zone</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((s) => (
            <tr key={s.stnCode}>
              <td>{s.stnCode}</td>
              <td>{s.stationName}</td>
              <td>{s.division}</td>
              <td>{s.zone}</td>
              <td>{s.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stations;
