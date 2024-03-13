export type TIngredients = {
  calories: number;
  carbohydrates: number;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  __v: number;
};

export type TBurgerConstructor = TIngredients & {
  id: string;
  index: number;
  uniqueId: string;
};
