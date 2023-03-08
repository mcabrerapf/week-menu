import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import WeekView from '../WeekView';
import DishesView from '../DishesView';
import { useMainContext, MainContext } from '../../Context';
import IngredientsView from '../IngredientsView';
import Footer from '../Footer';

function Main({ signOut }) {
  const { view } = useMainContext(MainContext);

  return (
    <div className="main">
      <div className="main-view-container">
        <WeekView hidden={view !== 0} />
        <DishesView hidden={view !== 1} />
        <IngredientsView hidden={view !== 2} />
      </div>
      <Footer signOut={signOut} />
    </div>
  );
}

Main.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Main;
