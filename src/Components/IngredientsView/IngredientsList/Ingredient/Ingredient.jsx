import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Ingredient({
  label, type, handleDelete, handleEdit, dish,
}) {
  const parsedLabel = capitalizeFirstLetter(label);

  return (
    <li className="ingredient">
      <div className="ingredient-label">{parsedLabel}</div>
      <div className="ingredient-buttons">
        <button type="button">{type}</button>
        <button type="button" className="rounded-button" onClick={() => handleEdit(dish)}>
          <i className="fa fa-pencil-square-o" />
        </button>
        <button type="button" className="rounded-button" onClick={() => handleDelete(dish)}>
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
  dish: PropTypes.shape().isRequired,
};

export default Ingredient;
