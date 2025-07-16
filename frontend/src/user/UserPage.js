import React, { useState, useEffect } from 'react';
import SessionExpireModal from '../component/SessionExpireModal';
import axios from 'axios';
import UpdateUser from './UpdateUser';

const UserPage = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : null;
  });
  
  const [show, setShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);

  const loadUserDetail = async () => {
    console.log("loadUserDetail called");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USER_URL}id/${user.id}`,
        { headers: { 'Authorization': localStorage.getItem("token") } }
      );
      if (response.status === 200) {
        setUserDetail(response.data);
        console.log("API response data:", response.data);
      }
    } catch (error) {
      console.error("Error loading user detail:", error);
      if (error.response && error.response.status === 401) {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadUserDetail();
    }
  }, [user]);

  const handleUserUpdate = (updatedUser) => {
    setUserDetail(updatedUser);
    localStorage.setItem("data", JSON.stringify(updatedUser));
    setUpdateModal(false);
  };

  return (
    <div>
      <SessionExpireModal show={show} />
      <UpdateUser 
        onHide={() => setUpdateModal(false)}
        show={updateModal}
        user={userDetail}
        onUpdate={handleUserUpdate}
      />
      <main id="main" className="main">
        <div className="container d-flex justify-content-center align-items-start"
            style={{ minHeight: '80vh', paddingTop: '20px' }}
            >
          <div className="card w-75">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="card-title mb-0">User Information</h1>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setUpdateModal(true)}
              >
                Update
              </button>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-bordered mb-3">
                <li className="nav-link active">User Details</li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                  <div className="row mb-2">
                    <div className="col-lg-3 col-md-4 label">Full Name</div>
                    <div className="col-lg-9 col-md-8">
                      {userDetail.firstName && userDetail.lastName 
                        ? `${userDetail.firstName} ${userDetail.lastName}`
                        : "Loading..."}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-3 col-md-4 label">User ID</div>
                    <div className="col-lg-9 col-md-8">
                      {userDetail.id || "Loading..."}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-3 col-md-4 label">Email</div>
                    <div className="col-lg-9 col-md-8">
                      {userDetail.email || "Loading..."}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-3 col-md-4 label">Contact</div>
                    <div className="col-lg-9 col-md-8">
                      {userDetail.phone || "Loading..."}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-3 col-md-4 label">User Type</div>
                    <div className="col-lg-9 col-md-8">
                      {userDetail.role ? userDetail.role.slice(5) : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
