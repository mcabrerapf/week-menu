/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';
import {
  DISH_STRING, MENU_STRING, EDIT_STRING, DELETE_STRING, DISPLAY_STRING,
} from '../../../constants/STRINGS';
import Icon from '../../Icon';

function ListItem({
  itemType, itemData, handleOpenModal, handleLoadMenu,
}) {
  const {
    name, type, types, favourite,
  } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);
  const typeToUse = types ? types[0] : type;
  const modalView = itemType === DISH_STRING ? DISPLAY_STRING : EDIT_STRING;

  return (
    <li
      className="list-item row h-4 a-c pad-v-5 pad-h-10 border-rad-10 j-bet bgc-dark"
      role="button"
      tabIndex={0}
      onClick={() => handleOpenModal({
        type: itemType, modalView, itemData, headerText: name, modifier: 'f',
      })}
      onKeyDown={() => handleOpenModal({
        type: itemType, modalView, itemData, headerText: name,
      })}
    >
      <div
        className="list-item__label font-l label"
      >
        <span>{parsedLabel}</span>
      </div>
      <div className="row">
        {typeToUse && (
        <Button
          modifier="l icon bgc-trans"
          onClick={() => handleOpenModal({
            type: itemType,
            modalView: EDIT_STRING,
            itemData,
            headerText: name,
          })}
        >
          <Icon iconName={typeToUse} />
        </Button>
        )}
        {favourite && (
        <Button
          modifier="l icon bgc-trans"
          onClick={() => handleOpenModal({
            type: itemType, modalView: EDIT_STRING, itemData, headerText: name, modifier: 'f',
          })}
        >
          <Icon iconName="star" />
        </Button>
        )}
        {itemType === MENU_STRING && (
        <Button
          modifier="l icon bgc-trans"
          onClick={() => handleLoadMenu(itemData)}

        >
          <Icon iconName="eye" />
        </Button>
        )}
        {itemType === DISH_STRING && (
        <Button
          modifier="l icon bgc-trans"
          onClick={() => handleOpenModal({
            type: itemType, modalView: EDIT_STRING, itemData, headerText: name, modifier: 'f',
          })}
        >
          <Icon iconName="edit" />
        </Button>
        )}
        <Button
          modifier="l icon bgc-trans"
          onClick={() => handleOpenModal({
            type: DELETE_STRING, itemData, modifier: 's', hideHeader: true,
          })}
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
  itemType: PropTypes.string,
};

ListItem.defaultProps = {
  itemType: '',
};

export default ListItem;
