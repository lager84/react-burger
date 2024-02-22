import {useMemo} from 'react';
import styles from '../ingredient-details/ingredient-details.module.css';
import PropTypes from 'prop-types';
import Ingredients from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getData } from '../../services/selectors';
import { loadApiIngredients } from '../../services/actions/load-api-ingredients';
import { LOADING_DATA, ERROR_DATA } from '../../utils/message';



function IngredientDetails({ ingredientData }) {
    
    //const { image_large, name, calories, carbohydrates, fat, proteins } = ingredientData;

    const dispatch = useDispatch();
    const params = useParams();
    const { data, dataLoading, dataHasErrors } = useSelector(getData);
    let itemTrue = useMemo(() => {
        if (ingredientData) {
            return ingredientData;
        } else if (params.id && data && data.length > 0) {
            return data.find(i => i._id === params.id);
        }
        return null;
    }, [ingredientData, params.id, data]);
    
    if (!itemTrue && !dataLoading && !dataHasErrors && params && params.id) {
        dispatch(loadApiIngredients());
    }

    

    return itemTrue ? (
        <div className={styles.ingredient}>
            <img className={styles.ingredient_image} src={itemTrue.image_large} alt='Ингредиент' />
            <p className="text text_type_main-medium">{itemTrue.name}</p>
            <ul className={styles.ingredient_listItem}>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Калории,ккал</p>
                    <p className={styles.ingredient_itemValue}>{itemTrue.calories}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Белки, г</p>
                    <p className={styles.ingredient_itemValue}>{itemTrue.carbohydrates}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Жиры, г</p>
                    <p className={styles.ingredient_itemValue}>{itemTrue.fat}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Углеводы, г</p>
                    <p className={styles.ingredient_itemValue}>{itemTrue.proteins}</p>
                </li>
            </ul>
        </div>
    ):(
        <p>
        {dataLoading ? LOADING_DATA : dataHasErrors ? ERROR_DATA : undefined}
        </p>
    )
}

IngredientDetails.propTypes = {
    ingredientData: PropTypes.shape(Ingredients).isRequired

}
export default IngredientDetails;