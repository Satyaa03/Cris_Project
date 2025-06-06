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

  if (loading) return <p className="text-center text-gray-600">Loading trains...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Trains Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Train No</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Destination</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((t) => (
              <tr key={t.trainNo} className="even:bg-gray-50 hover:bg-indigo-50">
                <td className="px-4 py-2">{t.trainNo}</td>
                <td className="px-4 py-2">{t.trainName}</td>
                <td className="px-4 py-2">{t.sourceStationName}</td>
                <td className="px-4 py-2">{t.destinationStationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trains;

