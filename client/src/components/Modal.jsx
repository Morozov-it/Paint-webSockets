import React, { useRef } from 'react';
import CanvasStore from '../store/CanvasStore';
import '../styles/modal.scss';

const Modal = ({ setModal }) => {
    const inputRef = useRef()

    const connectHandler = () => {
        CanvasStore.setUsername(inputRef.current.value);
        setModal(false)
    }
    
    return (
        <div className="modal" onClick={()=>setModal(false)}>
            <div onClick={(e)=>e.stopPropagation()}
                className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">User name</h3>
                        <button
                            onClick={()=>setModal(false)}
                            type="button"
                            className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <input
                            ref={inputRef}
                            type="text" className="form-control" id="user" />
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={connectHandler}
                            type="button"
                            className="btn btn-primary">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;