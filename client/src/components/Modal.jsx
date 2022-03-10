import React, { useRef } from 'react';
import '../styles/modal.scss';


const Modal = ({ closeModal, connectHandler, isError }) => {
    const inputRef = useRef()
    
    return (
        <div className="modal" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">User name</h3>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <input
                            ref={inputRef}
                            type="text" className="form-control" id="user" />
                        {isError &&
                            <div className="error">{isError}</div>}
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={()=>connectHandler(inputRef.current.value)}
                            type="button"
                            className="btn btn-primary">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;