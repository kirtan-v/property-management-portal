import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionExpireModal from '../component/SessionExpireModal';
import AddPropertyModal from './AddPropertyModal';
import UpdatePropertyModal from './UpdatePropertyModal';
import DeletePropertyModal from './DeletePropertyModal';
import LeaseRequestModal from '../leaseRequest/LeaseRequestModal';
import ViewPropertyModal from './ViewPropertyModal';

const PropertyPage = () => {
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
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [leaseModal, setLeaseModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const loadProperties = async () => {
    try {
      let endpoint;
      if (user.role && user.role.startsWith('ROLE_LANDLORD')) {
        endpoint = `${process.env.REACT_APP_PROPERTY_URL}allByLandlord/${user.id}`;
      } else {
        endpoint = `${process.env.REACT_APP_PROPERTY_URL}all/available`;
      }
      const response = await axios.get(endpoint, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      if (response.status === 200) {
        setProperties(response.data);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      if (error.response && error.response.status === 401) {
        setShowSessionExpire(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadProperties();
    }
  }, [user]);

  const filteredProperties = properties.filter(prop => {
    const term = searchTerm.toLowerCase();
    return (
      prop.name.toLowerCase().includes(term) ||
      prop.city.toLowerCase().includes(term) ||
      prop.state.toLowerCase().includes(term)
    );
  });

  const handleAddProperty = (newProperty) => {
    setProperties(prev => [...prev, newProperty]);
    setAddModal(false);
  };

  const handleUpdateProperty = (updatedProperty) => {
    setProperties(prev =>
      prev.map(prop => (prop.id === updatedProperty.id ? updatedProperty : prop))
    );
    setUpdateModal(false);
  };

  const handleDeleteProperty = (deletedId) => {
    setProperties(prev => prev.filter(prop => prop.id !== deletedId));
    setDeleteModal(false);
  };

  const handleLeaseRequest = () => {
    setLeaseModal(false);
  };

  const isLandlord = user && user.role && user.role.startsWith('ROLE_LANDLORD');
  const isTenant = user && user.role && user.role.startsWith('ROLE_TENANT');

  return (
    <div>
      <SessionExpireModal show={showSessionExpire} />
      <AddPropertyModal
        show={addModal}
        onHide={() => setAddModal(false)}
        onAdd={handleAddProperty}
      />
      <UpdatePropertyModal
        show={updateModal}
        onHide={() => setUpdateModal(false)}
        property={selectedProperty}
        onUpdate={handleUpdateProperty}
      />
      <DeletePropertyModal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        property={selectedProperty}
        onDelete={handleDeleteProperty}
      />
      <LeaseRequestModal
        show={leaseModal}
        onHide={() => setLeaseModal(false)}
        property={selectedProperty}
        onLeaseRequest={handleLeaseRequest}
      />
      <ViewPropertyModal
        show={viewModal}
        onHide={() => setViewModal(false)}
        property={selectedProperty}
      />

      <main id="main" className="main">
        <div className="container" style={{ paddingTop: '20px', minHeight: '80vh' }}>
          <div className="row mb-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search by property name, city, or state"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="card-title mb-0">Property List</h1>
              {isLandlord && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddModal(true)}
                >
                  Add Property
                </button>
              )}
            </div>
            <div className="card-body">
              {filteredProperties.length === 0 ? (
                <p>No properties found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Property Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((prop, index) => (
                        <tr key={prop.id}>
                          <td>{index + 1}</td>
                          <td>{prop.name}</td>
                          <td>{prop.city}</td>
                          <td>{prop.state}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              onClick={() => {
                                setSelectedProperty(prop);
                                setViewModal(true);
                              }}
                            >
                              View
                            </button>
                            {isLandlord && (
                              <>
                                <button
                                  className="btn btn-sm btn-dark me-2"
                                  onClick={() => {
                                    setSelectedProperty(prop);
                                    setUpdateModal(true);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-sm btn-danger me-2"
                                  onClick={() => {
                                    setSelectedProperty(prop);
                                    setDeleteModal(true);
                                  }}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                            {isTenant && (
                              <button
                                className="btn btn-sm btn-dark"
                                onClick={() => {
                                  setSelectedProperty(prop);
                                  setLeaseModal(true);
                                }}
                              >
                                Request Lease
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

export default PropertyPage;
