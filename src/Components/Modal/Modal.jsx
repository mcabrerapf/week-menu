/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { getModalByType } from './helpers';
import { capitalizeFirstLetter } from '../helpers';
import Button from '../Button';
import Icon from '../Icon';

function Modal({ closeModal, modalData }) {
  const {
    type, hideHeader, modifier, headerText,
  } = modalData;
  const wrapperRef = useRef(null);

  useEffect(
    () => {
      function handleClickOutside({ target }) {
        const shouldHideModal = wrapperRef.current
          && !wrapperRef.current.contains(target);
        if (shouldHideModal) closeModal();
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [wrapperRef],
  );

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const ModalToUse = getModalByType(type);
  const parsedHeaderText = headerText ? capitalizeFirstLetter(headerText) : '';

  return (
    <div
      className="modal-background w-f h-f"
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchEnd={stopPropagation}
    >
      <div className="col centered w-f h-f">
        <div ref={wrapperRef} className={`modal border-rad-10 bgc-bg ${modifier || 'f'}`}>
          {!hideHeader && (
          <div className="modal-header row centered h-3 bgc-b">
            <p className="modal-header-text label centered">{parsedHeaderText}</p>
            <Button modifier="icon l border-rad-10" onClick={closeModal}>
              <Icon iconName="close" />
            </Button>
          </div>
          )}
          <div className={`modal-content${type ? ` ${type}` : ''}`}>
            <ModalToUse modalData={modalData} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>

  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,

};

export default Modal;
