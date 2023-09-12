import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { capitalizeFirstLetter } from '../../helpers';
import Button from '../../Button';

function Modal({
  children, closeModal, headerText, hideHeader,
}) {
  const wrapperRef = useRef(null);

  useEffect(
    () => {
      function handleClickOutside({ target }) {
        const shouldHideFlyOut = wrapperRef.current
          && !wrapperRef.current.contains(target);
        if (shouldHideFlyOut) closeModal();
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [wrapperRef],
  );

  const parsedHeaderText = capitalizeFirstLetter(headerText);

  return (
    <div ref={wrapperRef} className="modal">
      {!hideHeader && (
        <div className="modal-header">
          <p className="modal-header-text">{parsedHeaderText}</p>
          <Button modifier="modal-header-close-button" onClick={closeModal}>
            <i
              className="fa fa-times"
              aria-hidden="true"
            />
          </Button>
        </div>
      )}
      <div className="modal-content">
        {children}
      </div>
    </div>

  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
  hideHeader: PropTypes.bool,
  headerText: PropTypes.string,
};

Modal.defaultProps = {
  hideHeader: false,
  headerText: '',
  children: null,
};

export default Modal;
