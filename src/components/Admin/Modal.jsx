import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, type = 'confirm', title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-container ${type}`}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    {type === 'confirm' ? (
                        <>
                            <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
                            <button className="modal-btn confirm" onClick={onConfirm}>Confirm</button>
                        </>
                    ) : (
                        <button className="modal-btn ok" onClick={onCancel}>OK</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
