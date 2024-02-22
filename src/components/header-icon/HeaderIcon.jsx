import { NavLink } from 'react-router-dom';
import styles from '../header-icon/header-icon.module.css';
import PropTypes from 'prop-types';



function HeaderIcon({ icon: Icon, href ,children}){
    return (
        <NavLink to={href} className={styles.link}>
            {({ isActive }) => (
                <>
                    <Icon type={isActive ? "primary" : "secondary"} />
                    <span className={`text text_type_main-default ml-2 ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
                        {children}
                    </span>
                </>
            )}
        </NavLink>
    );
}

HeaderIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};





export default HeaderIcon