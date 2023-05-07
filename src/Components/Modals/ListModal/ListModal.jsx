import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { serviceHandler } from '../../../Services';
import { MainContext } from '../../../Contexts/MainContext';
import { ToastContext } from '../../../Contexts/ToastContext';
import './ListModal.css';
import {
  CREATE_STRING, DELETE_STRING, UPDATE_STRING,
} from '../../../constants';
import { parseData } from './helpers';
import Form from '../../Form/Form';
import DeleteMode from '../DeleteMode';
import DisplayMode from '../DisplayMode';

function ListModal({
  modalData, mode, closeModal,
}) {
  const {
    view, updateLists,
  } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);
  const [modalMode, setModalMode] = useState(mode);

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

  const handleSubmit = async (submitData, noChange) => {
    if (noChange) {
      closeModal();
      return;
    }
    const isCreate = mode === 'create';
    const serviceString = isCreate ? CREATE_STRING : UPDATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    const parsedData = parseData(submitData, view);
    const response = await serviceToUse(view, parsedData);
    await handleListUpdate();
    const toastLabel = isCreate ? 'Created' : 'Updated';
    handleToastMessage(response, toastLabel, parsedData.name, 'success');
    closeModal();
  };

  const handleDelete = async () => {
    const response = await serviceHandler(DELETE_STRING)(view, { id: modalData.id });
    await handleListUpdate();
    handleToastMessage(response, 'Deleted', modalData.name, 'error');
    closeModal();
  };

  const displayForm = modalMode === 'create' || modalMode === 'edit';

  return (
    <div className="list-modal">
      {modalMode === 'display' && (
      <DisplayMode modalData={modalData} setModalMode={setModalMode} buttonText="Edit" />
      )}
      {displayForm && (
      <Form handleSubmit={handleSubmit} formData={modalData} />
      )}
      {modalMode === 'delete' && (
      <DeleteMode modalData={modalData} closeModal={closeModal} handleDelete={handleDelete} />
      )}
    </div>

  );
}

ListModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
  mode: PropTypes.string,

};

ListModal.defaultProps = {
  modalData: {},
  mode: '',
};

export default ListModal;
