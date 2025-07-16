// src/pages/RejectLeaseRequestModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const RejectLeaseRequestModal = ({ show, onHide, request, onRejectRequest }) => {
  if (!request) return null;

  const handleReject = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_LEASE_REQUEST_URL + `id/${request.id}/status/3`,
        null,
        { headers: { Authorization: localStorage.getItem('token') } });
      if (response.status === 200) {
        alert("Lease request rejected successfully!");
        onRejectRequest(request.id);
      } else {
        alert("Error rejecting lease request");
      }
    } catch (error) {
      console.error("Error rejecting lease request:", error);
      alert("Error rejecting lease request");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reject Lease Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to reject this lease request?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button className="btn btn-danger" onClick={handleReject}>Reject</button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectLeaseRequestModal;
