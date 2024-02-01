import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { getIngredients } from '../utils/burger-api';
import { OrderContext } from '../services/orderContext';
import {IngredientsContext} from '../services/ingredientsContext'
import { sumReducer, sumInitialValue } from '../services/sumReducer';




function App() {



  const [state, setState] = React.useState({ apiData: [], success: false });

  const [ingredients, setIngredients] = React.useState([]);

  const [sumState, sumDispatcher] = React.useReducer(sumReducer, sumInitialValue);


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
            <section className={styles.section}>
              <IngredientsContext.Provider value={{data:state.apiData}}>
              <BurgerIngredients/>
              </IngredientsContext.Provider>
            </section>
            <section className={styles.section}>
              <OrderContext.Provider value={{
                data: state.apiData,
                ingredients, setIngredients, sumState, sumDispatcher
              }}>
                <BurgerConstructor />
              </OrderContext.Provider>
            </section>
          </>

        )
        }
      </main>


    </div>
  );
}



export default App;
