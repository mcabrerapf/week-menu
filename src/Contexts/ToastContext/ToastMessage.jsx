import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const typeTimeout = {
  error: 5500,
  success: 3000,
  info: 3500,
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
      role="button"
      tabIndex={0}
      className="toast-message-container"
      onClick={() => setShowToast(false)}
      onKeyDown={() => setShowToast(false)}
    >
      <div className={`toast-message-content ${type}`}>{content}</div>
    </div>
  );
}

ToastMessage.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToastMessage;
