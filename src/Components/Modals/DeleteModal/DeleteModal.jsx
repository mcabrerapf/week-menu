import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { MainContext } from '../../../Contexts/MainContext';
import Icon from '../../Icon';

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
