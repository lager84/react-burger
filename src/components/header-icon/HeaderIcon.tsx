import { NavLink } from "react-router-dom";
import styles from "../header-icon/header-icon.module.css";
import { FC } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

type TProps = {
  href: string;
  children: string;
  icon: ({ type }: TIconProps) => JSX.Element;
};

const HeaderIcon: FC<TProps> = ({ icon: Icon, href, children }) => {
  return (
    <NavLink to={href} className={styles.link}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default ml-2 ${
              isActive ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default HeaderIcon;
