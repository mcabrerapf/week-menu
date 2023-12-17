import BuildMenuModal from '../../Components/Modals/BuildMenuModal';
import MealModal from '../../Components/Modals/MealModal';
import ShoppingListItemModal from '../../Components/Modals/ShopingListItemModal';
import MenuModal from '../../Components/Modals/MenuModal';
import IngredientModal from '../../Components/Modals/IngredientModal';
import DishModal from '../../Components/Modals/DishModal';
import DeleteModal from '../../Components/Modals/DeleteModal';

const getModalByType = (type) => {
  switch (type) {
    case 'ingredient':
      return IngredientModal;
    case 'dish':
      return DishModal;
    case 'menu':
      return MenuModal;
    case 'menuBuilder':
      return BuildMenuModal;
    case 'meal':
      return MealModal;
    case 'shopingListItem':
      return ShoppingListItemModal;
    case 'delete':
      return DeleteModal;

    default:
      return null;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getModalByType };
