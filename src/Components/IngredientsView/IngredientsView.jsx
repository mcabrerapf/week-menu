import React from 'react';
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList';
import './IngredientsView.css';

function IngredientsView({ hidden }) {
  return (
    <div className="ingredients-view" hidden={hidden}>
      <IngredientsList />
    </div>
  );
}

IngredientsView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default IngredientsView;
