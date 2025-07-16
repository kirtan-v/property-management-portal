import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const UpdatePropertyModal = ({ show, onHide, property, onUpdate }) => {
  const [localProperty, setLocalProperty] = useState(property);

  useEffect(() => {
    setLocalProperty(property);
  }, [property]);

  const handleChange = e => {
    const { name, value } = e.target;
    setLocalProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROPERTY_URL}update/${localProperty.id}`,
        localProperty,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (res.status === 200) {
        onUpdate(res.data);
      } else {
        alert('Error updating property');
      }
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Update Property</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Property Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={localProperty?.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={localProperty?.description || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={localProperty?.street || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={localProperty?.city || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={localProperty?.state || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>ZIP</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={localProperty?.zip || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={localProperty?.country || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Rent</label>
            <input
              type="text"
              className="form-control"
              name="rent"
              value={localProperty?.rent || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Deposit</label>
            <input
              type="text"
              className="form-control"
              name="deposit"
              value={localProperty?.deposit || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Start Date</label>
            <input
              type="text"
              className="form-control"
              name="startDate"
              value={localProperty?.startDate || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>End Date</label>
            <input
              type="text"
              className="form-control"
              name="endDate"
              value={localProperty?.endDate || ''}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Close
          </button>
          <button type="submit" className="btn btn-dark">
            Update
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdatePropertyModal;
