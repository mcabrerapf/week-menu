import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Ingredient({
  label, type, handleDelete, handleEdit, unit,
}) {
  const parsedLabel = capitalizeFirstLetter(label);
  const ingredientData = { label, type, unit };
  return (
    <li className="ingredient">
      <div className="ingredient-label">{parsedLabel}</div>
      <div className="ingredient-buttons">
        <button type="button">{type}</button>
        <button type="button" className="rounded-button" onClick={() => handleEdit(ingredientData)}>
          <i className="fa fa-pencil-square-o" />
        </button>
        <button type="button" className="rounded-button" onClick={() => handleDelete(ingredientData)}>
          <i className="fa trash-o fa-trash-o" />
        </button>
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  unit: PropTypes.string,
};

Ingredient.defaultProps = {
  unit: '',
};

export default Ingredient;
