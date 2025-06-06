import React, { useState, useEffect } from 'react';

const generateCaptcha = () => {
  // Generate a simple random string for CAPTCHA
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [activeCaptcha, setActiveCaptcha] = useState('');

  useEffect(() => {
    setActiveCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, captcha });
    if (captcha === activeCaptcha) {
      console.log('CAPTCHA is valid. Proceed with sign-in.');
    } else {
      console.log('CAPTCHA is invalid. Please try again.');
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
          background: #f0f4ff; /* Light blue background */
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
          color: #1e3a8a; /* Dark blue text */
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
          color: #1e40af; /* Medium blue label color */
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #cbd5e1; /* Light gray border */
          font-size: 1rem;
          background-color: #e0f2fe; /* Light blue input */
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #1e40af; /* Focused border in medium blue */
          background-color: #ffffff; /* White background when focused */
        }

        .captcha-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .captcha-text {
          background-color: #bfdbfe; /* Lighter blue for captcha display */
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.125rem;
          color: #1e3a8a; /* Dark blue text */
          user-select: none;
        }

        button[type="submit"] {
          background-color: #1e3a8a; /* Dark blue button */
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
          background-color: #3b82f6; /* Light blue on hover */
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }

        p {
          text-align: center;
          margin-top: 16px;
        }

        p a {
          color: #3b82f6; /* Link color */
          text-decoration: none;
        }

        p a:hover {
          text-decoration: underline;
        }

        .forgot-password-btn {
          background: none;
          border: none;
          padding: 0;
          color: #3b82f6; /* Link color */
          text-decoration: underline;
          cursor: pointer;
          font-size: 1rem;
        }

        .forgot-password-btn:hover {
          color: #1d4ed8; /* Darker blue on hover */
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
            <button type="button" onClick={handleRefreshCaptcha}>Refresh</button>
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
      </form>
    </section>
  );
};

export default SignIn;
