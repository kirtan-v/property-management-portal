// src/pages/ApproveLeaseModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const ApproveLeaseModal = ({ show, onHide, lease, onApprove }) => {
  if (!lease) return null;

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_LEASE_URL + `accept/${lease.id}`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (response.status === 200) {
        alert("Lease approved successfully!");
        onApprove(response.data);
      } else {
        alert("Error approving lease");
      }
    } catch (error) {
      console.error("Error approving lease:", error);
      alert("Error approving lease");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Approve Lease</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to approve this lease offer?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button className="btn btn-dark" onClick={handleApprove}>Approve</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveLeaseModal;
