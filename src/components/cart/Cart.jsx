import React from 'react';
import styles from '../cart/cart.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';
import Ingredients from '../utils/prop-types';
import PropTypes from 'prop-types';


function Cart({ ingredient }) {

  const [ingredientDetails, setIngredientDetails] = React.useState({ isOpened: false, ingredient: null });

  function closeModals(e) {
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
    e.stopPropagation();
  }

  function getCartsData() {
    setIngredientDetails({ isOpened: true, ingredient: ingredient })
  }

  return (
    <li key={ingredient.id} className={styles.cart} onClick={getCartsData}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} ></img>
      <div className={styles.cartprice}>
        <p className={styles.cartcount}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cartdescription}>{ingredient.name}</p>
      {ingredientDetails.isOpened &&
        <Modal
          btnClose={closeModals}>
          <IngredientDetails title={`Детали ингредиента`} ingredientData={ingredientDetails.ingredient} closeModal={closeModals} />
        </Modal>}
    </li>
  );
}

Cart.propTypes = {
  ingredient: PropTypes.shape(Ingredients).isRequired
}

export default Cart;