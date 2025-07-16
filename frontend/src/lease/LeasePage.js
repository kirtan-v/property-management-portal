import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionExpireModal from '../component/SessionExpireModal';
import ViewLeaseModal from './ViewLeaseModal';
import ApproveLeaseModal from './ApproveLeaseModal';
import RejectLeaseModal from './RejectLeaseModal';

const LeasePage = () => {
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
  const [leases, setLeases] = useState([]);
  const [selectedLease, setSelectedLease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [viewModal, setViewModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const isTenant = user && user.role && user.role.startsWith('ROLE_TENANT');

  const loadLeases = async () => {
    try {
        const rolePath = user.role === 'ROLE_LANDLORD' ? 'landlord' 
                  : user.role === 'ROLE_TENANT' ? 'tenant' 
                  : '';

        if (rolePath) {
            const endpoint = `${process.env.REACT_APP_LEASE_URL}${rolePath}/${user.id}`;
            const response = await axios.get(endpoint, {
            headers: { Authorization: localStorage.getItem('token') }
            });
            if (response.status === 200) {
            setLeases(response.data);
            }
    }
    } catch (error) {
      console.error('Error loading leases:', error);
      if (error.response && error.response.status === 401) {
        setShowSessionExpire(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadLeases();
    }
  }, [user]);

  const filteredLeases = leases.filter(lease => {
    const term = searchTerm.toLowerCase();
    return (
      (lease.propertyName && lease.propertyName.toLowerCase().includes(term)) ||
      (lease.tenantEmail && lease.tenantEmail.toLowerCase().includes(term)) ||
      (lease.landlordEmail && lease.landlordEmail.toLowerCase().includes(term))
    );
  });

  const handleApproveLease = (updatedLease) => {
    setLeases(prev =>
      prev.map(l => (l.id === updatedLease.id ? updatedLease : l))
    );
    setApproveModal(false);
  };

  const handleRejectLease = (updatedLease) => {
    setLeases(prev =>
      prev.map(l => (l.id === updatedLease.id ? updatedLease : l))
    );
    setRejectModal(false);
  };

  const handleViewClose = () => {
    setViewModal(false);
  };

  return (
    <div>
      <SessionExpireModal show={showSessionExpire} />

      {/* Modals */}
      <ViewLeaseModal
        show={viewModal}
        onHide={handleViewClose}
        lease={selectedLease}
      />
      {isTenant && (
        <>
          <ApproveLeaseModal
            show={approveModal}
            onHide={() => setApproveModal(false)}
            lease={selectedLease}
            onApprove={handleApproveLease}
          />
          <RejectLeaseModal
            show={rejectModal}
            onHide={() => setRejectModal(false)}
            lease={selectedLease}
            onReject={handleRejectLease}
          />
        </>
      )}

      <main id="main" className="main">
        <div className="container" style={{ paddingTop: '20px', minHeight: '80vh' }}>
          {/* Search Filter */}
          <div className="row mb-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search leases by property, tenant or landlord email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h1 className="card-title mb-0">Lease List</h1>
            </div>
            <div className="card-body">
              {filteredLeases.length === 0 ? (
                <p>No leases found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Property</th>
                        { !isTenant && <th>Tenant Email</th> }
                        { isTenant && <th>Landlord Email</th> }
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeases.map((lease, index) => (
                        <tr key={lease.id}>
                          <td>{index + 1}</td>
                          <td>{lease.propertyName || `#${lease.propertyId}`}</td>
                          { !isTenant && <td>{lease.tenantEmail || '-'}</td>}
                          { isTenant && <td>{lease.landlordEmail || '-'}</td>}                          
                          <td>{lease.startDate || '-'}</td>
                          <td>{lease.endDate || '-'}</td>
                          <td>{lease.status === 1 ? "Created"
                            : lease.status === 2 ? "Accepted"
                            : lease.status === 3 ? "Rejected"
                            : lease.status === 4 ? "Finished"
                            : "Unknown"}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              onClick={() => {
                                setSelectedLease(lease);
                                setViewModal(true);
                              }}
                            >
                              View
                            </button>
                            {isTenant && lease.status === 1 && (
                              <>
                                <button
                                  className="btn btn-sm btn-dark me-2"
                                  onClick={() => {
                                    setSelectedLease(lease);
                                    setApproveModal(true);
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-sm btn-danger me-2"
                                  onClick={() => {
                                    setSelectedLease(lease);
                                    setRejectModal(true);
                                  }}
                                >
                                  Reject
                                </button>
                              </>
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

export default LeasePage;
