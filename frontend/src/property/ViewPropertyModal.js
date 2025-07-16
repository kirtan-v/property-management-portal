import React from 'react';
import { Modal } from 'react-bootstrap';

const ViewPropertyModal = ({ show, onHide, property }) => {
  if (!property) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Property Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th>Landlord Email:</th>
                <td>{property.landlordEmail}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>{property.name}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{property.description}</td>
              </tr>
              <tr>
                <th>Street:</th>
                <td>{property.street}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{property.city}</td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{property.state}</td>
              </tr>
              <tr>
                <th>ZIP:</th>
                <td>{property.zip}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>{property.country}</td>
              </tr>
              <tr>
                <th>Lease Start Date:</th>
                <td>{property.startDate}</td>
              </tr>
              <tr>
                <th>Lease End Date:</th>
                <td>{property.endDate}</td>
              </tr>
              <tr>
                <th>Rent:</th>
                <td>{property.rent}</td>
              </tr>
              <tr>
                <th>Deposit:</th>
                <td>{property.deposit}</td>
              </tr>
              <tr>
                <th>Lease Status:</th>
                <td>{property.leaseStatus===1 ? 'ACTIVE' : "INACTIVE"}</td>
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

export default ViewPropertyModal;
