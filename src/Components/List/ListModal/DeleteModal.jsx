import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

function DeleteModal({
  modalData, setShowModal, handleDelete,
}) {
  const {
    name,
  } = modalData;

  return (
    <div className="list-modal-content-delete">
      <div className="list-modal-content-delete-message">
        <span> Are you sure you want to delete</span>
        <span>
          <strong>
            {name}
          </strong>
        </span>
      </div>
      <div className="list-modal-content-delete-buttons">
        <Button modifier="delete" buttonText="DELETE" onClick={handleDelete} />
        <Button modifier="cancel" buttonText="Cancel" onClick={() => setShowModal({ show: false })} />
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DeleteModal.defaultProps = {
  modalData: {},
};

export default DeleteModal;
