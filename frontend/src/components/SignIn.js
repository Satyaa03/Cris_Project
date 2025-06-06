import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [activeCaptcha] = useState('6czj0'); // Example captcha

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, captcha });
  };

  return (
    <section className="signin-container">
      <style>{`
        .signin-container {
          background: #fff;
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
          color: #111827;
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
          color: #374151;
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          background-color: #f9fafb;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #111827;
          background-color: #fff;
        }

        .captcha-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .captcha-text {
          background-color: #e5e7eb;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.125rem;
          color: #111827;
          user-select: none;
        }

        button[type="submit"] {
          background-color: #111827;
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
          background-color: #374151;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }

        p {
          text-align: center;
          margin-top: 16px;
        }

        p a {
          color: #3b82f6;
          text-decoration: none;
        }

        p a:hover {
          text-decoration: underline;
        }

        .forgot-password-btn {
        background: none;
        border: none;
        padding: 0;
        color: #3b82f6;
        text-decoration: underline;
        cursor: pointer;
        font-size: 1rem;
        }

        .forgot-password-btn:hover {
        color: #1d4ed8;
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

