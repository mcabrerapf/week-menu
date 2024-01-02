/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
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
    if (listName === MENU_STRING) return;
    const items = listName === DISH_STRING ? dishes : ingredients;
    navigator.clipboard.writeText(JSON.stringify(items));
    addToast(`Copied ${listName} list to clipboard`, 'info');
  };

  const checkIfSelected = (check) => (view === check ? 'icon' : 'icon bgc-gr');

  return (
    <footer className="footer bot row w-f">
      <Button
        value={MENU_BUILDER_STRING}
        modifier={checkIfSelected(MENU_BUILDER_STRING)}
        onClick={() => handleOnClick(MENU_BUILDER_STRING)}
      >
        <Icon iconName="calendar" />
      </Button>
      <Button
        {...useLongPress({
          onLongPress: () => handleCopyList(MENU_STRING),
        })}
        value={MENU_STRING}
        modifier={checkIfSelected(MENU_STRING)}
        onClick={() => handleOnClick(MENU_STRING)}
      >
        <Icon iconName="menu" />
      </Button>
      <Button
        {...useLongPress({
          onLongPress: () => handleCopyList(DISH_STRING),
        })}
        value={DISH_STRING}
        modifier={checkIfSelected(DISH_STRING)}
        onClick={() => handleOnClick(DISH_STRING)}
      >
        <Icon iconName="dish" />
      </Button>
      <Button
        {...useLongPress({
          onLongPress: () => handleCopyList(INGREDIENT_STRING),
        })}
        value={INGREDIENT_STRING}
        modifier={checkIfSelected(INGREDIENT_STRING)}
        onClick={() => handleOnClick(INGREDIENT_STRING)}
      >
        <Icon iconName="ingredient" />
      </Button>
    </footer>
  );
}

Footer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Footer;
