import { useEffect } from 'react';
import styles from '../burger-constructor/burgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../utils/ingrediebtsName'
import Order from '../order/Order';
import { useDispatch, useSelector } from '../../hooks/redux';
import { SET_BUN, SET_SUM, DELETE_INGREDIENT,addIngridient } from '../../services/actions/burger-constructor';
import { getBun, getConstructorIngredients, getConstructorIngredientsSum } from '../../services/selectors';
import { useDrop } from 'react-dnd';
import BurgerConstructorItems from '../burger-constructor-items/BurgerConstructorItems';
import { TBurgerConstructor, TIngredients } from '../../utils/type';

function BurgerConstructor() {

  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients)
  const sum = useSelector(getConstructorIngredientsSum)



  const [, dropBunUp] = useDrop<TBurgerConstructor , unknown>({
    accept: BUN,
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    }
  });

  const [, dropBunDown] = useDrop<TBurgerConstructor, unknown>({
    accept: BUN,
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    }
  });

  const [, dropIngredient] = useDrop<TIngredients, unknown>({
    accept: [SAUCE, MAIN],
    drop(item) {
      dispatch(addIngridient(item));
    }
  });

  function deleteIngredient(index:number) {
    dispatch({ type: DELETE_INGREDIENT, index: index })
  }

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    sum += ingredients.reduce((sum:number, item:TBurgerConstructor) => sum += item.price, 0);
    dispatch({ type: SET_SUM, sum });
  }, [bun, ingredients, dispatch]);

  return (

    <div data-test="constr_bun" ref={dropBunUp} className={styles.divConstructor} >
      <div  className={styles.libun}>
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
      <ul data-test="ingrid" className={styles.ulIng} ref={dropIngredient}>
        {ingredients.length > 0 && ingredients.map((i:TBurgerConstructor, index:number) => {
          return (
            <BurgerConstructorItems key={i.uniqueId} item={i} index={index} onDelete={deleteIngredient} />
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
          <span data-test="order-price" className={styles.pTotal}>{sum}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Order />
      </div>
    </div>



  );

}


export default BurgerConstructor;
