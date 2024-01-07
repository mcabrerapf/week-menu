/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import {
  MainContext,
} from '../../Contexts';
// import { useLongPress } from '../../Hooks';
import {
  DISH_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
  MENU_BUILDER_STRING,
} from '../../constants/STRINGS';
import Button from '../Button';
import Icon from '../Icon';

function Footer() {
  const {
    view, setContextState,
  } = useContext(MainContext);
  // const { addToast } = useContext(ToastContext);

  // const handleCopyList = (listName) => {
  //   // Enable to copy db list
  //   if (listName === MENU_STRING) return;
  //   const items = listName === DISH_STRING ? dishes : ingredients;
  //   navigator.clipboard.writeText(JSON.stringify(items));
  //   addToast(`Copied ${listName} list to clipboard`, 'info');
  // };

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  return (
    <footer className="footer row w-f">
      <Button
        value={MENU_BUILDER_STRING}
        modifier="icon"
        fakeDisabled={view !== MENU_BUILDER_STRING}
        onClick={() => handleOnClick(MENU_BUILDER_STRING)}
      >
        <Icon iconName="calendar" />
      </Button>
      <Button
        // {...useLongPress({
        //   onLongPress: () => handleCopyList(MENU_STRING),
        // })}
        value={MENU_STRING}
        modifier="icon"
        fakeDisabled={view !== MENU_STRING}
        onClick={() => handleOnClick(MENU_STRING)}
      >
        <Icon iconName="menu" />
      </Button>
      <Button
        // {...useLongPress({
        //   onLongPress: () => handleCopyList(DISH_STRING),
        // })}
        value={DISH_STRING}
        modifier="icon"
        fakeDisabled={view !== DISH_STRING}
        onClick={() => handleOnClick(DISH_STRING)}
      >
        <Icon iconName="dish" />
      </Button>
      <Button
        // {...useLongPress({
        //   onLongPress: () => handleCopyList(INGREDIENT_STRING),
        // })}
        value={INGREDIENT_STRING}
        modifier="icon"
        fakeDisabled={view !== INGREDIENT_STRING}
        onClick={() => handleOnClick(INGREDIENT_STRING)}
      >
        <Icon iconName="ingredient" />
      </Button>
    </footer>
  );
}

export default Footer;
