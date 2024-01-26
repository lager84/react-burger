import React from 'react';
import styles from '../burger-ingredients/burgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import CartGroup from '../cart-group/CartGroup';





function BurgerIngredients({data}) {
  
  const [current, setCurrent] = React.useState('one')
  const bun = data.filter(i => i.type === 'bun');
  const sauce = data.filter(i=> i.type === 'sauce');
  const nach = data.filter(i=> i.type === 'main');

  
  
 

  return (
    <>
    <section className={styles.sectionsingredients}>
    <div className={styles.divroot}>
    <h2 className="text text_type_main-medium">
Собери Бургер
    </h2>
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
      Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
      Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
      Начинки
      </Tab>
    </div>
    <div className={styles.divcartgroup}>
 <CartGroup datacart={bun}  title={"Булки"} />
 <CartGroup datacart={sauce}  title={"Соусы"} />
 <CartGroup datacart={nach}  title={"Начинки"}/>
    </div>
    </div>
    </section>  
      </>
  )
  }

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    }))
}

export default BurgerIngredients;
