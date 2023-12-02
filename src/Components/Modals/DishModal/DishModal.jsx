import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { serviceHandler } from '../../../Services';
import { MainContext } from '../../../Contexts/MainContext';
import { ToastContext } from '../../../Contexts/ToastContext';
import DisplayView from './DisplayView';
import './DishModal.css';
import {
  CREATE_STRING, UPDATE_STRING,
} from '../../../constants';
import Button from '../../Button';
import EditView from './EditView';
import { deepCompare } from '../../helpers';

function DishModal({
  modalData, closeModal,
}) {
  const {
    updateLists,
  } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);
  const [modalView, setModalView] = useState('display');
  const [dishData, setDishData] = useState({});

  useEffect(() => {
    if (modalData.name) setDishData({ ...modalData });
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
        ? <DisplayView dishData={dishData} closeModal={closeModal} />
        : <EditView formData={dishData} setDishData={setDishData} /> }
      <div className="display-mode-footer">
        {modalView === 'display'
          ? (
            <Button modifier="edit" onClick={() => setModalView('edit')}>
              <i className="fa fa-pencil" aria-hidden="true" />
            </Button>
          ) : (
            <Button modifier="edit" onClick={handleSubmit}>
              <i className="fa fa-floppy-o" aria-hidden="true" />
            </Button>
          )}
        <Button modifier="edit" onClick={() => setModalView('edit')}>
          <i className="fa fa-trash" aria-hidden="true" />
        </Button>
      </div>
    </div>

  );
}

DishModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
};

DishModal.defaultProps = {
  modalData: {},
};

export default DishModal;
