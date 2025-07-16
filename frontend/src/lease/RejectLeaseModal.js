// src/pages/RejectLeaseModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const RejectLeaseModal = ({ show, onHide, lease, onReject }) => {
  if (!lease) return null;

  const handleReject = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_LEASE_URL + `reject/${lease.id}`,
        null,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (response.status === 200) {
        alert("Lease rejected successfully!");
        onReject(response.data);
      } else {
        alert("Error rejecting lease");
      }
    } catch (error) {
      console.error("Error rejecting lease:", error);
      alert("Error rejecting lease");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reject Lease</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to reject this lease offer?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button className="btn btn-danger" onClick={handleReject}>Reject</button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectLeaseModal;
