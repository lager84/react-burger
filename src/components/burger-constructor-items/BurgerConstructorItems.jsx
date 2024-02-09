import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { MOVE_INGREDIENTS } from '../../services/actions/burger-constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructorItems.module.css';
import PropTypes from 'prop-types';
import Ingredients from '../../utils/prop-types';


function BurgerConstructorItems({ item, index, onDelete }) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "sort",
        item: { index }
    });

    const [, drop] = useDrop({
        accept: "sort",
        drop(item) {
            if (index !== item.index) {
                dispatch({ type: MOVE_INGREDIENTS, index1: index, index2: item.index });
            }
        }
    });

    drag(drop(ref));

    return (
        <li className={styles.liIng} ref={ref} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onDelete(index)}
            />
        </li>
    );


}

BurgerConstructorItems.propTypes = {
    item: PropTypes.shape(Ingredients).isRequired,
    index: PropTypes.number,
    onDelete: PropTypes.func.isRequired
}


export default BurgerConstructorItems

