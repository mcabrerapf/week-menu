import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { parseMenuData } from './helpers';

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
      name: menuName, favourite: isFavourite, dishes,
    });
    await handleSave(
      id,
      parsedData.name,
      parsedData,
    );
    closeModal();
  };

  const favouriteButtonClass = isFavourite ? '' : 'not-favourite ';

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
          <i className="fa fa-star" aria-hidden="true" />
        </Button>
      </div>
      <div className="menu-modal-buttons">
        <Button buttonText="Save" onClick={saveMenu} disabled={!menuName} disableMultipleClicks />
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MenuModal;
