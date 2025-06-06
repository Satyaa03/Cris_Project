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
    <>
      <div className="zones-container">
        <h2 className="zones-title">Stations Report</h2>
        <div className="table-wrapper">
          <table className="zones-table">
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
                <tr key={s.stnCode} className="zone-row">
                  <td>{s.stnCode}</td>
                  <td>{s.stationName}</td>
                  <td>{s.division}</td>
                  <td>{s.zone}</td>
                  <td>{s.state}</td>
                </tr>
              ))}
              {stations.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No stations data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .zones-container {
              max-width: 900px;
              margin: 2rem auto;
              background: #ffffff;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #1e40af;
            }
            .zones-title {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 1.5rem;
              letter-spacing: 0.05em;
              color: #1e40af;
            }
            .table-wrapper {
              overflow-x: auto;
              border-radius: 8px;
              border: 1px solid #93c5fd;
              box-shadow: inset 0 0 6px #bfdbfe;
            }
            .zones-table {
              width: 100%;
              border-collapse: collapse;
              min-width: 600px;
              font-size: 0.9rem;
            }
            .zones-table thead {
              background-color: #bfdbfe;
              color: #1e40af;
              text-transform: uppercase;
              font-weight: 600;
            }
            .zones-table th,
            .zones-table td {
              padding: 0.75rem 1rem;
              border-bottom: 1px solid #93c5fd;
              text-align: left;
              vertical-align: middle;
            }
            .zone-row:nth-child(even) {
              background-color: #e0efff;
            }
            .zone-row:hover {
              background-color: #bfdbfe;
              transition: background-color 0.25s ease;
              cursor: pointer;
            }
            .no-data {
              padding: 2rem;
              text-align: center;
              color: #64748b;
              font-style: italic;
            }
            @media (max-width: 640px) {
              .zones-container {
                padding: 1rem;
              }
              .zones-table {
                font-size: 0.8rem;
                min-width: unset;
              }
              .zones-table th,
              .zones-table td {
                padding: 0.5rem;
              }
            }
          `,
        }}
      />
    </>
  );
}

export default Stations;

