import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../app-header/appheader.module.css'
import PropTypes from 'prop-types';



function AppHeader() {



  const NavBar = (props) => {
    return (
      <header className={styles.header}>
        {props.children}
      </header>
    );
  }

  const Menu = (props) => {
    return (
      <nav className={styles.nav}>
        {props.children}
      </nav>
    );
  }
  const MenuItem = (props) => {
    return (
      <ul>
        <li className={styles.ul}>
          <a className={props.activ} href='#'>{props.icon}{props.text}</a>
        </li>
      </ul>
    );
  }

  return (
    <NavBar>
      <Menu>
        <MenuItem text="Конструктор" icon={<BurgerIcon type="primary" />} />
        <MenuItem text="Лента заказов" activ={styles.notactiv} icon={<ListIcon type="secondary" />} />
      </Menu>
      <Logo />
      <div className={styles.divusers}>
        <Menu>
          <MenuItem text="Личный кабинет" activ={styles.notactiv} icon={<ProfileIcon type="secondary" />} />
        </Menu>
      </div>
    </NavBar>
  );
}

AppHeader.propTypes = {
  props: PropTypes.shape({
    children: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    activ: PropTypes.string.isRequired
  }
  )


}

export default AppHeader
