import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';

function ListItem({
  modifier, itemData, handleDelete, handleEdit, handleNameClick,
}) {
  const { name, type } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);

  return (
    <li className={`list-item ${modifier}`}>
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
        {/* {unit && <button type="button">{unit}</button>} */}
        {type && <div className="list-item-type">{type}</div>}
        <Button modifier="rounded-button" onClick={() => handleEdit(itemData)}>
          <i className="fa fa-pencil-square-o" />
        </Button>
        <Button modifier="rounded-button" onClick={() => handleDelete(itemData)}>
          <i className="fa trash-o fa-trash-o" />
        </Button>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  handleNameClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  itemData: PropTypes.shape().isRequired,
  modifier: PropTypes.string,
};

ListItem.defaultProps = {
  modifier: '',
};

export default ListItem;
