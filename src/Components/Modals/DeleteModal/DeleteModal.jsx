import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Icon from '../../Icon';
import { DELETE_STRING } from '../../../constants/STRINGS';

function DeleteModal({ modalData, closeModal }) {
  const {
    itemData: {
      name,
    },
    itemType,
    itemData,
  } = modalData;
  const handleDelete = async () => closeModal({ type: DELETE_STRING, data: itemData });

  return (
    <div className="col gap-10 pad-10">
      <div className="col centered icon gap-10">
        <span className="row gap-10 label">
          <Icon modifier="icon" iconName={itemType} />
          {name}
        </span>
        <Icon modifier="icon" iconName="arrow-d" />

      </div>
      <div className="row centered">
        <Button modifier="icon danger" onClick={handleDelete} disableMultipleClicks>
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
