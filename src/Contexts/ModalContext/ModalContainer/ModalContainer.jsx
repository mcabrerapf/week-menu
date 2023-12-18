import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ModalContainer.css';
import { capitalizeFirstLetter } from '../../../Components/helpers';
import Button from '../../../Components/Button';
import { CloseIcon } from '../../../Components/Icons';

function ModalContainer({
  children, closeModal, headerText, hideHeader, modifier,
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
    <div ref={wrapperRef} className={`modal ${modifier}`}>
      {!hideHeader && (
        <div className="modal-header">
          <p className="modal-header-text">{parsedHeaderText}</p>
          <Button modifier="modal-header-close-button" onClick={closeModal}>
            <CloseIcon />
          </Button>
        </div>
      )}
      <div className="modal-content">
        {children}
      </div>
    </div>

  );
}

ModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
  hideHeader: PropTypes.bool,
  headerText: PropTypes.string,
  modifier: PropTypes.string,
};

ModalContainer.defaultProps = {
  hideHeader: false,
  headerText: '',
  modifier: '',
  children: null,
};

export default ModalContainer;
