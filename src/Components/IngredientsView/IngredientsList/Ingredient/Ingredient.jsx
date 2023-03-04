import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css';

function Ingredient({ label, type }) {
  return (
    <div className="ingredient">
      {`- ${label}--${type}`}
    </div>
  );
}

Ingredient.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

};

export default Ingredient;
