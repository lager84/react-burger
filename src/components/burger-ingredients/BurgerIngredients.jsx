import { useMemo, useRef } from 'react';
import styles from '../burger-ingredients/burgerIngredients.module.css'
import { getData, getDispIngedients } from '../../services/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { BUN, SAUCE, MAIN, names } from '../../utils/ingrediebtsName';
import BurgerIngredientsTab from '../burger-ingredients-tab/BurgerIngredientsTab'
import { getBun, getConstructorIngredients, getTabsInfo } from '../../services/selectors';
import { SET_TAB } from '../../services/actions/tabs-info';
import { SET_DISP_INGREDIENT } from '../../services/actions/disp-ingredients'
import Cart from '../cart/Cart'
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails'




function BurgerIngredients() {

  const dispIngredient = useSelector(getDispIngedients);
  const { data } = useSelector(getData);
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients)
  const tabs = useSelector(getTabsInfo);
  const dispatch = useDispatch();



  const tabsGroup = useMemo(() => {
    let fdate = {};
    fdate[BUN] = data.filter(i => i.type === BUN);
    fdate[SAUCE] = data.filter(i => i.type === SAUCE);
    fdate[MAIN] = data.filter(i => i.type === MAIN);
    return fdate;
  }, [data]);


  const headersTabs = {};
  headersTabs[BUN] = useRef(null);
  headersTabs[SAUCE] = useRef(null);
  headersTabs[MAIN] = useRef(null);

  function tabChange(value) {
    headersTabs[value].current.scrollIntoView({ behavior: "smooth" });
  }

  function handleScroll(e) {
    const pos = e.currentTarget.scrollTop;
    const distance = [];
    for (let h of Object.values(headersTabs)) {
      const hPos = h.current.offsetTop;
      distance.push(Math.abs(pos - hPos));
    }
    const min = Math.min(...distance);
    const minIndex = distance.indexOf(min);
    const newTab = Object.keys(headersTabs)[minIndex];

    if (tabs !== newTab) {
      dispatch({ type: SET_TAB, tab: newTab });
    }
  }

  const countData = useMemo(() => {
    const res = {};
    if (bun) {
      res[bun._id] = 2;
    }
    for (let item of ingredients) {
      if (!(item._id in res)) {
        res[item._id] = 0;
      }
      res[item._id]++;
    }
    return res;
  }, [bun, ingredients]);

  function closeModals(e) {
    dispatch({ type: SET_DISP_INGREDIENT, item: null });
    e.stopPropagation();
  }

  return (

    <section className={styles.sectionsingredients}>
      <div className={styles.divroot}>
        <h2 className="text text_type_main-medium">
          Собери Бургер
        </h2>
        <BurgerIngredientsTab tabChange={tabChange} />

        <div className={styles.divcartgroup} onScroll={handleScroll}>
          {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
            <div key={typeIndex}>
              <h2 className="text text_type_main-medium mt-8" ref={headersTabs[type]}>{names[type]}</h2>
              <ul className={styles.ulgroup}>
                {tabsGroup[type].map((item) => (
                  <Cart key={item._id} ingredient={item} count={countData[item._id] === undefined ? 0 : countData[item._id]} />
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {dispIngredient &&
        <Modal title={`Детали ингредиента`}
          btnClose={closeModals}>
          <IngredientDetails ingredientData={dispIngredient} />
        </Modal>}
    </section>

  )
}



export default BurgerIngredients;
