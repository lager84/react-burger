import { useMemo, useRef, FC, useState, useCallback, useEffect } from "react";
import styles from "../burger-ingredients/burgerIngredients.module.css";
import { getData, getDispIngedients } from "../../services/selectors";
import { useDispatch, useSelector } from "../../hooks/redux";
import { BUN, SAUCE, MAIN, names } from "../../utils/ingrediebtsName";
import BurgerIngredientsTab from "../burger-ingredients-tab/BurgerIngredientsTab";
import {
  getBun,
  getConstructorIngredients,
} from "../../services/selectors";
import { SET_DISP_INGREDIENT } from "../../services/actions/disp-ingredients";
import Cart from "../cart/Cart";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { URL_ROOT } from "../../utils/routes";
import { useNavigate } from "react-router";
import { TIngredients } from "../../utils/type";

const useTopId = () => {
  const listRef = useRef<any>();
  const items = useRef<any>({});
  const [topId, setTopId] = useState("");

  const itemsRef = (el: any) => {
    if (el) items.current[el.id] = el;
  };

  const onScroll = useCallback(() => {
    const listTop = listRef.current.getBoundingClientRect().top;
    let id = "";
    let minDiff = Number.MAX_VALUE;
    for (let item in items.current) {
      const diff = Math.abs(
        items.current[item].ref.current.getBoundingClientRect().top - listTop
      );
      if (diff >= 0 && minDiff > diff) {
        minDiff = diff;
        id = items.current[item].id;
      }
    }
    if (id && id !== topId) setTopId(id);
  }, [topId, items, listRef]);

  return { listRef, itemsRef, onScroll, topId, items };
};

const BurgerIngredients: FC = () => {
  const dispIngredient = useSelector(getDispIngedients);
  const { data } = useSelector(getData);
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients);
  const dispatch = useDispatch();
  const { listRef, itemsRef, onScroll, topId } = useTopId();
  const [currentTab, setCurrentTab] = useState("bun");

  useEffect(() => {
    if (topId) setCurrentTab(topId);
  }, [topId]);

  const tabsGroup = useMemo(() => {
    let fdate: Record<string, Array<TIngredients>> = {};
    fdate[BUN] = data.data.filter((i: TIngredients) => i.type === BUN);
    fdate[SAUCE] = data.data.filter((i: TIngredients) => i.type === SAUCE);
    fdate[MAIN] = data.data.filter((i: TIngredients) => i.type === MAIN);
    return fdate;
  }, [data]);

  const headersTabs: Record<string, React.RefObject<HTMLHeadingElement>> = {};
  headersTabs[BUN] = useRef(null);
  headersTabs[SAUCE] = useRef(null);
  headersTabs[MAIN] = useRef(null);

  function tabChange(value: string) {
    headersTabs[value].current?.scrollIntoView({ behavior: "smooth" });
  }


  const countData = useMemo(() => {
    const res: Record<string, number> = {};
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

  const navigate = useNavigate();

  function closeModals(e?: Event) {
    navigate(URL_ROOT, { replace: true });
    dispatch({ type: SET_DISP_INGREDIENT, item: null });
    e?.stopPropagation();
  }

  useEffect(() => {
    const topCategory = data.data?.find(
      (ingredient: TIngredients) => ingredient._id === topId
    )?.type;
    if (topCategory) setCurrentTab(topCategory);
  }, [data.data , topId]);

  return (
    <section className={styles.sectionsingredients}>
      <div className={styles.divroot}>
        <h2 className="text text_type_main-medium">Собери Бургер</h2>
        <BurgerIngredientsTab topCategory={currentTab} tabChange={tabChange} />

        <div className={styles.divcartgroup} onScroll={onScroll} ref={listRef}>
          {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
            <div key={typeIndex}>
              <h2
                className="text text_type_main-medium mt-8"
                ref={headersTabs[type]}
              >
                {names[type]}
              </h2>
              <ul className={styles.ulgroup}>
                {tabsGroup[type].map((item: TIngredients) => (
                  <Cart
                    key={item._id}
                    itemsRef={itemsRef}
                    ingredient={item}
                    count={
                      countData[item._id] === undefined
                        ? 0
                        : countData[item._id]
                    }
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {dispIngredient && (
        <Modal title={`Детали ингредиента`} btnClose={closeModals}>
          <IngredientDetails ingredientData={dispIngredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
