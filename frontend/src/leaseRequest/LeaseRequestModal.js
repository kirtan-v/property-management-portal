import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const LeaseRequestModal = ({ show, onHide, property, onLeaseRequest }) => {

  const [localProperty, setLocalProperty] = useState(property);
    
  const tenant = JSON.parse(localStorage.getItem("data"));
  const tenantId = tenant ? tenant.id : null;
  const tenantEmail = tenant ? tenant.email :null;

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (show) {
      setMessage("");
      setLocalProperty(property);
    }
  }, [show,property]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      propertyId: localProperty.id,
      propertyName: null,
      landlordId: null,  
      landlordEmail: null,
      tenantId: tenantId,
      tenantEmail: tenantEmail,
      requestType: 1,     // type 1= NEW LEASE
      message: message,
      status: null,
      createdAt: null,
      updatedAt: null
    };

    console.log(payload)

    try {
      const response = await axios.post(process.env.REACT_APP_LEASE_REQUEST_URL + "create",
        payload,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Lease request created successfully");
        onLeaseRequest(response.data);
        onHide();
      } else {
        alert("Error creating lease request");
      }
    } catch (error) {
      console.error("Error creating lease request:", error);
      alert("Error creating lease request");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Lease Request</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>
            <strong>Property:</strong> {localProperty?.name}
          </p>
          <div className="form-group">
            <label htmlFor="leaseMessage" className="form-label">Message</label>
            <textarea
              id="leaseMessage"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary">Submit Request</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LeaseRequestModal;
