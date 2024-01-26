import React from 'react';
import closeButtonImg from '../../images/close-button.png';
import styles  from '../ingredient-details/ingredient-details.module.css';


function IngredientDetails({ closeModal, title, ingredientData }) {
    const { image_large, name, calories, carbohydrates, fat, proteins } = ingredientData;

    return (
        <div className={styles.ingredient}>
            <div className={styles.ingredient_header}>
                <h2 className={styles.ingredient_title}>{title}</h2>
                <button onClick={closeModal} type='button' className={styles.ingredient_closeButton}><img src={closeButtonImg} alt='Закрыть окно' /></button>
            </div>
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

export default IngredientDetails;