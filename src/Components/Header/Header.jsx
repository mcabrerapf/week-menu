/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import {
  MainContext,
} from '../../Contexts/MainContext';
import { ToastContext } from '../../Contexts/ToastContext';
import {
  DISH_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
} from '../../constants';
import Button from '../Button';
import { useLongPress } from '../../Hooks';

function Header() {
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

  const checkIfSelected = (check) => (view === check ? 'selected' : '');

  return (
    <header className="header">
      <div className="header-buttons">
        <div className="view-buttons">
          <Button
            {...useLongPress({
              onLongPress: () => handleCopyList(MENU_STRING),
            })}
            value={MENU_STRING}
            modifier={checkIfSelected(MENU_STRING)}
            buttonIcon={MENU_STRING}
            onClick={() => handleOnClick(MENU_STRING)}
          />
          <Button
            {...useLongPress({
              onLongPress: () => handleCopyList(DISH_STRING),
            })}
            value={DISH_STRING}
            modifier={checkIfSelected(DISH_STRING)}
            buttonIcon={DISH_STRING}
            onClick={() => handleOnClick(DISH_STRING)}
          />
          <Button
            {...useLongPress({
              onLongPress: () => handleCopyList(INGREDIENT_STRING),
            })}
            value={INGREDIENT_STRING}
            modifier={checkIfSelected(INGREDIENT_STRING)}
            buttonIcon={INGREDIENT_STRING}
            onClick={() => handleOnClick(INGREDIENT_STRING)}
          />
        </div>
        {/* <Button
          modifier="signout-button"
          onClick={signOut}
        >
          <i className="fa fa-sign-out" aria-hidden="true" />
        </Button> */}

      </div>
    </header>
  );
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Header;
