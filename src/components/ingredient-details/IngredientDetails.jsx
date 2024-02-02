import React from 'react';
import styles from '../ingredient-details/ingredient-details.module.css';
import PropTypes from 'prop-types';
import Ingredients from '../../utils/prop-types';


function IngredientDetails({ingredientData }) {
    const { image_large, name, calories, carbohydrates, fat, proteins } = ingredientData;

    return (
        <div className={styles.ingredient}>
            <img className={styles.ingredient_image} src={image_large} alt='Ингредиент' />
            <p className="text text_type_main-medium">{name}</p>
            <ul className={styles.ingredient_listItem}>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Калории,ккал</p>
                    <p className={styles.ingredient_itemValue}>{calories}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Белки, г</p>
                    <p className={styles.ingredient_itemValue}>{carbohydrates}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Жиры, г</p>
                    <p className={styles.ingredient_itemValue}>{fat}</p>
                </li>
                <li className={styles.ingredient_item}>
                    <p className={styles.ingredient_itemText}>Углеводы, г</p>
                    <p className={styles.ingredient_itemValue}>{proteins}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredientData: PropTypes.shape(Ingredients).isRequired,
    closeModal: PropTypes.func.isRequired
}
export default IngredientDetails;