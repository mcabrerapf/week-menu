import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';

// TODO: replace with button component
function ListItem({
  itemData, handleDelete, handleEdit, handleNameClick,
}) {
  const { name, type } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);

  return (
    <li className="list-item">
      <div
        role="button"
        tabIndex={0}
        className="list-item-label"
        onKeyDown={() => handleNameClick(itemData)}
        onClick={() => handleNameClick(itemData)}
      >
        {parsedLabel}

      </div>
      <div className="list-item-buttons">
        <button type="button">{type}</button>
        <button type="button" className="rounded-button" onClick={() => handleEdit(itemData)}>
          <i className="fa fa-pencil-square-o" />
        </button>
        <button type="button" className="rounded-button" onClick={() => handleDelete(itemData)}>
          <i className="fa trash-o fa-trash-o" />
        </button>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  handleNameClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  itemData: PropTypes.shape().isRequired,

};

export default ListItem;
