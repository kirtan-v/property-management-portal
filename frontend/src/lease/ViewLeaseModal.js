// src/pages/ViewLeaseModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewLeaseModal = ({ show, onHide, lease }) => {
  if (!lease) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lease Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th>Lease Request ID:</th>
                <td>{lease.leaseRequestId || '-'}</td>
              </tr>
              <tr>
                <th>Property:</th>
                <td>{lease.propertyName || `#${lease.propertyId}`}</td>
              </tr>
              <tr>
                <th>Tenant Email:</th>
                <td>{lease.tenantEmail || '-'}</td>
              </tr>
              <tr>
                <th>Landlord Email:</th>
                <td>{lease.landlordEmail || '-'}</td>
              </tr>
              <tr>
                <th>Start Date:</th>
                <td>{lease.startDate || '-'}</td>
              </tr>
              <tr>
                <th>End Date:</th>
                <td>{lease.endDate || '-'}</td>
              </tr>
              <tr>
                <th>Rent:</th>
                <td>{lease.rentAmount || '-'}</td>
              </tr>
              <tr>
                <th>Deposit:</th>
                <td>{lease.depositAmount || '-'}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>{lease.status === 1 ? "Created"
                    : lease.status === 2 ? "Accepted"
                    : lease.status === 3 ? "Rejected"
                    : lease.status === 4 ? "Finished"
                    : "Unknown"}</td>
              </tr>
              <tr>
                <th>Acknowledged At:</th>
                <td>{lease.acknowledgedAt || 'Pending'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewLeaseModal;
