import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { capitalizeFirstLetter } from '../helpers';
import Button from '../Button';

function Modal({
  children, hideModal, headerText, hideHeader,
}) {
  const wrapperRef = useRef(null);

  useEffect(
    () => {
      function handleClickOutside({ target }) {
        const shouldHideFlyOut = wrapperRef.current
          && !wrapperRef.current.contains(target);
        if (shouldHideFlyOut) hideModal();
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [hideModal, wrapperRef],
  );
  const parsedHeaderText = !hideHeader && capitalizeFirstLetter(headerText);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-background"
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchEnd={stopPropagation}
    >
      <div ref={wrapperRef} className="modal-container">
        {parsedHeaderText && (
        <div className="modal-header">
          <h3 className="modal-header-text">{parsedHeaderText}</h3>
          <Button modifier="modal-header-close-button" onClick={hideModal}>
            <i className="fa fa-times" aria-hidden="true" />
          </Button>
        </div>
        )}
        <div className="modal-content">
          {children}
        </div>
      </div>

    </div>

  );
}

Modal.propTypes = {
  children: PropTypes.shape().isRequired,
  hideModal: PropTypes.func.isRequired,
  hideHeader: PropTypes.bool,
  headerText: PropTypes.string,
};

Modal.defaultProps = {
  hideHeader: false,
  headerText: '',
};

export default Modal;
