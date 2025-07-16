// src/pages/AddLeaseModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const AddLeaseModal = ({ show, onHide, request, onAddLease }) => {

    const [localRequest, setLocalRequest] = useState(request);

      useEffect(() => {
        if (show) {
          setLocalRequest(request);
        }
      }, [show,request]);
    

  // const [leaseData, setLeaseData] = useState({
  //   leaseRequestId: request?.id || null,
  //   propertyId: request?.propertyId || '',
  //   propertyName: null,
  //   landlordId: null,
  //   landlordEmail: null,
  //   tenantId: request?.tenantId || null,
  //   tenantEmail: request?.tenantEmail,
  //   startDate: null,
  //   endDate: null,
  //   rentAmount: null,
  //   depositAmount: null,
  //   status: null,
  //   acknowledgedAt: null,
  //   createdAt: null,
  //   updatedAt: null,
  // });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const payload = {
        leaseRequestId: localRequest?.id || null,
        propertyId: localRequest?.propertyId || '',
        propertyName: null,
        landlordId: null,
        landlordEmail: null,
        tenantId: localRequest?.tenantId || null,
        tenantEmail: localRequest?.tenantEmail,
        startDate: null,
        endDate: null,
        rentAmount: null,
        depositAmount: null,
        status: null,
        acknowledgedAt: null,
        createdAt: null,
        updatedAt: null,
      };
      console.log(payload)
      const response = await axios.post(
        process.env.REACT_APP_LEASE_URL + 'create',
        payload,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Lease created successfully!");
        onAddLease(response.data);
      } else {
        alert("Error creating lease");
      }
    } catch (error) {
      console.error("Error creating lease:", error);
      alert("Error creating lease");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Lease</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p><strong>Do you want to create lease?</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
          <button type="submit" className="btn btn-dark">Create Lease</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddLeaseModal;
