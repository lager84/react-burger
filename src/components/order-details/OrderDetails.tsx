import {FC} from 'react';
import orderAcceptedImg from '../../images/graphics.svg';
import styles from '../order-details/order-details.module.css';


type TProps = {
    orderNumber:number; 
}


const OrderDetails:FC<TProps> = ({ orderNumber }) => {

    return (

        <div className={styles.order}>
            <h2 className="text text_type_digits-large">{orderNumber}</h2>
            <p className="text text_type_main-default">ИДЕНТИФИКАТОР ЗАКАЗА</p>
            <div data-test="order-number" className={styles.imgorder}>
                <img src={orderAcceptedImg} alt='Ваш заказ принят' />
            </div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={styles.order_descriptionReady}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )

}



export default OrderDetails;