import { capitalizeFirstLetter } from '../../Components/helpers';
import { ListModal } from './Modals';
import BuildMenuModal from './Modals/BuildMenuModal';
import MealModal from './Modals/MealModal/MealModal';
import ShoppingListItemModal from './Modals/ShopingListItemModal';

const getModalHeader = (action, name, type) => {
  switch (action) {
    case 0:
      return `New ${capitalizeFirstLetter(type)}`;
    case 1:
      return name;
    case 2:
      return `Editing ${capitalizeFirstLetter(type)}`;
      // case 3:
      //   return `Delete ${capitalizeFirstLetter(name)}`;

    default:
      return capitalizeFirstLetter(name);
  }
};

const getModalByType = (type) => {
  switch (type) {
    case 'list':
      return ListModal;
    case 'buildMenu':
      return BuildMenuModal;
    case 'meal':
      return MealModal;
    case 'shopingListItem':
      return ShoppingListItemModal;

    default:
      return null;
  }
};

export { getModalHeader, getModalByType };
