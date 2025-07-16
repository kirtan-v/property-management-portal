import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState('ROLE_TENANT');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const paramRole = searchParams.get('role');
    if (paramRole) {
      setRole(paramRole);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      role: role.toUpperCase()
    };
    try {
      const response = await axios.post(process.env.REACT_APP_USER_URL + 'register', payload);
      if (response.status === 201) {
        alert('User registered. Now try to Login!');
        navigate("/");
      } else {
        alert(JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response.data));
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
              <h2 className="card-title mb-0">Sign Up as {role.slice(5)}</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
