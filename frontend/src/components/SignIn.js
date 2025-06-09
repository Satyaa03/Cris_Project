import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [activeCaptcha, setActiveCaptcha] = useState('');

  useEffect(() => {
    setActiveCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captcha !== activeCaptcha) {
      alert('CAPTCHA is invalid. Please try again.');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard");
      } else if (response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Login failed, please try again.");
      }
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  };

  const handleRefreshCaptcha = () => {
    setActiveCaptcha(generateCaptcha());
    setCaptcha('');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <section className="signin-container">
      <style>{`
        .signin-container {
          background: #f0f4ff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          max-width: 400px;
          margin: 0 auto;
          text-align: left;
        }
        .signin-container h2 {
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
          margin-bottom: 6px;
          display: block;
          color: #1e40af;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 1rem;
          background-color: #e0f2fe;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #1e40af;
          background-color: #ffffff;
        }
        .captcha-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .captcha-text {
          background-color: #bfdbfe;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.125rem;
          color: #1e3a8a;
          user-select: none;
        }
        button[type="submit"] {
          background-color: #1e3a8a;
          color: white;
          padding: 12px;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        button:hover {
          background-color: #3b82f6;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
        p {
          text-align: center;
          margin-top: 16px;
        }
        .link-button {
          background: none;
          border: none;
          padding: 0;
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
          font-size: 1rem;
          font-family: inherit;
        }
        .link-button:hover {
          color: #1d4ed8;
        }
        .forgot-password-btn {
          background: none;
          border: none;
          padding: 0;
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
          font-size: 1rem;
          font-family: inherit;
        }
        .forgot-password-btn:hover {
          color: #1d4ed8;
        }
        .refresh-button {
          background-color: #facc15; /* amber-400 */
          color: #1e3a8a;
          padding: 8px 16px;
          margin-left: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .refresh-button:hover {
          background-color: #fbbf24; /* amber-300 */
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
          
      `}</style>

      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="captcha">Enter Captcha</label>
          <div className="captcha-box">
            <span className="captcha-text">{activeCaptcha}</span>
            <input
              type="text"
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleRefreshCaptcha}
              className="refresh-button"
            >
            Refresh
            </button>
          </div>
        </div>

        <button type="submit">Login</button>

        <p>
          <button
            type="button"
            onClick={() => alert('Redirecting to Forgot Password flow...')}
            className="forgot-password-btn"
          >
            Forgot Password?
          </button>
        </p>

        <p>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={handleRegisterClick}
            className="link-button"
          >
            Register here
          </button>
        </p>
      </form>
    </section>
  );
};

export default SignIn;
