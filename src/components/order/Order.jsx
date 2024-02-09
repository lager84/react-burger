import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import styles from '../order/order.module.css'
import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CLEAR_ORDER, addOrder } from '../../services/actions/add-order';
import { DELETE_INGREDIENT_ALL } from '../../services/actions/burger-constructor'
import { getConstructorIngredients, getBun, getOrder } from '../../services/selectors';



function Order() {

    const dispatch = useDispatch();

    const bun = useSelector(getBun);
    const ingredients = useSelector(getConstructorIngredients);

    const { orderLoad, orderLoadErrors, orderNumber } = useSelector(getOrder);

    useEffect(() => {
        if (orderLoadErrors) {
            alert("Ошибка при создании заказа");
        }
    }, [orderLoadErrors]);


    function showOrder() {

        const orderIngredients = [...ingredients];
        if (bun) {
            orderIngredients.push(bun, bun);
        }
        dispatch(addOrder(orderIngredients));

    }

    const disabled = useMemo(() => {
        let hasIngredient = (ingredients && ingredients.length) || bun;

        let hasOrder = orderNumber !== null || orderLoad;

        return !hasIngredient || hasOrder;
    }, [bun, ingredients, orderNumber, orderLoad]);


    function hideOrder() {
        dispatch({ type: CLEAR_ORDER });
        dispatch({ type: DELETE_INGREDIENT_ALL });
    }


    return (
        <div>
            <Button disabled={disabled} htmlType="button" type="primary" size="large" onClick={showOrder}>
                Оформить заказ
            </Button>
            {orderNumber &&
                <Modal btnClose={hideOrder} title=''>
                    <OrderDetails orderNumber={orderNumber.order.number} />
                </Modal>}
        </div>


    )
}


export default Order
