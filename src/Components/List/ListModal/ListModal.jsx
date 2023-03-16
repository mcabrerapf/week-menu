import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  serviceHandler,
} from '../../../Services';
import { useMainContext, MainContext } from '../../../Context';
import {
  CREATE_STRING, DELETE_STRING, DISH_STRING, GET_ALL_STRING, UPDATE_STRING,
} from '../../../constants';
import './ListModal.css';
import { sortBy } from '../../helpers';
import { getModalHeader } from '../../Modal/helpers';
import { initDish, initIngredient } from '../../Form/helpers';
import DisplayModal from './DisplayModal';
import DeleteModal from './DeleteModal';
import Form from '../../Form';
import Modal from '../../Modal';

const validateData = (data) => {
  const newData = { ...data };
  if (data.ingredients) {
    const updatedIngredients = data.ingredients.map((ing) => {
      const { id, quantity, unit } = ing;
      return { id, quantity, unit };
    });
    newData.ingredients = updatedIngredients;
  }
  return newData;
};

function ListModal({
  modalData, action, setShowModal,
}) {
  const {
    view, ingredients, updateDishes, updateIngredients,
  } = useMainContext(MainContext);
  const [mmodalData, setModalData] = useState({ modalMode: action });
  const { data, modalMode, ingredientsData } = mmodalData;
  const { id } = modalData;
  const updateHandler = view === 'dish' ? updateDishes : updateIngredients;

  useEffect(() => {
    // TODO: check why double api call on init
    async function initForm() {
      const sortedIngredients = sortBy(ingredients, 'name', 'alphabetical');
      const initHelper = view === DISH_STRING ? initDish : initIngredient;
      const parsedData = initHelper(modalData, sortedIngredients);
      setModalData({ modalMode: action, ingredientsData: sortedIngredients, data: parsedData });
    }
    initForm();
  }, []);

  const setModalMode = (newMode) => {
    setModalData({ ...mmodalData, modalMode: newMode });
  };

  const handleSubmit = async (submitData) => {
    const serviceToUse = action === 0
      ? serviceHandler(CREATE_STRING) : serviceHandler(UPDATE_STRING);
    const validatedData = validateData(submitData);
    const parsedData = action === 0 ? validatedData : { ...validatedData, id };
    await serviceToUse(view, parsedData);
    const updatedData = await serviceHandler(GET_ALL_STRING)(view);
    updateHandler(updatedData);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await serviceHandler(DELETE_STRING)(view, { id });
    const updatedData = await serviceHandler(GET_ALL_STRING)(view);
    updateHandler(updatedData);
    setShowModal({ show: false });
  };

  if (!data) return null;
  const displayForm = modalMode === 0 || modalMode === 2;

  return (
    <Modal
      hideHeader={action === 3}
      headerText={getModalHeader(action, modalData.name, view)}
      hideModal={() => setShowModal({ show: false, action: null })}
    >
      <div className="list-modal-content">
        {modalMode === 1 && (
        <DisplayModal modalData={data} setModalMode={setModalMode} />
        )}
        {displayForm && (
        <Form handleSubmit={handleSubmit} formData={data} ingredientsData={ingredientsData} />
        )}
        {modalMode === 3 && (
        <DeleteModal modalData={data} setShowModal={setShowModal} handleDelete={handleDelete} />
        )}
      </div>
    </Modal>
  );
}

ListModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
  action: PropTypes.number,
};

ListModal.defaultProps = {
  modalData: {},
  action: 0,
};

export default ListModal;
