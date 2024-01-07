import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Icon from '../../Icon';
import { DELETE_STRING } from '../../../constants/STRINGS';

function DeleteModal({
  modalData, closeModal,
}) {
  const {
    itemData: {
      name,
    },
    itemData,
  } = modalData;

  const handleDelete = async () => closeModal({ type: DELETE_STRING, data: itemData });

  return (
    <div className="col gap-5 pad-10">
      <div className="col centered icon gap 5">
        <strong>
          {name}
        </strong>
        <Icon iconName="arrow-d" />

      </div>
      <div className="row">
        <Button modifier="icon bgc-bl" onClick={handleDelete} disableMultipleClicks>
          <Icon iconName="delete" />
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
