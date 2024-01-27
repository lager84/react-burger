import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { getIngredients } from '../utils/burger-api';




function App() {
  const [openOrderModals, setOpenOrderModals] = React.useState({ isOpened: false });
  const [state, setState] = React.useState({ apiData: [], success: false });
  const openOrderModal = () => {
    setOpenOrderModals({ ...openOrderModals, isOpened: true });
  }

  const closeModals = () => {
    setOpenOrderModals({ ...openOrderModals, isOpened: false });
  }


  /*const getData = () => {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((res) => { return res.ok ? res.json() : setState({ ...state, success: false }); })
      .then((data) => { setState({ apiData: data.data, success: data.success }) })
      .catch((error) => { console.log(error) })
  }*/



  React.useEffect(() => {
    getIngredients()
    .then((data) => { setState({ apiData: data.data, success: data.success }) })
  }, []);

  return (
    <div className={styles.divheader}>
      <AppHeader />
      <main className={styles.main}>
        {state.apiData.length && (
          <>
            <section className={styles.section}><BurgerIngredients data={state.apiData} /></section>
            <section className={styles.section}><BurgerConstructor data={state.apiData} openModals={openOrderModal} /></section>
          </>
        )
        }
      </main>

      {openOrderModals.isOpened &&
        <Modal
          btnClose={closeModals}
          title={'Детали заказа'}
          onOverlayClick={closeModals}
        >
          <OrderDetails btnClose={closeModals} />
        </Modal>}



    </div>
  );
}



export default App;
