import { useMemo, FC } from "react";
import styles from "../ingredient-details/ingredient-details.module.css";
import { useSelector} from "../../hooks/redux";
import { useParams } from "react-router";
import { getData } from "../../services/selectors";
import { LOADING_DATA, ERROR_DATA } from "../../utils/message";
import { TIngredients } from "../../utils/type";

type TProps = {
  ingredientData?: TIngredients;
};

const IngredientDetails: FC<TProps> = ({ ingredientData }) => {
  const params = useParams();
  const { data, loadData  , errorData } = useSelector(getData);
  let itemTrue = useMemo(() => {
    if (ingredientData) {
      return ingredientData;
    } else if (params.id && data && data.data.length > 0) {
      return data.data.find((i: TIngredients) => i._id === params.id);
    }
    return null;
  }, [ingredientData, params.id, data]);

  return itemTrue ? (
    <div className={styles.ingredient}>
      <img
        className={styles.ingredient_image}
        src={itemTrue.image_large}
        alt="Ингредиент"
      />
      <p className="text text_type_main-medium">{itemTrue.name}</p>
      <ul className={styles.ingredient_listItem}>
        <li className={styles.ingredient_item}>
          <p className={styles.ingredient_itemText}>Калории,ккал</p>
          <p className={styles.ingredient_itemValue}>{itemTrue.calories}</p>
        </li>
        <li className={styles.ingredient_item}>
          <p className={styles.ingredient_itemText}>Белки, г</p>
          <p className={styles.ingredient_itemValue}>
            {itemTrue.carbohydrates}
          </p>
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
  ) : (
    <p>{loadData ? LOADING_DATA : errorData  ? ERROR_DATA : undefined}</p>
  );
};

export default IngredientDetails;
