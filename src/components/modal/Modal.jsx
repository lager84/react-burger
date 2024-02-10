import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';




const modalsContainer = document.querySelector('#modals');

function Modal({ title, children, btnClose }) {


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
                <div className={styles.ingredient_header}>
                    <h2 className={styles.ingredient_title}>{title}</h2>
                    <div className={styles.order_closeButton}><CloseIcon type="primary" onClick={btnClose} /></div>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={btnClose} />
        </>

    ), modalsContainer);
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    btnClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}
export default Modal