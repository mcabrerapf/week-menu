import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Components/Icon';
import { DELETE_STRING, SAVE_STRING } from '../../constants/STRINGS';

const typeTimeout = {
  error: 5500,
  success: 3000,
  info: 4000,
};

function ToastMessage({
  content, type, itemType,
}) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    function hideToast() {
      setShowToast(false);
    }
    const time = typeTimeout[type] || 3000;
    const timeout = setTimeout(hideToast, time);

    return () => clearTimeout(timeout);
  }, []);

  if (!showToast) return null;

  return (
    <div
      className="toast-message-container row pad-5"
    >
      <div
        className={`toast-message row label shadow centered border-rad-5 pad-10 gap-10 ${type}`}
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowToast(false);
        }}
        onKeyDown={() => setShowToast(false)}
        tabIndex={0}
      >
        {type === 'success' && <Icon modifier="icon" iconName={SAVE_STRING} />}
        {type === 'delete' && <Icon modifier="icon" iconName={DELETE_STRING} />}
        <span className="font-l">
          {content}
        </span>
        <Icon modifier="icon" iconName={itemType} />

      </div>
    </div>
  );
}

ToastMessage.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default ToastMessage;
