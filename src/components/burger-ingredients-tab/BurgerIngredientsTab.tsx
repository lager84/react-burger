import { useDispatch } from "../../hooks/redux";
import styles from "../burger-ingredients-tab/burgerIngredientsTab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_TAB } from "../../services/actions/tabs-info";
import { BUN, SAUCE, MAIN, names } from "../../utils/ingrediebtsName";
import { FC, useEffect, useState } from "react";

type TProps = {
  tabChange: (tab: string) => void;
  topCategory: string;
};

const BurgerIngredientsTab: FC<TProps> = ({ tabChange, topCategory }) => {
  //const tabs = useSelector(getTabsInfo);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("bun");

  function change(type: string) {
    dispatch({ type: SET_TAB, tab: type });
    tabChange(type);
    setCurrent(topCategory);
  }


  useEffect(() => {
    setCurrent(topCategory);
  }, [topCategory]);

  return (
    <div className={styles.divTabs}>
      <Tab value={BUN} active={current === BUN} onClick={change}>
        {names[BUN]}
      </Tab>
      <Tab value={SAUCE} active={current === SAUCE} onClick={change}>
        {names[SAUCE]}
      </Tab>
      <Tab value={MAIN} active={current === MAIN} onClick={change}>
        {names[MAIN]}
      </Tab>
    </div>
  );
};

export default BurgerIngredientsTab;
