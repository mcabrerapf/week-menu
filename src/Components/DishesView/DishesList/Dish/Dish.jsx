import React from 'react';
import PropTypes from 'prop-types';
import './Dish.css';
import { capitalizeFirstLetter } from '../../../helpers';

function Dish({
  name, type, handleDelete, handleEdit, handleNameClick, dish,
}) {
  const parsedLabel = capitalizeFirstLetter(name);

  return (
    <li className="dish">
      <div
        className="dish-label"
        role="button"
        tabIndex={0}
        onKeyDown={() => handleNameClick(dish)}
        onClick={() => handleNameClick(dish)}
      >
        {parsedLabel}

      </div>
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
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleNameClick: PropTypes.func.isRequired,
  dish: PropTypes.shape().isRequired,
  type: PropTypes.string,
};

Dish.defaultProps = {
  type: '',
};

export default Dish;
