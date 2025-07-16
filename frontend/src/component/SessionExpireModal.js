import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";


const SessionExpireModal = (props) => {

    const logout = () => {
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        window.location.href = '/';
    }

    useEffect(() => {
        if (props.show) {
            logout()
        }
    })

    return (
        <>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                size='lg'
            >
                <Modal.Body>
                    <p style={{ 'word-wrap': 'break-word' }}>Session expired!</p>
                    <p style={{ 'word-wrap': 'break-word' }}>Please login again</p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            localStorage.clear();
                            delete axios.defaults.headers.common["Authorization"];
                            window.location.href = '/';
                        }}
                    >
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SessionExpireModal