import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { URL_PROFILE_ORDERS } from "../../utils/routes";
import { useDispatch } from "../../hooks/redux";
import { authLogoutAction } from "../../services/actions/auth";
import styles from "./profile.module.css";

function Profile() {
  const dispatch = useDispatch();

  const onLogoutHandler = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(authLogoutAction() as any);
  };

  return (
    <main className={styles.profile_panel}>
      <div className="page-container-profile-wrapper">
        <nav className="page-container-profile-sidebar ml-5 mr-15">
          <ul>
            <li>
              <NavLink to="" end>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_ORDERS}>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className={styles.bLogout}
                onClick={onLogoutHandler}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            В этом разделе можно изменить свои персональные данные
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
}

export default Profile;
