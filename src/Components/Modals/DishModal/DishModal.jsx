import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../Contexts/MainContext';
import DisplayView from './DisplayView';
import EditView from './EditView';
import { deepCompare } from '../../helpers';
import { DISH_STRING } from '../../../constants';

function DishModal({
  modalData, closeModal, mode,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [modalView, setModalView] = useState(mode);
  const [dishData, setDishData] = useState({});

  useEffect(() => {
    if (modalData.name) setDishData({ ...modalData, sideDishTo: modalData.sideDishTo || [] });
    else {
      setDishData({
        name: '', types: ['lunch'], servings: 1, time: { hours: 0, minutes: 0 }, description: '', instructions: '', ingredients: [],
      });
      setModalView('edit');
    }
  }, []);

  const handleSubmit = async () => {
    const noChange = deepCompare(dishData, modalData);
    if (noChange) return closeModal();
    await handleSave(dishData, DISH_STRING);
    return closeModal();
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
