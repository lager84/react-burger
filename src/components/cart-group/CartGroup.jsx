import React from 'react';
import styles from '../cart-group/cart-group.module.css'
import Cart from '../cart/Cart';
import PropTypes from 'prop-types';
import Ingredients from '../../utils/prop-types';


function CartGroup({ datacart, title }) {



  return (
    <div>
      <h3>{title}</h3>
      <ul className={styles.cartgroup}>
        {datacart.map((c) => { return (<Cart key={c._id} ingredient={c} />) })}
      </ul>
    </div>
  );
}

CartGroup.propTypes = {
  datacart: PropTypes.arrayOf(PropTypes.shape(Ingredients).isRequired).isRequired,
  title: PropTypes.string.isRequired
}

export default CartGroup