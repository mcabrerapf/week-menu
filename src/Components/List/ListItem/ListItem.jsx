import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';
import { DISH_STRING, MENU_STRING } from '../../../constants';

function ListItem({
  modifier, itemData, handleOpenModal, handleLoadMenu,
}) {
  const { name, type, types } = itemData;
  const parsedLabel = capitalizeFirstLetter(name);
  const typeToUse = types ? types[0] : type;
  const defaultModalView = modifier === DISH_STRING ? 'display' : 'edit';
  return (
    <li className={`list-item ${modifier}`}>
      <div
        role="button"
        tabIndex={0}
        className="list-item-label"
        onKeyDown={() => handleOpenModal('list', defaultModalView, itemData)}
        onClick={() => handleOpenModal('list', defaultModalView, itemData)}
      >
        {parsedLabel}

      </div>
      <div className="list-item-buttons">
        {typeToUse && <div className="list-item-type">{typeToUse}</div>}
        {modifier === MENU_STRING && (
        <Button
          modifier="rounded-button"
          onClick={() => handleLoadMenu(itemData)}
          // buttonIcon="pencil"
          buttonText="L"
        />
        )}
        <Button
          modifier="rounded-button"
          onClick={() => handleOpenModal('list', 'edit', itemData)}
          buttonIcon="pencil"
        />
        <Button
          modifier="rounded-button"
          onClick={() => handleOpenModal('list', 'delete', itemData)}
          buttonIcon="trash"
        />
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
