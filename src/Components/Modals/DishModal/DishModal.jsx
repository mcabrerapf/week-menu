import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { serviceHandler } from '../../../Services';
import { MainContext } from '../../../Contexts/MainContext';
import { ToastContext } from '../../../Contexts/ToastContext';
import DisplayView from './DisplayView';
import EditView from './EditView';
import './DishModal.css';
import {
  CREATE_STRING, UPDATE_STRING,
} from '../../../constants';
import { deepCompare } from '../../helpers';

function DishModal({
  modalData, closeModal, mode,
}) {
  const {
    updateLists,
  } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);
  const [modalView, setModalView] = useState(mode);
  const [dishData, setDishData] = useState({});

  useEffect(() => {
    if (modalData.name) setDishData({ ...modalData });
    else {
      setDishData({
        name: '', types: [], servings: 1, time: { hours: 0, minutes: 0 }, description: '', instructions: '', ingredients: [],
      });
      setModalView('edit');
    }
  }, []);

  const handleListUpdate = async () => {
    const response = await updateLists();
    if (response.errors) addToast(response.errors, 'error');
  };

  const handleToastMessage = (response, toastLabel, name, toastType) => {
    if (response.errors) addToast(response.errors, 'error');
    else {
      const messageContent = `${toastLabel} Dish: ${name}`;
      addToast(messageContent, toastType);
    }
  };

  const handleSubmit = async () => {
    const noChange = deepCompare(dishData, modalData);
    if (noChange) return closeModal();
    const serviceString = !modalData.name ? CREATE_STRING : UPDATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    const response = await serviceToUse('dish', dishData);
    await handleListUpdate();
    const toastLabel = !modalData.name ? 'Created' : 'Updated';
    handleToastMessage(response, toastLabel, dishData.name, 'success');
    return closeModal();
  };

  return (
    <div className="dish-modal">
      {modalView === 'display'
        ? <DisplayView dishData={dishData} closeModal={closeModal} setModalView={setModalView} />
        : <EditView dishData={dishData} setDishData={setDishData} handleSubmit={handleSubmit} /> }
    </div>

  );
}

DishModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string,
  modalData: PropTypes.shape(),
};

DishModal.defaultProps = {
  modalData: {},
  mode: 'display',
};

export default DishModal;
