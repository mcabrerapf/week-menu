import React from 'react';
import PropTypes from 'prop-types';
import './Dish.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Dish({
  label, type, handleDelete, handleEdit, dish,
}) {
  const parsedLabel = capitalizeFirstLetter(label);

  return (
    <li className="dish">
      <div className="dish-label">{parsedLabel}</div>
      <div className="dish-buttons">
        {type && <button type="button">{type}</button>}
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

Dish.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  dish: PropTypes.shape().isRequired,
};

export default Dish;
