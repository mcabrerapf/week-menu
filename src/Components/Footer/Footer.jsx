import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import { MainContext, useMainContext } from '../../Context';
import {
  DISHES_STRING, DISH_STRING, INGREDIENTS_STRING, INGREDIENT_STRING, MENUS_STRING, MENU_STRING,
} from '../../constants';
import { capitalizeFirstLetter } from '../helpers';
import Button from '../Button';

function Footer({ signOut }) {
  const { view, setContextState } = useMainContext(MainContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  const checkIfSelected = (check) => (view === check ? 'selected' : '');

  return (
    <footer className="footer">
      <div className="footer-buttons">
        <div className="view-buttons">
          <Button
            modifier={checkIfSelected(MENU_STRING)}
            handleOnClick={() => handleOnClick(MENU_STRING)}
            buttonText={capitalizeFirstLetter(MENUS_STRING)}
          />
          <Button
            modifier={checkIfSelected(DISH_STRING)}
            handleOnClick={() => handleOnClick(DISH_STRING)}
            buttonText={capitalizeFirstLetter(DISHES_STRING)}
          />
          <Button
            modifier={checkIfSelected(INGREDIENT_STRING)}
            handleOnClick={() => handleOnClick(INGREDIENT_STRING)}
            buttonText={capitalizeFirstLetter(INGREDIENTS_STRING)}
          />
        </div>
        <Button
          modifier="signout-button"
          handleOnClick={signOut}
        >
          <i className="fa fa-sign-out" aria-hidden="true" />
        </Button>

      </div>
    </footer>
  );
}

Footer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Footer;
