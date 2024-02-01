import React from 'react';
import styles from '../order/order.module.css'
import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { postOrder } from '../utils/order-api';
import { OrderContext } from '../services/orderContext';


function Order() {

    const { ingredients } = React.useContext(OrderContext);
    const [number, setNumber] = React.useState('');

    const [openOrderModals, setOpenOrderModals] = React.useState({ isOpened: false });

    const openOrderModal = () => {
        setOpenOrderModals({ ...openOrderModals, isOpened: true });
    }

    const closeModals = () => {
        setOpenOrderModals({ ...openOrderModals, isOpened: false });
    }


    function showOrder() {
        postOrder(ingredients)
            .then(num => {
                setNumber(num.order.number);
                openOrderModal(true);
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (
        <div>
            <Button htmlType="button" type="primary" size="large" onClick={showOrder}>
                Оформить заказ
            </Button>
            {openOrderModals.isOpened &&
                <Modal btnClose={closeModals}>
                    <OrderDetails orderNumber={number} btnClose={closeModals} />
                </Modal>}
        </div>


    )
}


export default Order
