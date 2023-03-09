import React from 'react';
import PropTypes from 'prop-types';
import {
  serviceHandler,
} from '../../../Services';
import { useMainContext, MainContext } from '../../../Context';
import {
  CREATE_STRING, DELETE_STRING, GET_ALL_STRING, UPDATE_STRING,
} from '../../../constants';
import './ListModalContent.css';
import Form from '../../Form';
import Button from '../../Button';

function ListModal({
  modalData, action, setParentData, setShowModal,
}) {
  const { view } = useMainContext(MainContext);
  const { id } = modalData;
  const displayForm = action === 0 || action === 2;

  const handleSubmit = async (submitData) => {
    const serviceToUse = action === 0
      ? serviceHandler(CREATE_STRING) : serviceHandler(UPDATE_STRING);
    const parsedData = action === 0 ? submitData : { ...submitData, id };
    await serviceToUse(view, parsedData);
    const updatedData = await serviceHandler(GET_ALL_STRING)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await serviceHandler(DELETE_STRING)(view, { id });
    const updatedData = await serviceHandler(GET_ALL_STRING)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  return (
    <div className="list-modal-content">
      {action === 1 && (
        <div>
          <div>{modalData.name}</div>
          <div>{modalData.type}</div>
          <div>{modalData.unit}</div>
        </div>
      )}
      {displayForm && (
        <Form handleSubmit={handleSubmit} formData={modalData} />
      )}
      {action === 3 && (
        <Button modifier="delete" buttonText="DELETE" handleOnClick={handleDelete} />

      )}
    </div>
  );
}

ListModal.propTypes = {
  setParentData: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
  action: PropTypes.number,
};

ListModal.defaultProps = {
  modalData: {},
  action: 0,
};

export default ListModal;
