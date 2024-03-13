import { useMemo, useEffect , useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import styles from '../order/order.module.css'
import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CLEAR_ORDER, addOrder } from '../../services/actions/add-order';
import { DELETE_INGREDIENT_ALL } from '../../services/actions/burger-constructor'
import {getAuth , getConstructorIngredients, getBun, getOrder } from '../../services/selectors';
import { useNavigate } from 'react-router';
import { URL_LOGIN } from '../../utils/routes';
import { authGetUserAction } from '../../services/actions/auth';
import {  getCookie } from "../../utils/cookie";




const  Order = () => {

    const accToken = getCookie("accessToken");

    const dispatch = useDispatch();

    const { userLoggedIn, requestStart } = useSelector(getAuth);

    const bun = useSelector(getBun);
    const ingredients = useSelector(getConstructorIngredients);

    const { orderLoad, orderLoadErrors, orderNumber } = useSelector(getOrder);

    useEffect(() => {
        if (orderLoadErrors) {
            alert("Ошибка при создании заказа");
        }
    }, [orderLoadErrors]);

    const disabled = useMemo(() => {
        let hasIngredient = (ingredients && ingredients.length) || bun;
        let hasOrder = orderNumber !== null || orderLoad;
        return !hasIngredient || hasOrder;
    }, [bun, ingredients, orderNumber, orderLoad]);

   
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn && accToken ==="undefined") {
            dispatch(authGetUserAction() as any);
        }
    }, [userLoggedIn, accToken, dispatch]);


    const showOrder = useCallback(() => {
        if (!userLoggedIn) {
            navigate(URL_LOGIN, { replace: true });
        } else{

        const orderIngredients = [...ingredients];
        if (bun) {
            orderIngredients.push(bun, bun);
        }
        dispatch(addOrder(orderIngredients) as any);
    }
    }, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

    

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
