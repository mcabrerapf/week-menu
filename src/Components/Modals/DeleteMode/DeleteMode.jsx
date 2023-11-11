import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DeleteMode.css';

function DeleteMode({
  modalData, handleDelete,
}) {
  const {
    name,
  } = modalData;

  return (
    <div className="delete-mode">
      <div className="delete-mode-message">

        <strong>
          {name}
        </strong>
        {' '}
        <i className="fa fa-arrow-down" aria-hidden="true" />
        {' '}
        <i className="fa fa-trash" aria-hidden="true" />

      </div>
      <div className="delete-mode-buttons">
        <Button modifier="delete" onClick={handleDelete} disableMultipleClicks>
          <i className="fa fa-check" aria-hidden="true" />
        </Button>

      </div>
    </div>
  );
}

DeleteMode.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DeleteMode.defaultProps = {
  modalData: {},
};

export default DeleteMode;
