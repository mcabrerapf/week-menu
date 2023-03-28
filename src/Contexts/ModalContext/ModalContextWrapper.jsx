import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalContextProvider } from './ModalContext';
import './ModalContextWrapper.css';
import Modal from '../../Components/Modals/Modal';
import { getModalByType } from './helpers';

const initialModalState = {
  showModal: false,
  modalData: null,
  mode: null,
  type: '',
  onClose: null,
};
function ModalContextWrapper({ children }) {
  const [contextState, setContextState] = useState(initialModalState);

  const {
    showModal, modalData, type, mode, onClose,
  } = contextState;

  const addModal = (modalOptions) => {
    setContextState({
      ...modalOptions, showModal: true,
    });
  };

  const closeModal = (closeOptions) => {
    if (
      onClose
      && closeOptions
      && closeOptions.updateParent
      && closeOptions.data) onClose(closeOptions.data);
    setContextState(initialModalState);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const ModalToUse = getModalByType(type);

  return (
    <ModalContextProvider value={{
      ...contextState,
      addModal,
    }}
    >

      {showModal && ModalToUse && (
        <div
          className="modal-background"
          onTouchStart={stopPropagation}
          onTouchMove={stopPropagation}
          onTouchEnd={stopPropagation}
        >
          <Modal
            hideHeader
            closeModal={closeModal}
            modalData={modalData}
          >
            <ModalToUse
              modalData={modalData}
              mode={mode}
              closeModal={closeModal}

            />
          </Modal>
        </div>
      )}

      {children}
    </ModalContextProvider>
  );
}

ModalContextWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default ModalContextWrapper;
