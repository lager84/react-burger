import React from 'react';
import styles from '../cart-group/cart-group.module.css'
import Cart from '../cart/Cart';


function CartGroup ({datacart, title }){


      
    return(
    <div>
      <h3>{title}</h3>
        <ul className={styles.cartgroup}>
          { datacart.map((c) => {return (<Cart  key={c._id} {...c} />)})}
        </ul>
    </div>
      );}

export default CartGroup