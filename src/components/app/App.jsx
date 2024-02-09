import { useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import { loadApiIngredients } from '../../services/actions/load-api-ingredients';
import { getData } from '../../services/selectors';

const LOADING_DATA = "Идет загрузка...";

const ERROR_DATA = "Ошибка при загрузке данных с сервера";

function App() {

  const { data, loadData, errorData } = useSelector(getData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadApiIngredients());
  }, [dispatch]);



  return (
    <>
      {(loadData || errorData) ? (
        <section>
          <p >
            {loadData ? LOADING_DATA : errorData ? ERROR_DATA : null}
          </p>
        </section>)
        : (data && data.length > 0) ? (
          <div className={styles.divheader}>
            <AppHeader />
            <main className={styles.main}>
              <section className={styles.section}>
                <BurgerIngredients />
              </section>
              <section className={styles.section}>
               <BurgerConstructor />
              </section>
            </main>
          </div>
        ) : null
      }
    </>
  )

    }




  export default App;
