import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';
import { DISH_STRING, MENU_STRING } from '../../../constants';
import {
  EditIcon, DeleteIcon, EyeIcon, StarIcon,
} from '../../Icons';

function ListItem({
  modifier, itemData, handleOpenModal, handleLoadMenu,
}) {
  const {
    name, type, types, favourite,
  } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);
  const typeToUse = types ? types[0] : type;
  const defaultModalView = modifier === DISH_STRING ? 'display' : 'edit';

  return (
    <li className={`list-item ${modifier}`}>
      <div
        role="button"
        tabIndex={0}
        className="list-item-label"
        onKeyDown={() => handleOpenModal(modifier, defaultModalView, itemData)}
        onClick={() => handleOpenModal(modifier, defaultModalView, itemData)}
      >
        {parsedLabel}

      </div>
      <div className="list-item-buttons">
        {typeToUse && <div className="list-item-type">{typeToUse}</div>}
        {favourite && (
        <Button
          modifier="m icon-only"
          onClick={() => {}}
        >
          <StarIcon />
        </Button>
        )}
        {modifier === MENU_STRING && (
        <Button
          modifier="m icon-only"
          onClick={() => handleLoadMenu(itemData)}

        >
          <EyeIcon />

        </Button>
        )}
        {modifier === DISH_STRING && (
        <Button
          modifier="m icon-only"
          onClick={() => handleOpenModal(modifier, 'edit', itemData)}
        >
          <EditIcon />
        </Button>
        )}
        <Button
          modifier="m icon-only"
          onClick={() => handleOpenModal('delete', 'delete', itemData, 's')}
        >
          <DeleteIcon />
        </Button>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  handleLoadMenu: PropTypes.func.isRequired,
  itemData: PropTypes.shape().isRequired,
  modifier: PropTypes.string,
};

ListItem.defaultProps = {
  modifier: '',
};

export default ListItem;
