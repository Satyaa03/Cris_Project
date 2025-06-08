import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaTrain, FaMapMarkedAlt, FaNetworkWired } from 'react-icons/fa';
import Trains from './components/Trains';
import Stations from './components/Stations';
import Zones from './components/Zones';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


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
          /* Background image with dark overlay for readability */
          background: 
            linear-gradient(rgba(14, 30, 54, 0.7), rgba(14, 30, 54, 0.7)),
            url('https://media.istockphoto.com/id/1194091335/photo/india-maharashtra-prospective-image-of-two-indian-train-with-rail-between-them-with-gloomy.jpg?s=612x612&w=0&k=20&c=4VcaDEkW58CYGuGbmPm4ZGGeb2HO5K1y_heU3AG_EUU=')
              no-repeat center center fixed;
          background-size: cover;
          color: #cbd5e1; /* light blue-gray text on dark overlay */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        nav {
          position: sticky;
          top: 0;
          background: rgba(255 255 255 / 0.9); /* translucent white for nav */
          border-bottom: 1px solid #dbeafe; /* soft light blue border */
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 48px;
          height: 64px;
          z-index: 101;
          box-shadow: 0 1px 6px rgba(59, 130, 246, 0.1);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
        }

        .logo {
          font-weight: 700;
          font-size: 1.8rem;
          color: #1e40af; /* dark blue */
          letter-spacing: 0.02em;
          user-select: none;
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
          color: #3b82f6; /* medium blue */
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 12px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        a.nav-link:hover {
          background-color: #bfdbfe; /* lighter blue on hover */
          color: #1e40af;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
        }

        a.nav-link.active {
          color: #1e3a8a; /* darkest active blue */
          font-weight: 700;
          box-shadow: inset 0 -3px 0 0 #1e40af;
          background-color: #dbeafe;
        }

        main {
          max-width: 1140px;
          margin: 0 auto;
          padding: 48px 24px;
          min-height: calc(100vh - 64px);
          box-sizing: border-box;
        }

        .hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 48px;
        }

        .hero h1 {
          font-size: 48px;
          font-weight: 700;
          color: #e0e7ff; /* lighter blue-ish text for hero */
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          text-shadow:
            0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .hero img {
          height: auto;
          max-width: 320px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
          user-select: none;
        }

        .signin-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .content-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
          color: #1e293b; /* dark slate blue text */
          min-height: 60vh;
          margin: 32px 0;
          transition: box-shadow 0.3s ease;
        }

        .content-card:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 4px;
        }

        .content-card:hover {
          box-shadow: 0 18px 48px rgba(59, 130, 246, 0.3);
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 24px;
          }
          .nav-links {
            gap: 20px;
          }
          .hero h1 {
            font-size: 36px;
          }
          main {
            padding: 32px 16px;
          }
          .content-card {
            margin: 24px 0;
            padding: 32px 24px;
          }
          .signin-wrapper {
            margin-top: 24px;
          }
        }
      `}</style>

      <Router>
        <nav>
          <div className="logo">RailwayApp</div>
          <div className="nav-links" role="navigation" aria-label="Primary navigation">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
            <NavLink to="/trains" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaTrain aria-hidden="true" /> Trains
            </NavLink>
            <NavLink to="/stations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaMapMarkedAlt aria-hidden="true" /> Stations
            </NavLink>
            <NavLink to="/zones" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaNetworkWired aria-hidden="true" /> Zones
            </NavLink>
          </div>
        </nav>

        <main role="main">
          <Routes>
            <Route
              path="/"
              element={
                <section className="hero" tabIndex={-1}>
                  <h1>Welcome to Indian Railways</h1>
                  <img
                    src="https://logowik.com/content/uploads/images/indian-railways3115.jpg"
                    alt="Indian Railways Logo"
                    loading="lazy"
                    width="320"
                    height="200"
                  />
                  <div className="signin-wrapper">
                    <SignIn />
                  </div>
                </section>
              }
            />
            <Route
              path="/trains"
              element={
                <section className="content-card" tabIndex={0}>
                  <Trains />
                </section>
              }
            />
            <Route
              path="/stations"
              element={
                <section className="content-card" tabIndex={0}>
                  <Stations />
                </section>
              }
            />
            <Route
              path="/zones"
              element={
                <section className="content-card" tabIndex={0}>
                  <Zones />
                </section>
              }
            />
            <Route
              path="/sign-in"
              element={
                <section className="content-card" tabIndex={0}>
                  <SignIn />
                </section>
              }
            />
            <Route
              path="*"
              element={
                <section className="content-card" tabIndex={0}>
                  <h2>Welcome! Select a page from the navigation above.</h2>
                </section>
              }
            />
            <Route 
              path="/signin" 
              element={
                <SignIn />
              } 
            />
            <Route 
              path="/register" 
              element={
                <Register />
                } 
            />
            <Route 
              path="*" 
              element={
                <SignIn />
                } /> {/* default to signin */}
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

