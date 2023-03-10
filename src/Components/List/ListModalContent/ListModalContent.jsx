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
  const { view, offlineMode } = useMainContext(MainContext);
  const { id } = modalData;
  const displayForm = action === 0 || action === 2;

  const handleSubmit = async (submitData) => {
    const serviceToUse = action === 0
      ? serviceHandler(CREATE_STRING, offlineMode) : serviceHandler(UPDATE_STRING, offlineMode);
    const parsedData = action === 0 ? submitData : { ...submitData, id };
    await serviceToUse(view, parsedData);
    const updatedData = await serviceHandler(GET_ALL_STRING, offlineMode)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await serviceHandler(DELETE_STRING, offlineMode)(view, { id });
    const updatedData = await serviceHandler(GET_ALL_STRING, offlineMode)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  return (
    <div className="list-modal-content">
      {action === 1 && (
        <div className="list-modal-content-display">
          <div>{modalData.name}</div>
          <div>{modalData.type}</div>
          <div>{modalData.unit}</div>
        </div>
      )}
      {displayForm && (
        <Form handleSubmit={handleSubmit} formData={modalData} />
      )}
      {action === 3 && (
        <div className="list-modal-content-delete">
          <div className="list-modal-content-delete-message">
            <span> Are you sure you want to delete</span>
            <span>
              <strong>
                {modalData.name}
              </strong>
            </span>
          </div>
          <div className="list-modal-content-delete-buttons">
            <Button modifier="delete" buttonText="DELETE" onClick={handleDelete} />
            <Button modifier="cancel" buttonText="Cancel" onClick={() => setShowModal({ show: false })} />
          </div>

        </div>

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
