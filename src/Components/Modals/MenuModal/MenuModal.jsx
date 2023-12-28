import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { parseMenuData } from './helpers';
import Icon from '../../Icon';
import { MENU_STRING } from '../../../constants';

function MenuModal({ modalData, closeModal }) {
  const {
    id, name, favourite, dishes,
  } = modalData;
  const {
    handleSave,
  } = useContext(MainContext);
  const [menuName, setMenuName] = useState(name);
  const [isFavourite, setIsFavourite] = useState(!!favourite);

  const saveMenu = async () => {
    const parsedData = parseMenuData({
      id, name: menuName, favourite: isFavourite, dishes,
    });
    await handleSave(parsedData, MENU_STRING);
    closeModal();
  };
  const favouriteButtonClass = `m icon${isFavourite ? '' : ' bgc-gr'}`;

  return (
    <div className="menu-modal-content">
      <div className="menu-modal-inputs">
        <Input
          name="name"
          id="name"
          value={menuName}
          onChange={({ target: { value: eValue } }) => setMenuName(eValue)}
          placeholder="Menu name"
          type="text"
        />
        <Button modifier={favouriteButtonClass} onClick={() => setIsFavourite(!isFavourite)}>
          <Icon iconName="star" />
        </Button>
      </div>
      <div className="menu-modal-buttons">
        <Button modifier="icon" onClick={saveMenu} disabled={!menuName} disableMultipleClicks>
          <Icon iconName="save" />
        </Button>
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MenuModal;
