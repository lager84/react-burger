import React from 'react';
import styles from '../cart/cart.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';        


function Cart (props){

    const [ingredientDetails, setIngredientDetails] = React.useState({ isOpened: false, ingredient: null });
    
    function closeModals (e){
        setIngredientDetails({ ...ingredientDetails, isOpened: false });
        e.stopPropagation();
      }
    
    function getCartsData(){
        setIngredientDetails({ isOpened: true, ingredient: props })
      }

      
      

    return(
      <li key={props.id} className={styles.cart} onClick={getCartsData}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.image} alt={props.name} ></img>
      <div className={styles.cartprice}>
          <p className={styles.cartcount}>{props.price}</p>
          <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cartdescription}>{props.name}</p>
      {ingredientDetails.isOpened &&
      <Modal
          title={'Детали ингредиента'}
          onOverlayClick={closeModals}
          btnClose={closeModals}>
          <IngredientDetails title={`Детали ингредиента`} ingredientData={ingredientDetails.ingredient} closeModal={closeModals}/>
      </Modal>} 
  </li>
    );
   }


   export default Cart;