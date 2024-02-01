import React from 'react';
import styles from '../burger-ingredients/burgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CartGroup from '../cart-group/CartGroup';
import {IngredientsContext} from '../services/ingredientsContext'






function BurgerIngredients() {

  const { data } = React.useContext(IngredientsContext);
  const [current, setCurrent] = React.useState('bun')
  const bun = data.filter(i => i.type === 'bun');
  const sauce = data.filter(i => i.type === 'sauce');
  const nach = data.filter(i => i.type === 'main');





  return (
    <>
      <section className={styles.sectionsingredients}>
        <div className={styles.divroot}>
          <h2 className="text text_type_main-medium">
            Собери Бургер
          </h2>
          <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="nach" active={current === 'nach'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
          <div className={styles.divcartgroup}>
            <CartGroup datacart={bun} title={"Булки"} />
            <CartGroup datacart={sauce} title={"Соусы"} />
            <CartGroup datacart={nach} title={"Начинки"} />
          </div>
        </div>
      </section>
    </>
  )
}



export default BurgerIngredients;
