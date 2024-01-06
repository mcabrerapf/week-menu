/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';
import {
  DISH_STRING, MENU_STRING, EDIT_STRING, DELETE_STRING, DISPLAY_STRING,
} from '../../../constants/STRINGS';
import Icon from '../../Icon';

function ListItem({
  modifier, itemData, handleOpenModal, handleLoadMenu,
}) {
  const {
    name, type, types, favourite,
  } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);
  const typeToUse = types ? types[0] : type;
  const defaultModalView = modifier === DISH_STRING ? DISPLAY_STRING : EDIT_STRING;

  return (
    <li
      className="list-item row h-3 w-f a-c j-bet pad-v-10 pad-h-5 border-rad-10 bgc-b"
      role="button"
      tabIndex={0}
      onClick={() => handleOpenModal(modifier, defaultModalView, itemData)}
      onKeyDown={() => handleOpenModal(modifier, defaultModalView, itemData)}
    >
      <div
        className="list-item-label column label overflow-y-h"
      >
        {parsedLabel}
      </div>
      <div className="row">
        {typeToUse && (
        <Button
          modifier="l icon"
          onClick={() => handleOpenModal(modifier, EDIT_STRING, itemData)}
        >
          <Icon iconName={typeToUse} />
        </Button>
        )}
        {favourite && (
        <Button
          modifier="l icon"
          onClick={() => handleOpenModal(modifier, EDIT_STRING, itemData)}
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
          onClick={() => handleOpenModal(modifier, EDIT_STRING, itemData)}
        >
          <Icon iconName="edit" />
        </Button>
        )}
        <Button
          modifier="l icon"
          onClick={() => handleOpenModal(DELETE_STRING, DELETE_STRING, itemData, 's')}
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
