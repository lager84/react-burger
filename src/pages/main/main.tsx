import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import { useSelector } from "react-redux";
import { getData } from "../../services/selectors";
import { ERROR_DATA } from "../../utils/message";
import Loader from "../../components/loader/Loader";

function MainPage() {
  const { data, loadData, errorData } = useSelector(getData);
 
  return (
    <>
      {loadData || errorData ? (
        <section>
          <p>{loadData ? <Loader /> : errorData ? ERROR_DATA : null}</p>
        </section>
      ) : data && data.length > 0 ? (
        <div className={styles.divheader}>
          <main className={styles.main}>
            <section className={styles.section}>
              <BurgerIngredients />
            </section>
            <section className={styles.section}>
              <BurgerConstructor />
            </section>
          </main>
        </div>
      ) : null}
    </>
  );
}

export default MainPage;
