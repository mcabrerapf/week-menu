import { capitalizeFirstLetter } from '../helpers';

export const getModalHeader = (action, name, type) => {
  switch (action) {
    case 0:
      return `New ${type}`;
    case 1:
      return name;
    case 2:
      return `Edit ${capitalizeFirstLetter(name)}`;
    case 3:
      return `Delete ${capitalizeFirstLetter(name)}`;

    default:
      return capitalizeFirstLetter(name);
  }
};

export const test = () => {};
