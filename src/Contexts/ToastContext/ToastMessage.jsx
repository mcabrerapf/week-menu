import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Components/Icon';

const typeTimeout = {
  error: 5500,
  success: 3000,
  info: 4000,
};

function ToastMessage({
  content, type,
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
        className={`toast-message row label icon shadow centered border-rad-5 pad-10 gap-5 ${type}`}
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowToast(false);
        }}
        onKeyDown={() => setShowToast(false)}
        tabIndex={0}
      >
        {type === 'success' && <Icon iconName="save" />}
        {type === 'delete' && <Icon iconName="delete" />}
        <span className="font-s">
          {content}
        </span>

      </div>
    </div>
  );
}

ToastMessage.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToastMessage;
