import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DeleteModal.css';
import { MainContext } from '../../../Contexts/MainContext';
import { ArrowDownIcon, DeleteIcon } from '../../Icons';

function DeleteModal({
  modalData, closeModal,
}) {
  const {
    handleDelete: contextHandleDelete, view,
  } = useContext(MainContext);

  const {
    name,
    id,
  } = modalData;

  const handleDelete = async () => {
    contextHandleDelete(id, name, view);
    return closeModal();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal-message">

        <strong>
          {name}
        </strong>
        <ArrowDownIcon />

      </div>
      <div className="delete-modal-buttons">
        <Button modifier="delete" onClick={handleDelete} disableMultipleClicks>
          <DeleteIcon />
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
