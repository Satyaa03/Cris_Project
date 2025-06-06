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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Zones Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Railway Zone</th>
              <th className="px-4 py-2 text-left">Headquarters</th>
              <th className="px-4 py-2 text-left">Divisions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.code} className="even:bg-gray-50 hover:bg-indigo-50">
                <td className="px-4 py-2">{z.code}</td>
                <td className="px-4 py-2">{z.railwayZone}</td>
                <td className="px-4 py-2">{z.headquarters}</td>
                <td className="px-4 py-2">{z.railwayDivisions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Zones;
