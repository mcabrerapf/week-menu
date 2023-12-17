import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DeleteModal.css';
import { MainContext } from '../../../Contexts/MainContext';

function DeleteModal({
  modalData, closeModal,
}) {
  const {
    handleDelete: contextHandleDelete,
  } = useContext(MainContext);

  const {
    name,
    id,
  } = modalData;

  const handleDelete = async () => {
    contextHandleDelete(id, name);
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
