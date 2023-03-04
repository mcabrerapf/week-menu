import React from 'react';
import PropTypes from 'prop-types';
import './Dish.css';

function Dish({ label }) {
  return (<div className="dish">{`- ${label}`}</div>);
}

Dish.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Dish;
