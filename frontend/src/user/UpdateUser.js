import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SessionExpireModal from "../component/SessionExpireModal";

const UpdateUser = (props) => {
  const [localUser, setLocalUser] = useState(props.user);
  const [showSessionExpire, setShowSessionExpire] = useState(false);

  useEffect(() => {
    setLocalUser(props.user);
  }, [props.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser(prev => ({ ...prev, [name]: value }));
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const dto = {
      id: localUser.id,
      email: localUser.email,
      phone: localUser.phone,
      role: localUser.role,
      firstName: localUser.firstName,
      lastName: localUser.lastName,
      created_at: localUser.createdAt,
      updated_at: localUser.updatedAt
    };

    try {
      const response = await axios.put(
        process.env.REACT_APP_USER_URL + `update/${localUser.id}`,
        dto,
        { headers: { 'Authorization': localStorage.getItem("token") } }
      );
      // Call the onUpdate callback with updated user data
      if (response.status === 200) {
        props.onUpdate(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowSessionExpire(true);
      }
    }
  };

  const handleClose = () => {
    props.onHide();
    setLocalUser(props.user);
  };

  return (
    <>
      <SessionExpireModal show={showSessionExpire} />
      <Modal {...props} size="md" centered>
        <Modal.Header>
          <Modal.Title>Update your details</Modal.Title>
        </Modal.Header>
        <form onSubmit={updateHandler}>
          <Modal.Body>
            <div className="form-group row mb-3">
              <label className="form-label col-sm-3 col-form-label">First Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="firstName" value={localUser.firstName || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="form-label col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="lastName" value={localUser.lastName || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="form-label col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" name="email" value={localUser.email || ''} readOnly />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="form-label col-sm-3 col-form-label">User Type</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="role" value={localUser.role ? localUser.role.slice(5) : ''} readOnly />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="form-label col-sm-3 col-form-label">Contact</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="phone" value={localUser.phone || ''} onChange={handleChange} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-dark">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateUser;
