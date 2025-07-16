import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionExpireModal from '../component/SessionExpireModal';
import AddLeaseModal from '../lease/AddLeaseModal';
import ViewLeaseRequestModal from './ViewLeaseRequestModal';
import DeleteLeaseRequestModal from './DeleteLeaseRequestModal';
import RejectLeaseRequestModal from './RejectLeaseRequestModal';

const LeaseRequestsPage = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('data');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);

  const [showSessionExpire, setShowSessionExpire] = useState(false);

  const [leaseRequests, setLeaseRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [addLeaseModal, setAddLeaseModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const isLandlord = user && user.role && user.role.startsWith('ROLE_LANDLORD');
  const isTenant = user && user.role && user.role.startsWith('ROLE_TENANT');

  const loadLeaseRequests = async () => {
    try {
      let endpoint;
      if (isLandlord) {
        endpoint = `${process.env.REACT_APP_LEASE_REQUEST_URL}landlord/${user.id}`;
      } else if (isTenant) {
        endpoint = `${process.env.REACT_APP_LEASE_REQUEST_URL}tenant/${user.id}`;
      } else {
        endpoint = `${process.env.REACT_APP_LEASE_REQUEST_URL}all`;
      }

      const response = await axios.get(endpoint, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      if (response.status === 200) {
        setLeaseRequests(response.data);
      }
    } catch (error) {
      console.error('Error loading lease requests:', error);
      if (error.response && error.response.status === 401) {
        setShowSessionExpire(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadLeaseRequests();
    }
  }, [user,rejectModal, deleteModal, addLeaseModal]);

  const filteredRequests = leaseRequests.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      req.message.toLowerCase().includes(term) ||
      (req.propertyName && req.propertyName.toLowerCase().includes(term))
    );
  });

  const handleAddLease = (newLeaseData) => {
    loadLeaseRequests();
    setAddLeaseModal(false);
  };

  const handleRejectRequest = (requestId) => {
    setRejectModal(false);
  };

  const handleDeleteRequest = (requestId) => {
    setDeleteModal(false);
  };

  const handleViewClose = () => {
    setViewModal(false);
  };

  return (
    <div>
      <SessionExpireModal show={showSessionExpire} />

      <AddLeaseModal
        show={addLeaseModal}
        onHide={() => setAddLeaseModal(false)}
        request={selectedRequest}
        onAddLease={handleAddLease}
      />
      <ViewLeaseRequestModal
        show={viewModal}
        onHide={handleViewClose}
        request={selectedRequest}
      />
      <DeleteLeaseRequestModal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        request={selectedRequest}
        onDeleteRequest={handleDeleteRequest}
      />
      <RejectLeaseRequestModal
        show={rejectModal}
        onHide={() => setRejectModal(false)}
        request={selectedRequest}
        onRejectRequest={handleRejectRequest}
      />

      <main id="main" className="main">
        <div className="container" style={{ paddingTop: '20px', minHeight: '80vh' }}>
          <div className="row mb-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search lease requests (by message, property, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="card-title mb-0">Lease Requests</h1>
            </div>
            <div className="card-body">
              {filteredRequests.length === 0 ? (
                <p>No lease requests found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((req, index) => (
                        <tr key={req.id}>
                          <td>{index + 1}</td>
                          <td>{req.propertyName || `Property #${req.propertyId}`}</td>
                          <td>
                            {req.requestType === 1
                                ? "New Lease"
                                : req.requestType === 2
                                ? "Renew Lease"
                                : "Unknown"}
                          </td>
                          <td>{req.message}</td>
                          <td>
                            {req.status === 1
                                ? "Created"
                                : req.status === 2
                                ? "Accepted"
                                : req.status === 3
                                ? "Rejected"
                                : "Unknown"}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              onClick={() => {
                                setSelectedRequest(req);
                                setViewModal(true);
                              }}
                            >
                              View
                            </button>

                            {isLandlord && req.status === 1 && (
                              <>
                                <button
                                  className="btn btn-sm btn-dark me-2"
                                  onClick={() => {
                                    setSelectedRequest(req);
                                    setAddLeaseModal(true);
                                  }}
                                >
                                  Create Lease
                                </button>
                                <button
                                  className="btn btn-sm btn-danger me-2"
                                  onClick={() => {
                                    setSelectedRequest(req);
                                    setRejectModal(true);
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {isTenant && req.status === 1 && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  setSelectedRequest(req);
                                  setDeleteModal(true);
                                }}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaseRequestsPage;
