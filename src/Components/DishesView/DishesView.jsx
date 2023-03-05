import React from 'react';
import PropTypes from 'prop-types';
import './DishesView.css';
import DishesList from './DishesList';

function DishesView({ hidden }) {
  return (
    <div className="dishes-view" style={{ display: hidden ? 'none' : 'flex' }}>
      <DishesList />
    </div>
  );
}

DishesView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default DishesView;
