import React from 'react';
import styles from '../burger-constructor/burgerConstructor.module.css'
import { DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function BurgerConstructor({data , openModals}) {
  
  const bun = data.filter(i => i.type === 'bun');
  const notBun = data.filter(i => i.type !== 'bun').slice(0, 6);





  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
      <div className={styles.libun}>
        <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={bun[0].price}
        thumbnail={bun[0].image}
      />
      </div>
      <ul className={styles.ulIng}>
        <li className={styles.liIng}>
      </li>   
      { notBun.map((i) =>{return(    
    <li key={i._id}  className={styles.liIng}> 
    <DragIcon type="primary" />
    <ConstructorElement
      isLocked={false}
      text={i.name}
      price={i.price}
      thumbnail={i.image}
  /> 
  </li>
  )} )}
  </ul>
      <div className={styles.libun}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={bun[0].price}
        thumbnail={bun[0].image}
      />
      </div>
      <div className={styles.divTotal}>
      <div className={styles.divTotalChild}>
      <span className={styles.pTotal}>1610</span>
      <CurrencyIcon type="primary"/>
      </div>
      <div>
      <Button htmlType="button" type="primary" size="large" onClick={openModals}>
    Оформить заказ
  </Button>
  </div>
     </div>
   </div>
    

    
  );
}
BurgerConstructor.propTypes = {
  openModals: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      _id: PropTypes.string
  }))
}
export default BurgerConstructor;
