// src/components/Zones.js
import React, { useEffect, useState } from "react";

function Zones() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/zones")
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error("Error fetching zones:", err));
  }, []);

  return (
    <div>
      <h2>Zones</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Code</th>
            <th>Railway Zone</th>
            <th>Headquarters</th>
            <th>Divisions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z) => (
            <tr key={z.code}>
              <td>{z.code}</td>
              <td>{z.railwayZone}</td>
              <td>{z.headquarters}</td>
              <td>{z.railwayDivisions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Zones;
