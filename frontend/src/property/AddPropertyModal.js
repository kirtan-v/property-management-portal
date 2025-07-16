import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const AddPropertyModal = ({ show, onHide, onAdd }) => {

      const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('data');
        return stored ? JSON.parse(stored) : null;
      });

      const initialFormData= {
        landlordId: user.id,
        landlordEmail: user.email,
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        startDate: '',
        endDate: '',
        rent: '',
        deposit: '',
        leaseStatus: 2,
        createdAt: '',
        updatedAt: ''
      };
    
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = e => {
    setFormData(initialFormData);
    onHide();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_PROPERTY_URL + "add", formData, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      if (res.status === 200 || res.status === 201) {
        onAdd(res.data);
        handleClose();
      } else {
        alert('Error creating property');
      }
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err.response.data));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Add Property</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Property Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={formData.street}
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
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>ZIP</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Rent Amount</label>
            <input
              type="number"
              className="form-control"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Deposit Amount</label>
            <input
              type="number"
              className="form-control"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => handleClose()}>
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Add Property
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddPropertyModal;
