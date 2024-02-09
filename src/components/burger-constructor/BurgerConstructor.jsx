import { useEffect } from 'react';
import styles from '../burger-constructor/burgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, NACH } from '../../utils/ingrediebtsName'
import Order from '../order/Order';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUN, ADD_INGREDIENT, SET_SUM, DELETE_INGREDIENT } from '../../services/actions/burger-constructor';
import { getBun, getConstructorIngredients, getConstructorIngredientsSum } from '../../services/selectors';
import { useDrop } from 'react-dnd';
import BurgerConstructorItems from '../../components/burger-constructor-items/BurgerConstructorItems';
import { v4 as uuid } from 'uuid';




function BurgerConstructor() {

  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients)
  const sum = useSelector(getConstructorIngredientsSum)

  const [, dropBunUp] = useDrop({
    accept: BUN,
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    }
  });

  const [, dropBunDown] = useDrop({
    accept: BUN,
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    }
  });

  const [, dropIngredient] = useDrop({
    accept: [SAUCE, NACH],
    drop(item) {
      dispatch({ type: ADD_INGREDIENT, item: item });
    }
  });

  function deleteIngredient(index) {
    dispatch({ type: DELETE_INGREDIENT, index: index })
  }

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    sum += ingredients.reduce((sum, item) => sum += item.price, 0);
    dispatch({ type: SET_SUM, sum });
  }, [bun, ingredients, dispatch]);

  return (

    <div ref={dropBunUp} className={styles.divConstructor} >
      <div className={styles.libun}>
        {bun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        }
      </div>
      <ul className={styles.ulIng} ref={dropIngredient}>
        {ingredients.length > 0 && ingredients.map((i, index) => {
          return (
            <BurgerConstructorItems key={uuid()} item={i} index={index} onDelete={deleteIngredient} />
          )
        })}
      </ul>

      <div ref={dropBunDown} className={styles.libun}>
        {bun &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
      </div>
      <div className={styles.divTotal}>
        <div className={styles.divTotalChild}>
          <span className={styles.pTotal}>{sum}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Order />
      </div>
    </div>



  );

}


export default BurgerConstructor;
