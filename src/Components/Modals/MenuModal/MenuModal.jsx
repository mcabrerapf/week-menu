import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { ToastContext } from '../../../Contexts/ToastContext';
import { serviceHandler } from '../../../Services';
import { MainContext } from '../../../Contexts/MainContext';
import { CREATE_STRING, UPDATE_STRING } from '../../../constants';

const parseMenuData = (data) => {
  const { dishes, name, favourite } = data;
  const parsedDishes = dishes.map(({ id, useAs, days }) => ({ id, useAs, days }));
  return { name, favourite, dishes: parsedDishes };
};
function MenuModal({ modalData, closeModal }) {
  const {
    id, name, favourite, dishes,
  } = modalData;

  const { addToast } = useContext(ToastContext);
  const {
    updateLists,
  } = useContext(MainContext);
  const [menuName, setMenuName] = useState(name);
  const [isFavourite, setIsFavourite] = useState(!!favourite);

  const handleToastMessage = (response, toastType) => {
    if (response.errors) addToast(response.errors, 'error');
    else {
      addToast(`Saved ${menuName} menu`, toastType);
    }
  };

  const handleListUpdate = async () => {
    const response = await updateLists();
    if (response.errors) addToast(response.errors, 'error');
  };

  const saveMenu = async () => {
    const parsedData = parseMenuData({
      name: menuName, favourite: isFavourite, dishes,
    });
    const serviceString = id ? UPDATE_STRING : CREATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    const finalData = id ? { ...parsedData, id } : parsedData;
    const response = await serviceToUse('menu', finalData);
    await handleListUpdate();
    handleToastMessage(response, 'success');
    closeModal();
  };

  const loadMenu = () => {
    closeModal();
    handleToastMessage({}, 'success');
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
        <Button buttonText="Save" onClick={saveMenu} disabled={!menuName} />
        {id && <Button buttonText="Load" onClick={loadMenu} />}
      </div>

    </div>
  );
}

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MenuModal;
