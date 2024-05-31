import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Signin.css';

export default function SignIn({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8002/user/signIn', {
        Email: credentials.email,
        Password: credentials.password,
      });

      if (response.data.user) {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Sign in failed, please try again later');
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <h2 className="signin-title">Sign In</h2>
        <div className="signin-input-group">
          <label htmlFor="email" className="signin-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="abcd@gmail.com"
            className="signin-input"
          />
        </div>
        <div className="signin-input-group">
          <label htmlFor="password" className="signin-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="***********"
            className="signin-input"
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
        {error && <p className="signin-error">{error}</p>}
        <div className="signin-links">
          <Link to="/auth/signup" className="signin-link">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
