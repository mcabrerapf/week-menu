/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  IngredientIcon, MenuBuilderIcon, MenuIcon, DishIcon,
} from '../Icons';
import './Footer.css';
import {
  MainContext,
} from '../../Contexts/MainContext';
import { ToastContext } from '../../Contexts/ToastContext';
import {
  DISH_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
  MENU_BUILDER_STRING,
} from '../../constants';
import Button from '../Button';
import { useLongPress } from '../../Hooks';

function Footer() {
  const {
    view, dishes, ingredients, setContextState,
  } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  const handleCopyList = (listName) => {
    if (listName === 'menu') return;
    const items = listName === 'dish' ? dishes : ingredients;
    navigator.clipboard.writeText(JSON.stringify(items));
    addToast(`Copied ${listName} list to clipboard`, 'info');
  };

  const checkIfSelected = (check) => (view === check ? 'icon-only selected' : 'icon-only');

  return (
    <footer className="footer">
      {/* <div className="footer-buttons"> */}
      <div className="footer-buttons">
        <Button
          value={MENU_BUILDER_STRING}
          modifier={checkIfSelected(MENU_BUILDER_STRING)}
          onClick={() => handleOnClick(MENU_BUILDER_STRING)}
        >
          <MenuBuilderIcon />
        </Button>
        <Button
          {...useLongPress({
            onLongPress: () => handleCopyList(MENU_STRING),
          })}
          value={MENU_STRING}
          modifier={checkIfSelected(MENU_STRING)}
          onClick={() => handleOnClick(MENU_STRING)}
        >
          <MenuIcon />
        </Button>
        <Button
          {...useLongPress({
            onLongPress: () => handleCopyList(DISH_STRING),
          })}
          value={DISH_STRING}
          modifier={checkIfSelected(DISH_STRING)}
          onClick={() => handleOnClick(DISH_STRING)}
        >
          <DishIcon />
        </Button>
        <Button
          {...useLongPress({
            onLongPress: () => handleCopyList(INGREDIENT_STRING),
          })}
          value={INGREDIENT_STRING}
          modifier={checkIfSelected(INGREDIENT_STRING)}
          onClick={() => handleOnClick(INGREDIENT_STRING)}
        >
          <IngredientIcon />
        </Button>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Footer;
