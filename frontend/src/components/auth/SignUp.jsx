import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/SignUp.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      username,
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:8002/user/create', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("User Added");
      navigate('/auth/signin');
    } catch (err) {
      setError('Registration failed, please try again later');
      console.log('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-input-group">
          <label htmlFor="name" className="signup-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange(setName)}
            placeholder="Input name"
            className="signup-input"
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="email" className="signup-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange(setEmail)}
            placeholder="abcd@gmail.com"
            className="signup-input"
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="username" className="signup-label">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange(setUsername)}
            placeholder="User name"
            className="signup-input"
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="password" className="signup-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange(setPassword)}
            placeholder="***********"
            className="signup-input"
          />
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
          Sign Up
        </button>
        {error && <p className="signup-error">{error}</p>}
        <div className="signup-links">
          <Link to="/auth/signin" className="signup-link">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
