import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  serviceHandler,
} from '../../../Services';
import {
  useMainContext, MainContext, useToastContext, ToastContext,
} from '../../../Context';
import {
  CREATE_STRING, DELETE_STRING, DISH_STRING, UPDATE_STRING,
} from '../../../constants';
import './ListModal.css';
import { deepCopy, sortBy } from '../../helpers';
import { getModalHeader } from '../../Modal/helpers';
import { initDish, initIngredient } from '../../Form/helpers';
import DisplayModal from './DisplayModal';
import DeleteModal from './DeleteModal';
import Form from '../../Form';
import Modal from '../../Modal';

const validateData = (data) => {
  const copiedData = deepCopy(data);
  if (data.ingredients) {
    const updatedIngredients = data.ingredients.map((ing) => {
      const { id, quantity, unit } = ing;
      return { id, quantity, unit };
    });
    copiedData.ingredients = updatedIngredients;
  }
  return copiedData;
};

function ListModal({
  modalData, action, setShowModal,
}) {
  const {
    view, ingredients, updateLists,
  } = useMainContext(MainContext);
  const { addToast } = useToastContext(ToastContext);
  const [mmodalData, setModalData] = useState({ modalMode: action });
  const { data, modalMode, ingredientsData } = mmodalData;
  const { id } = modalData;

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

  const handleListUpdate = async () => {
    const response = await updateLists();
    if (response.errors) addToast(response.errors, 'error');
  };

  const handleToastMessage = (response, toastLabel, name, toastType) => {
    if (response.errors) addToast(response.errors, 'error');
    else {
      const messageContent = `${toastLabel} ${view}: ${name}`;
      addToast(messageContent, toastType);
    }
  };

  const handleSubmit = async (submitData) => {
    // If new data hasnt changed dont call api
    if (JSON.stringify(submitData) === JSON.stringify(mmodalData.data)) {
      setShowModal({ show: false });
      return;
    }
    const serviceToUse = action === 0
      ? serviceHandler(CREATE_STRING) : serviceHandler(UPDATE_STRING);
    const validatedData = validateData(submitData);
    const parsedData = action === 0 ? validatedData : { ...validatedData, id };
    const response = await serviceToUse(view, parsedData);
    await handleListUpdate();
    setShowModal({ show: false });
    const toastLabel = action === 0 ? 'Created' : 'Updated';
    handleToastMessage(response, toastLabel, parsedData.name, 'success');
  };

  const handleDelete = async () => {
    const response = await serviceHandler(DELETE_STRING)(view, { id });
    await handleListUpdate();
    setShowModal({ show: false });
    handleToastMessage(response, 'Deleted', data.name, 'error');
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
