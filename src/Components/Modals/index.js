import {
  DELETE_STRING,
  DISH_STRING,
  INGREDIENT_STRING,
  LIST_FILTERS_STRING,
  MEAL_STRING,
  MENU_BUILDER_STRING,
  MENU_STRING,
  SHOPING_LIST_ITEM_STRING,
  WEEK_STRING,
} from '../../constants/STRINGS';

import DeleteModal from './DeleteModal';
import DishModal from './DishModal';
import IngredientModal from './IngredientModal';
import ListFiltersModal from './ListFiltersModal';
import MealModal from './MealModal';
import MenuBuilderModal from './MenuBuilderModal';
import MenuModal from './MenuModal';
import ShopingListItemModal from './ShopingListItemModal';
import WeekModal from './WeekModal';

const Modals = {
  [DELETE_STRING]: DeleteModal,
  [DISH_STRING]: DishModal,
  [INGREDIENT_STRING]: IngredientModal,
  [LIST_FILTERS_STRING]: ListFiltersModal,
  [MEAL_STRING]: MealModal,
  [MENU_BUILDER_STRING]: MenuBuilderModal,
  [MENU_STRING]: MenuModal,
  [SHOPING_LIST_ITEM_STRING]: ShopingListItemModal,
  [WEEK_STRING]: WeekModal,
};

export default Modals;
