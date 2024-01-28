import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';



const modalsContainer = document.querySelector('#root');

function Modal({ children, btnClose }) {


    const checkEsc = React.useCallback(e => {
        if (e.key === "Escape") {
            btnClose(e);
        }
    }, [btnClose]);




    React.useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);




    return ReactDOM.createPortal((
        <>
            <div className={styles.modalOrder}>
                {children}
            </div>
            <ModalOverlay onClick={btnClose} />
        </>

    ), modalsContainer);
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}
export default Modal