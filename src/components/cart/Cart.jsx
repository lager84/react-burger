import { useCallback } from 'react';
import styles from '../cart/cart.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { SET_DISP_INGREDIENT } from '../../services/actions/disp-ingredients';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL_INGREDIENTS } from '../../utils/routes';


function Cart({ ingredient, count }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCartsData = useCallback(() => {
    navigate(`${URL_INGREDIENTS}/${ingredient._id}`, { replace: true, state: { location: location, item: ingredient } });
    dispatch({ type: SET_DISP_INGREDIENT, item: ingredient });
  },[dispatch, navigate, location, ingredient]);

  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient
  });

  return (
    <li key={ingredient.id} className={styles.cart} ref={dragRef} onClick={getCartsData}>
      <Counter count={count} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} ></img>
      <div className={styles.cartprice}>
        <p className={styles.cartcount}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cartdescription}>{ingredient.name}</p>
    </li>
  );
}

Cart.propTypes = {
  ingredient: PropTypes.shape(Ingredients).isRequired,
  count: PropTypes.number.isRequired
}

export default Cart;