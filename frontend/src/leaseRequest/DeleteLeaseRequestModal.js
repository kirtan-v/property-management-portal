// src/pages/DeleteLeaseRequestModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const DeleteLeaseRequestModal = ({ show, onHide, request, onDeleteRequest }) => {
  if (!request) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_LEASE_REQUEST_URL + `${request.id}`,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (response.status === 200) {
        alert("Lease request deleted successfully!");
        onDeleteRequest(request.id);
      } else {
        alert("Error deleting lease request");
      }
    } catch (error) {
      console.error("Error deleting lease request:", error);
      alert("Error deleting lease request");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Lease Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this lease request?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteLeaseRequestModal;
