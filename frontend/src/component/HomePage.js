import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Semi-transparent card */}
        <div
          className="card w-75"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div className="card-header text-center">
            <h1 className="card-title mb-0">Rental Manager</h1>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Sign Up as Landlord */}
              <div className="col-12">
                <div className="border p-4 text-center shadow-sm rounded">
                  <h3 className="mb-2" style={{ fontWeight: 400 }}>
                    Do you have property to rent?
                  </h3>
                  <h5 className="mb-3" style={{ fontWeight: 300, color: '#555' }}>
                    Sign Up as Landlord
                  </h5>
                  <Link to="/signup?role=ROLE_LANDLORD" className="btn btn-outline-dark">
                    Sign Up
                  </Link>
                </div>
              </div>
              {/* Sign Up as Tenant */}
              <div className="col-12">
                <div className="border p-4 text-center shadow-sm rounded">
                  <h3 className="mb-2" style={{ fontWeight: 400 }}>
                    Are you looking for property?
                  </h3>
                  <h5 className="mb-3" style={{ fontWeight: 300, color: '#555' }}>
                    Sign Up as Tenant
                  </h5>
                  <Link to="/signup?role=ROLE_TENANT" className="btn btn-outline-dark">
                    Sign Up
                  </Link>
                </div>
              </div>
              {/* Login (Common) */}
              <div className="col-12">
                <div className="border p-4 text-center shadow-sm rounded">
                  <h3 className="mb-2" style={{ fontWeight: 400 }}>
                    Already have an account?
                  </h3>
                  <h5 className="mb-3" style={{ fontWeight: 300, color: '#555' }}>
                    Login
                  </h5>
                  <Link to="/login" className="btn btn-outline-dark">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
