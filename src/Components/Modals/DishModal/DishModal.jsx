import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DisplayView from './DisplayView';
import EditView from './EditView';
import { deepCompare, initData } from '../../helpers';
import { DISH_STRING } from '../../../constants/STRINGS';
import { useMainContext } from '../../../Contexts/MainContext';

function DishModal({
  modalData, setHeaderText, closeModal, setCloseOnBgClick,
}) {
  const { itemData, modalView: _modalView } = modalData;
  const {
    handleSave,
  } = useMainContext();
  const [modalView, setModalView] = useState(_modalView);
  const [dishData, setDishData] = useState(initData(itemData, DISH_STRING));

  useEffect(() => {
    if (modalView === 'edit') setCloseOnBgClick(false);
  }, [modalView]);

  const handleSubmit = async () => {
    const noChange = deepCompare(dishData, itemData);
    if (noChange) return closeModal();
    await handleSave(dishData, DISH_STRING);
    setHeaderText(dishData.name);
    return setModalView('display');
  };

  return (modalView === 'display'
    ? <DisplayView dishData={dishData} closeModal={closeModal} setModalView={setModalView} />
    : <EditView dishData={dishData} setDishData={setDishData} handleSubmit={handleSubmit} />

  );
}

DishModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setCloseOnBgClick: PropTypes.func.isRequired,
  setHeaderText: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
};

DishModal.defaultProps = {
  modalData: {},
};

export default DishModal;
