import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter email");
      return;
    }
    try {
      const body = { email };
      const response = await axios.post(process.env.REACT_APP_AUTH_URL + "forgot-password", body);
      if (response.data === "") {
        alert("Something went wrong");
      } else {
        alert(response.data);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized");
        setEmail("");
        navigate('/');
      }
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
          {/* Semi-transparent card */}
          <div
            className="card"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <div className="card-header text-center">
              <h2 className="card-title mb-0">Forgot Password</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Enter your email</label>
                  <input
                    id="inputEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Send Email</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
