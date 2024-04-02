import React, {FC} from "react";
import { useSelector } from "../../hooks/redux";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../app-header/appheader.module.css";
import { URL_PROFILE, URL_ROOT, URL_LENTA } from "../../utils/routes";
import HeaderIcon from "../header-icon/HeaderIcon";
import { Link } from "react-router-dom";
import { getAuth } from "../../services/selectors";

const AppHeader:FC = () => {
  const { user } = useSelector(getAuth);

  return (
    <header className={styles.header}>
      <div className={styles.divcontainer}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li>
              <HeaderIcon href={URL_ROOT} icon={BurgerIcon}>
                Конструктор
              </HeaderIcon>
            </li>
            <li>
              <HeaderIcon href={URL_LENTA} icon={ListIcon}>
                Лента заказов
              </HeaderIcon>
            </li>
          </ul>
        </nav>

        <div className={styles.center}>
          <Link to={URL_ROOT}>
            <Logo />
          </Link>
        </div>

        <div className={styles.right}>
          <HeaderIcon href={URL_PROFILE} icon={ProfileIcon}>
            {!user ? "Личный кабинет" : user.name}
          </HeaderIcon>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
