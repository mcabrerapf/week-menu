import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Ingredient({
  label, type, handleDelete, handleEdit, ingredient, unit,
}) {
  const parsedLabel = capitalizeFirstLetter(label);

  return (
    <li className="ingredient">
      <div className="ingredient-label">{parsedLabel}</div>
      <div className="ingredient-buttons">
        <button type="button">{unit}</button>
        <button type="button">{type}</button>
        <button type="button" className="rounded-button" onClick={() => handleEdit(ingredient)}>
          <i className="fa fa-pencil-square-o" />
        </button>
        <button type="button" className="rounded-button" onClick={() => handleDelete(ingredient)}>
          <i className="fa trash-o fa-trash-o" />
        </button>
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  label: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  ingredient: PropTypes.shape().isRequired,
  type: PropTypes.string,
  unit: PropTypes.string,
};

Ingredient.defaultProps = {
  type: '',
  unit: '',
};

export default Ingredient;
