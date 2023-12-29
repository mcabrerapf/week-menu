import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ModalContainer.css';
import { capitalizeFirstLetter } from '../../../Components/helpers';
import Button from '../../../Components/Button';
import Icon from '../../../Components/Icon';

function ModalContainer({
  children, closeModal, headerText, hideHeader, modifier, type,
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
        <div className="modal-header row bgc-b">
          <p className="modal-header-text">{parsedHeaderText}</p>
          <Button modifier="icon l" onClick={closeModal}>
            <Icon iconName="close" />
          </Button>
        </div>
      )}
      <div className={`modal-content${type ? ` ${type}` : ''}`}>
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
  type: PropTypes.string,
};

ModalContainer.defaultProps = {
  hideHeader: false,
  headerText: '',
  modifier: '',
  type: '',
  children: null,
};

export default ModalContainer;
