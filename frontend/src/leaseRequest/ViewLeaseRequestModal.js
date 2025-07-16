// src/pages/ViewLeaseRequestModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewLeaseRequestModal = ({ show, onHide, request }) => {
  if (!request) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lease Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <tbody>
            <tr>
              <th>Property</th>
              <td>{request.propertyName || `#${request.propertyId}`}</td>
            </tr>
            <tr>
              <th>Landlord</th>
              <td>{request.landlordEmail}</td>
            </tr>
            <tr>
              <th>Request Type</th>
              <td>{request.requestType === 1
                                ? "New Lease"
                                : request.requestType === 2
                                ? "Renew Lease"
                                : "Unknown"}</td>
            </tr>
            <tr>
              <th>Tenant</th>
              <td>{request.tenantEmail}</td>
            </tr>
            <tr>
              <th>Message</th>
              <td>{request.message}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{request.status === 1
                                ? "Created"
                                : request.status === 2
                                ? "Accepted"
                                : request.status === 3
                                ? "Rejected"
                                : "Unknown"}</td>
            </tr>
            {/* Add more rows here for additional fields if needed */}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewLeaseRequestModal;
