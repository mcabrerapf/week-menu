import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { capitalizeFirstLetter } from '../helpers';

function Modal({ children, hideModal, headerText }) {
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
  const parsedHeaderText = capitalizeFirstLetter(headerText);

  return (
    <div className="modal-background">
      <div ref={wrapperRef} className="modal-container">
        {headerText && (
        <div className="modal-header">
          <h3>{parsedHeaderText}</h3>
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
  headerText: PropTypes.string,
};

Modal.defaultProps = {
  headerText: '',
};

export default Modal;
