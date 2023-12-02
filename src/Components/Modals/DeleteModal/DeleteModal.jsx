import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DeleteModal.css';
import { MainContext } from '../../../Contexts/MainContext';
import { ToastContext } from '../../../Contexts/ToastContext';
import { DELETE_STRING } from '../../../constants';
import { serviceHandler } from '../../../Services';

function DeleteModal({
  modalData, closeModal,
}) {
  const {
    view,
    updateLists,
  } = useContext(MainContext);
  const { addToast } = useContext(ToastContext);
  const {
    name,
    id,
  } = modalData;

  const handleListUpdate = async () => {
    const response = await updateLists();
    if (response.errors) addToast(response.errors, 'error');
  };

  const handleToastMessage = (response) => {
    if (response.errors) addToast(response.errors, 'error');
    else {
      const messageContent = `Deleted ${view}: ${name}`;
      addToast(messageContent, 'success');
    }
  };

  const handleDelete = async () => {
    const serviceToUse = serviceHandler(DELETE_STRING);
    const response = await serviceToUse(view, { id });
    await handleListUpdate();
    handleToastMessage(response);
    return closeModal();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal-message">

        <strong>
          {name}
        </strong>
        <i className="fa fa-arrow-down" aria-hidden="true" />

      </div>
      <div className="delete-modal-buttons">
        <Button modifier="delete" onClick={handleDelete} disableMultipleClicks>
          <i className="fa fa-trash" aria-hidden="true" />
        </Button>

      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DeleteModal.defaultProps = {
  modalData: {},
};

export default DeleteModal;
