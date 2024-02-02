import React from 'react';
import styles from '../burger-constructor/burgerConstructor.module.css'
import { DragIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/orderContext';
import { BUN } from '../../utils/ingrediebtsName'
import Order from '../order/Order';




function BurgerConstructor() {

  const [bun, setBun] = React.useState(null);

  const {data,ingredients, setIngredients, sumDispatcher, sumState } = React.useContext(OrderContext);



  React.useEffect(() => {
    const buns = data.find(i => i.type === BUN);
    setBun(buns);
    const notBun = data.filter(i => i.type !== BUN).slice(0, 6);
    setIngredients(notBun);
  }, [data, setBun, setIngredients]);


  React.useEffect(() => {
    if (bun) {
      const total = bun.price * 2 + ingredients.reduce((sum, item) => sum += item.price, 0);
      sumDispatcher({ type: 'set', value: total });
    }
  }, [bun, ingredients, sumDispatcher]);



  return bun && (

    <div className={styles.divConstructor} >
      <div className={styles.libun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.ulIng}>
        <li className={styles.liIng}>
        </li>
        {ingredients.map((i) => {
          return (
            <li key={i._id} className={styles.liIng}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={i.name}
                price={i.price}
                thumbnail={i.image}
              />
            </li>
          )
        })}
      </ul>
      <div className={styles.libun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.divTotal}>
        <div className={styles.divTotalChild}>
          <span className={styles.pTotal}>{sumState.sum}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Order />
      </div>
    </div>



  );
}


export default BurgerConstructor;
