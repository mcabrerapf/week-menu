import { capitalizeFirstLetter } from '../helpers';

export const getModalHeader = (action, name, type) => {
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

export const test = () => {};
