import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DeleteMode.css';

function DeleteMode({
  modalData, closeModal, handleDelete,
}) {
  const {
    name,
  } = modalData;

  return (
    <div className="delete-mode">
      <div className="delete-mode-message">
        <span> Are you sure you want to delete</span>
        <span>
          <strong>
            {name}
          </strong>
        </span>
      </div>
      <div className="delete-mode-buttons">
        <Button modifier="delete" buttonText="DELETE" onClick={handleDelete} />
        <Button modifier="cancel" buttonText="Cancel" onClick={closeModal} />
      </div>
    </div>
  );
}

DeleteMode.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DeleteMode.defaultProps = {
  modalData: {},
};

export default DeleteMode;
