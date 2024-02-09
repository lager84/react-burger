import { useDispatch, useSelector } from 'react-redux';
import styles from '../burger-ingredients-tab/burgerIngredientsTab.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { SET_TAB } from '../../services/actions/tabs-info';
import { BUN, SAUCE, NACH, names } from '../../utils/ingrediebtsName';
import { getTabsInfo } from '../../services/selectors';


function BurgerIngredientsTab({ tabChange }) {
  const tabs = useSelector(getTabsInfo);
  const dispatch = useDispatch();

  function change(type) {
    dispatch({ type: SET_TAB, tab: type });
    tabChange(type);
  }

  return (
    <div className={styles.divTabs}>
      <Tab value={BUN} active={tabs === BUN} onClick={change}>
        {names[BUN]}
      </Tab>
      <Tab value={SAUCE} active={tabs === SAUCE} onClick={change}>
        {names[SAUCE]}
      </Tab>
      <Tab value={NACH} active={tabs === NACH} onClick={change}>
        {names[NACH]}
      </Tab>
    </div>
  );
}

BurgerIngredientsTab.propTypes = {
  tabChange: PropTypes.func.isRequired
};

export default BurgerIngredientsTab;