import React from 'react';
import orderAcceptedImg from '../../images/graphics.svg';
import closeButtonImg from '../../images/close-button.png';
import styles from '../order-details/order-details.module.css';
import PropTypes from 'prop-types';

function OrderDetails({ btnClose }) {

    return (

        <div className={styles.order}>
            <button onClick={btnClose} type='button' className={styles.order_closeButton}><img src={closeButtonImg} alt='Закрыть окно' /></button>
            <h2 className="text text_type_digits-large">{'034536'}</h2>
            <p className="text text_type_main-default">ИДЕНТИФИКАТОР ЗАКАЗА</p>
            <div className={styles.imgorder}>
                <img src={orderAcceptedImg} alt='Ваш заказ принят' />
            </div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={styles.order_descriptionReady}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )

}

OrderDetails.propTypes = {
    btnClose: PropTypes.func.isRequired
}

export default OrderDetails;