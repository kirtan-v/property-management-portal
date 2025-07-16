// src/components/NavbarComponent.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import LogoutModal from './LogoutModal';

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const logout = () => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = '/';
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
  };

  // Function to set style for active and inactive links
  const navLinkStyle = ({ isActive }) => ({
    color: 'white',
    backgroundColor: isActive ? '#212529' : 'transparent',
    padding: '8px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'block'
  });

  return (
    <>
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
      <div
        style={{
          width: expanded ? '250px' : '60px',
          height: '100vh',
          backgroundColor: '#343a40',
          color: 'white',
          transition: 'width 0.3s',
          overflow: 'hidden',
          fontFamily: 'Roboto, sans-serif',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <Button variant="dark" onClick={toggleNavbar} className="w-100">
            {expanded ? <span>&#x2715;</span> : <span>&#9776;</span>}
          </Button>
        </div>
        {expanded && (
          <div className="d-flex flex-column" style={{ backgroundColor: '#343a40' }}>
            <div className="p-2">
              <NavLink to="/user" style={navLinkStyle}>
                User
              </NavLink>
            </div>
            <div className="p-2">
              <NavLink to="/property" style={navLinkStyle}>
                Property
              </NavLink>
            </div>
            <div className="p-2">
              <NavLink to="/lease-request" style={navLinkStyle}>
                Lease Request
              </NavLink>
            </div>
            <div className="p-2">
              <NavLink to="/lease" style={navLinkStyle}>
                Lease
              </NavLink>
            </div>
            <div className="p-2">
              <span
                onClick={() => setShowLogoutModal(true)}
                style={{
                  ...navLinkStyle({ isActive: false }),
                  cursor: 'pointer'
                }}
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarComponent;
