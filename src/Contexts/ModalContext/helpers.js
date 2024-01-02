import BuildMenuModal from '../../Components/Modals/BuildMenuModal';
import MealModal from '../../Components/Modals/MealModal';
import ShoppingListItemModal from '../../Components/Modals/ShopingListItemModal';
import MenuModal from '../../Components/Modals/MenuModal';
import IngredientModal from '../../Components/Modals/IngredientModal';
import DishModal from '../../Components/Modals/DishModal';
import DeleteModal from '../../Components/Modals/DeleteModal';
import {
  DELETE_STRING,
  DISH_STRING,
  INGREDIENT_STRING,
  MEAL_STRING,
  MENU_BUILDER_STRING,
  MENU_STRING,
  SHOPING_LIST_ITEM_STRING,
} from '../../constants';

const getModalByType = (type) => {
  switch (type) {
    case INGREDIENT_STRING:
      return IngredientModal;
    case DISH_STRING:
      return DishModal;
    case MENU_STRING:
      return MenuModal;
    case MENU_BUILDER_STRING:
      return BuildMenuModal;
    case MEAL_STRING:
      return MealModal;
    case SHOPING_LIST_ITEM_STRING:
      return ShoppingListItemModal;
    case DELETE_STRING:
      return DeleteModal;
    default:
      return null;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getModalByType };
