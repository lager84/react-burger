import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "../../hooks/redux";
import { getData } from "../../services/selectors";
import { TIngredients, TOrder } from "../../utils/type";
import styles from './orders-list-item.module.css';

type TProp = {
    order: TOrder,
    isPerson?: boolean
};

const OrdersListItem: FC<TProp> = ({order, isPerson}) => {
    const location = useLocation(); 
    const countItemsMax = 6;
  
    const { data: ingredients } = useSelector(getData);
  
    const orderStatus = useMemo(
      () => order.status === 'done'
        ? 'Выполнен' 
        : order.status === 'created' 
          ? 'Создан'
          : 'Готовится'
      , [order]
    );
  
    const colorStatus = useMemo(
      () => order.status === 'done' ? styles.status_done : styles.status_default
      , [order]
    );
  
    const orderIngredients = useMemo(
      () => order.ingredients.map((elemId: string) => {
        return ingredients.data.find((elem: TIngredients) => elem._id === elemId)
      }), [ingredients, order]
    );
  
    const firstSixItems = useMemo(
      () => orderIngredients.slice(0, countItemsMax)
      , [orderIngredients]
    );
  
    const orderAmount = useMemo(
      () => orderIngredients.reduce( (amount: number, elem: TIngredients | undefined) => elem!.price + amount, 0)
      , [orderIngredients]
    );
  

    return (
        <Link className={`${styles.order}`}
        to={`${location.pathname}/${order.number}`}
        state={{ location: location }}
      > 
        <div className='m-6'>
          <div className={styles.order_header}>
            <p className='text text_type_digits-default'>#{order.number}</p>
            <p className={styles.date_order}><FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' /></p>
          </div>
        </div>
        <p className={`${styles.title_order} text text_type_main-medium`}>
          {order.name}
        </p>
        {isPerson && orderStatus &&
          <p className={`${styles.status_order} ${colorStatus} text text_type_main-default`}>
            {orderStatus}
          </p>
        }
        <div className={styles.filling}>
          <div className={styles.images_selection}>
            {firstSixItems && firstSixItems.map((item: TIngredients | undefined, i: number) => {
              let countHide = order.ingredients.length - countItemsMax;
              return (
                <div
                  key={i}
                  
                  className={styles.image_fill}>
                  <img                   
                      src={item!.image_mobile}
                      alt={item!.name}
                      className={styles.image_position} />
                  {countHide > 0 && i === (countItemsMax - 1) &&
                    <span className={`${styles.count_hidden} text text_type_main-default`}>+{countHide}</span>
                  }
                </div>
              )
            })}
            <div className={styles.price}>
             <span className={`text text_type_digits-default`}>{orderAmount}</span>
            <CurrencyIcon type="primary" />
            </div>
          </div>
          {/* <div className={styles.price}>
            <span className={`text text_type_digits-default`}>{orderAmount}</span>
            <CurrencyIcon type="primary" />
          </div> */}
        </div>
      </Link>
    );
}

export default OrdersListItem;