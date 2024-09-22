/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import Modals from '../Modals';
import { capitalizeFirstLetter, parseClassName } from '../helpers';
import Button from '../Button';
import Icon from '../Icon';

function Modal({ closeModal, modalData }) {
  const {
    type, hideHeader, modifier, headerText,
  } = modalData;
  const wrapperRef = useRef(null);
  const [closeOnBgClick, setCloseOnBgClick] = useState(true);

  useEffect(
    () => {
      function handleClickOutside({ target }) {
        const shouldHideModal = wrapperRef.current
          && !wrapperRef.current.contains(target);

        if (shouldHideModal && closeOnBgClick) {
          closeModal();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [wrapperRef, closeOnBgClick],
  );

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const ModalToUse = Modals[type];
  const parsedHeaderText = headerText ? capitalizeFirstLetter(headerText) : '';

  return (
    <div
      className="modal-background col w-f h-f centered"
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchEnd={stopPropagation}
    >
      <div ref={wrapperRef} className={parseClassName('modal border-rad-10 bgc-lightest', modifier)}>
        {!hideHeader && (
          <div className="modal-header row centered h-3 bgc-dark">
            <p className="modal-header-text font-m label centered">{parsedHeaderText}</p>
            <Button modifier="icon-l l border-rad-10 bgc-trans" onClick={closeModal}>
              <Icon iconName="close" />
            </Button>
          </div>
        )}
        <div className={parseClassName('modal-content', type)}>
          <ModalToUse
            modalData={modalData}
            closeModal={closeModal}
            setCloseOnBgClick={setCloseOnBgClick}
          />
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
