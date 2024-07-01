import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);

      const rememberedPassword = localStorage.getItem(`password-${rememberedUsername}`);
      if (rememberedPassword) {
        setPassword(rememberedPassword);
      }
    }
  }, []);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    const savedPassword = localStorage.getItem(`password-${newUsername}`);
    if (savedPassword) {
      setPassword(savedPassword);
    } else {
      setPassword('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setError('Username and password are required');
      return;
    }

    setError('');

    if (rememberMe) {
      localStorage.setItem('rememberedUsername', username);
      localStorage.setItem(`password-${username}`, password);
    } else {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem(`password-${username}`);
    }

    console.log('Logging in with', { username, password });
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rememberMe" className="remember-me-label">
            Remember Me
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
