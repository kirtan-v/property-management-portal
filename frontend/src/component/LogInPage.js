import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAuthToken } from "./setAuthToken";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please enter email and password");
      setEmail("");
      setPassword("");
      return;
    }
    try {
      const userData = { email, password };
      const response = await axios.post(process.env.REACT_APP_AUTH_URL + "login", userData);
      const token = response.data.token;
      const data = response.data;
      if (!token) {
        alert("Please enter valid credentials");
      } else {
        window.localStorage.setItem("token", token);
        setAuthToken(token);
        window.localStorage.setItem("data", JSON.stringify(data));
        window.location.href = '/user';
      }
    } catch (error) {
      console.error(error);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <main
      id="main"
      className="main"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-start"
        style={{ paddingTop: '20px' }}
      >
        <div className="col-md-6 col-lg-4">
          <div 
            className="card"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(5px)'
            }}
          >
            <div className="card-header text-center">
              <h2 className="card-title mb-0">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input
                    id="inputEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">Password</label>
                  <input
                    id="inputPassword"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Login</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
