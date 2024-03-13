import {FC} from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'
import PropTypes from 'prop-types';

type TProps ={
    onClick:()=>void;
}


const ModalOverlay:FC<TProps> = ({ onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick} />
    )
}


ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay