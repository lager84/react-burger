import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import { SET_DISP_INGREDIENT } from "../../services/actions/disp-ingredients";
import { useDispatch } from "../../hooks/redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  MainPage,
  IngredientPage,
  Profile,
  ProfileEdit,
  ProfileOrders,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  NotFound404,
  FeedPage, 
  OrderPage
} from "../../pages";
import {
  URL_ROOT,
  URL_INGREDIENTS,
  URL_LOGIN,
  URL_REGISTER,
  URL_RESET_PASSWORD,
  URL_FORGOT_PASSWORD,
  URL_PROFILE,
  URL_PROFILE_ORDERS,
  URL_ANY,
  URL_FEED
} from "../../utils/routes";
import { authGetUserAction } from "../../services/actions/auth";
import ProtectedRoute from "../protected-route";
import { getCookie } from "../../utils/cookie";
import { loadApiIngredients } from "../../services/actions/load-api-ingredients";
import Modal from '../modal/Modal';
import OrderInfo from '../order-info/order-info';


function App() {
  const accToken = getCookie("accessToken");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const stateLocation = location.state && location.state.location;
  const item = location.state && location.state.item;

  const closeModalDetail = () => {
    navigate(-1);
  }


  useEffect(() => {
    dispatch({ type: SET_DISP_INGREDIENT, item: item });
  }, [dispatch, item]);

  useEffect(() => {
    if (accToken) {
      dispatch(authGetUserAction() as any);
    }
  }, [dispatch, accToken]);

  useEffect(() => {
    dispatch(loadApiIngredients() as any);
  }, [dispatch]);


  return (
    <div className={styles.divheader}>
      <AppHeader />
      <div className={styles.main}>
        <Routes location={stateLocation || location}>
          <Route path={URL_ROOT} element={<MainPage />} />
          <Route path={URL_FEED} element={<FeedPage />} />
          <Route path={`${URL_FEED}/:id`} element={<OrderPage />} />
          <Route
            path={URL_LOGIN}
            element={<ProtectedRoute onlyUnAuth={true} element={<Login />} />}
          />
          <Route
            path={URL_FORGOT_PASSWORD}
            element={
              <ProtectedRoute onlyUnAuth={true} element={<ForgotPassword />} />
            }
          />
          <Route
            path={URL_RESET_PASSWORD}
            element={
              <ProtectedRoute onlyUnAuth={true} element={<ResetPassword />} />
            }
          />
          <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
          <Route
            path={URL_REGISTER}
            element={
              <ProtectedRoute onlyUnAuth={true} element={<Register />} />
            }
          />
          <Route
            path={URL_PROFILE}
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route index element={<ProfileEdit />} />
            {/* <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} /> */}
            <Route path={URL_PROFILE_ORDERS} element={<OrderPage />} />
            <Route path={URL_ANY} element={<NotFound404 />} />
          </Route>
          <Route path={URL_ANY} element={<NotFound404 />} />
        </Routes>
        {stateLocation &&
                    <Routes>
                        <Route path={`${URL_FEED}/:id`} element={
                            <Modal btnClose={closeModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                        <Route path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`} element={
                            <Modal btnClose={closeModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                    </Routes>
        }
      </div>
    </div>
  );
}

export default App;
