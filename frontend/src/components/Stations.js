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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Stations Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Station Code</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Division</th>
              <th className="px-4 py-2 text-left">Zone</th>
              <th className="px-4 py-2 text-left">State</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s) => (
              <tr key={s.stnCode} className="even:bg-gray-50 hover:bg-indigo-50">
                <td className="px-4 py-2">{s.stnCode}</td>
                <td className="px-4 py-2">{s.stationName}</td>
                <td className="px-4 py-2">{s.division}</td>
                <td className="px-4 py-2">{s.zone}</td>
                <td className="px-4 py-2">{s.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stations;

