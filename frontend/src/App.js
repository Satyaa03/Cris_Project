import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaTrain, FaMapMarkedAlt, FaNetworkWired } from 'react-icons/fa';
import Trains from './components/Trains';
import Stations from './components/Stations';
import Zones from './components/Zones';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #ffffff;
          color: #6b7280;
        }

        nav {
          position: sticky;
          top: 0;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40px;
          height: 64px;
          z-index: 100;
        }

        .logo {
          font-weight: 700;
          font-size: 1.8rem;
          color: #111827;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        a.nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 1.125rem;
          color: #6b7280;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 12px;
        }

        a.nav-link:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        a.nav-link.active {
          color: #111827;
          font-weight: 700;
          box-shadow: inset 0 -2px 0 0 #111827;
        }

        .hero {
          text-align: center;
          padding: 80px 20px 40px;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 20px;
        }

        .hero img {
          height: 200px;
          margin-bottom: 32px;
        }

        .signin-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .content-card {
          background: #fff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
          color: #374151;
          min-height: 60vh;
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 16px;
          }
          .nav-links {
            gap: 16px;
          }
          .hero h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>

      <Router>
        <nav>
          <div className="logo">RailwayApp</div>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
            <NavLink to="/trains" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaTrain /> Trains
            </NavLink>
            <NavLink to="/stations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaMapMarkedAlt /> Stations
            </NavLink>
            <NavLink to="/zones" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaNetworkWired /> Zones
            </NavLink>
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Sign In
            </NavLink>
          </div>
        </nav>

        <main role="main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="hero">
                    <h1>Welcome to Indian Railways</h1>
                    <img src="https://logowik.com/content/uploads/images/indian-railways3115.jpg" alt="Indian Railways Logo" />
                    <div className="signin-wrapper">
                      <SignIn />
                    </div>
                  </section>
                </>
              }
            />

            <Route
              path="/trains"
              element={
                <section className="content-card">
                  <Trains />
                </section>
              }
            />
            <Route
              path="/stations"
              element={
                <section className="content-card">
                  <Stations />
                </section>
              }
            />
            <Route
              path="/zones"
              element={
                <section className="content-card">
                  <Zones />
                </section>
              }
            />
            <Route
              path="/sign-in"
              element={
                <section className="content-card">
                  <SignIn />
                </section>
              }
            />
            <Route
              path="*"
              element={
                <section className="content-card">
                  <h2>Welcome! Select a page from the navigation above.</h2>
                </section>
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

