import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../Contexts/MainContext';
import DisplayView from './DisplayView';
import EditView from './EditView';
import { deepCompare, initData } from '../../helpers';
import { DISH_STRING } from '../../../constants/STRINGS';

function DishModal({
  modalData, closeModal, mode,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [modalView, setModalView] = useState(mode);
  const [dishData, setDishData] = useState(initData(modalData, DISH_STRING));

  const handleSubmit = async () => {
    const noChange = deepCompare(dishData, modalData);
    if (noChange) return closeModal();
    return handleSave(dishData, DISH_STRING, closeModal);
  };

  return (modalView === 'display'
    ? <DisplayView dishData={dishData} closeModal={closeModal} setModalView={setModalView} />
    : <EditView dishData={dishData} setDishData={setDishData} handleSubmit={handleSubmit} />

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
