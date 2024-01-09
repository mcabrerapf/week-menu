import MenuBuilderModal from '../Modals/MenuBuilderModal';
import MealModal from '../Modals/MealModal';
import ShoppingListItemModal from '../Modals/ShopingListItemModal';
import MenuModal from '../Modals/MenuModal';
import IngredientModal from '../Modals/IngredientModal';
import DishModal from '../Modals/DishModal';
import DeleteModal from '../Modals/DeleteModal';
import ListFiltersModal from '../Modals/ListFiltersModal';
import WeekModal from '../Modals/WeekModal';
import {
  DELETE_STRING,
  DISH_STRING,
  INGREDIENT_STRING,
  MEAL_STRING,
  MENU_BUILDER_STRING,
  MENU_STRING,
  SHOPING_LIST_ITEM_STRING,
  LIST_FILTERS_STRING,
  WEEK_STRING,
} from '../../constants/STRINGS';

const getModalByType = (type) => {
  switch (type) {
    case INGREDIENT_STRING:
      return IngredientModal;
    case DISH_STRING:
      return DishModal;
    case MENU_STRING:
      return MenuModal;
    case MENU_BUILDER_STRING:
      return MenuBuilderModal;
    case MEAL_STRING:
      return MealModal;
    case SHOPING_LIST_ITEM_STRING:
      return ShoppingListItemModal;
    case DELETE_STRING:
      return DeleteModal;
    case LIST_FILTERS_STRING:
      return ListFiltersModal;
    case WEEK_STRING:
      return WeekModal;
    default:
      return () => {};
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getModalByType };
