import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Ingredient({
  ingredient, label, type, handleDelete, handleEdit, handleNameClick,
}) {
  const parsedLabel = capitalizeFirstLetter(label);

  return (
    <li className="ingredient">
      <div
        role="button"
        tabIndex={0}
        className="ingredient-label"
        onKeyDown={() => handleNameClick(ingredient)}
        onClick={() => handleNameClick(ingredient)}
      >
        {parsedLabel}

      </div>
      <div className="ingredient-buttons">
        {/* <button type="button">{unit}</button> */}
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
  handleNameClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  ingredient: PropTypes.shape().isRequired,
  type: PropTypes.string,
  // unit: PropTypes.string,
};

Ingredient.defaultProps = {
  type: '',
  // unit: '',
};

export default Ingredient;
