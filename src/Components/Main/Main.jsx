import React from 'react';
// import PropTypes from 'prop-types';
import './Main.css';
import View from '../View';
import WeekView from '../WeekView';
import { DISH_STRING, INGREDIENT_STRING } from '../../constants';

function Main() {
  return (
    <div className="main">
      <WeekView />
      <View name={DISH_STRING} />
      <View name={INGREDIENT_STRING} />
    </div>
  );
}

// Main.propTypes = {
//   signOut: PropTypes.func.isRequired,
// };

export default Main;
