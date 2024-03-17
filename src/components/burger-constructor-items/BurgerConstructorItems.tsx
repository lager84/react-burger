import { useRef , FC} from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { MOVE_INGREDIENTS } from '../../services/actions/burger-constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructorItems.module.css';
import { TBurgerConstructor } from '../../utils/type';

type TProps = {
    item:TBurgerConstructor;
    index:number;
    onDelete:(index:number)=>void;
}

const BurgerConstructorItems:FC<TProps> = ({ item, index, onDelete }) => 
{
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "sort",
        item: { index }
    });

    const [, drop] = useDrop({
        accept: "sort",
        drop(item:TProps) {
            if (index !== item.index) {
                dispatch({ type: MOVE_INGREDIENTS, index1: index, index2: item.index });
            }
        }
    });

    drag(drop(ref));

    return (
        <li className={styles.liIng} ref={ref}>
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



export default BurgerConstructorItems

