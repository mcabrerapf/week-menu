/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';
import { DISH_STRING, MENU_STRING } from '../../../constants';
import Icon from '../../Icon';

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
    <li
      className="list-item"
      role="button"
      tabIndex={0}
      onClick={() => handleOpenModal(modifier, defaultModalView, itemData)}
      onKeyDown={() => handleOpenModal(modifier, defaultModalView, itemData)}
    >
      <div
        className="list-item-label"
      >
        {parsedLabel}

      </div>
      <div className="list-item-buttons">
        {typeToUse && (
        <Button
          modifier="l icon"
        >
          <Icon iconName={typeToUse} />
        </Button>
        )}
        {favourite && (
        <Button
          modifier="l icon"
          onClick={() => {}}
        >
          <Icon iconName="star" />
        </Button>
        )}
        {modifier === MENU_STRING && (
        <Button
          modifier="l icon"
          onClick={() => handleLoadMenu(itemData)}

        >
          <Icon iconName="eye" />
        </Button>
        )}
        {modifier === DISH_STRING && (
        <Button
          modifier="l icon"
          onClick={() => handleOpenModal(modifier, 'edit', itemData)}
        >
          <Icon iconName="edit" />
        </Button>
        )}
        <Button
          modifier="l icon"
          onClick={() => handleOpenModal('delete', 'delete', itemData, 's')}
        >
          <Icon iconName="delete" />
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
