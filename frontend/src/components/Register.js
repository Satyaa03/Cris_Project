import React, { useState, useEffect } from 'react';

const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        // TODO: Redirect to login page or update UI
      } else if (response.status === 409) {
        alert("Username or email already exists.");
      } else {
        alert("Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleRefreshCaptcha = () => {
    setActiveCaptcha(generateCaptcha());
    setCaptcha('');
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
        input[type="password"],
        input[type="email"] {
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

      <h2>Register</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
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
            <button type="button" className='refresh-button' onClick={handleRefreshCaptcha}>Refresh</button>
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
