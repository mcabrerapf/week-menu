import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import Footer from '../Footer';
import View from '../View';
import WeekView from '../WeekView';
import { DISH_STRING, INGREDIENT_STRING } from '../../constants';

function Main({ signOut }) {
  return (
    <div className="main">
      <div className="main-view-container">
        <WeekView />
        <View name={DISH_STRING} />
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
