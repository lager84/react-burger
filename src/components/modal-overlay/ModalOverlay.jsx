import React from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'



function ModalOverlay({ onClick }){
    return (
        <div className={styles.overlay} onClick={onClick} />
    )
}


export default ModalOverlay