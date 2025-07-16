import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const DeletePropertyModal = ({ show, onHide, property, onDelete }) => {
      const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('data');
        return stored ? JSON.parse(stored) : null;
      });

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_PROPERTY_URL}delete/${property.id}/${user.id}`,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (res.status === 200) {
        onDelete(property.id);
      } else {
        alert('Error deleting property');
      }
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response.data));
    }
  };

  if (!property) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Delete Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this property?</p>
        <strong>{property.name}</strong>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePropertyModal;
