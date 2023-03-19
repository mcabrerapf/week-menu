import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ToastMessage({
  content, type, id, removeToast,
}) {
  useEffect(() => {
    const timeout = setTimeout(removeToast, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      className="toast-message-container"
      onClick={() => removeToast(id)}
      onKeyDown={() => removeToast(id)}
    >
      <div className={`toast-message-content ${type}`}>{content}</div>
    </div>
  );
}

ToastMessage.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  removeToast: PropTypes.func.isRequired,
};

export default ToastMessage;
