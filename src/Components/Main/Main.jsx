import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import Footer from '../Footer';
import View from '../View';
import { INGREDIENT_STRING } from '../../constants';

function Main({ signOut }) {
  return (
    <div className="main">
      <div className="main-view-container">
        {/* <WeekView hidden={view !== 0} />
        <DishesView hidden={view !== 1} /> */}
        {/* <IngredientsView hidden={view !== 2} /> */}
        <View name={INGREDIENT_STRING} />
      </div>
      <Footer signOut={signOut} />
    </div>
  );
}

Main.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Main;
