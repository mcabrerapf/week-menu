/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContextProvider } from './ToastContext';
import { deepCopy } from '../../Components/helpers';
import './ToastContextWrapper.css';
import ToastMessage from './ToastMessage';

function ToastContextWrapper({ children }) {
  const [contextToasts, setContextToasts] = useState([]);

  const addToast = (newMsg, type) => {
    const newToasts = deepCopy(contextToasts);
    if (Array.isArray(newMsg)) {
      newMsg.forEach(({ message }) => newToasts.push({ content: message, type }));
    } else {
      newToasts.push({ content: newMsg, type });
    }
    setContextToasts(() => (newToasts));
  };

  return (
    <ToastContextProvider value={{
      addToast,
    }}
    >
      <div className="toast-messages-container">
        {contextToasts.map(({ content, type = 'info' }, index) => (
          <ToastMessage
            key={`${content}-${index}`}
            // id={index}
            content={content}
            type={type}
            // removeToast={removeToast}
          />
        ))}
      </div>
      {children}
    </ToastContextProvider>
  );
}

ToastContextWrapper.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]).isRequired,
};

export default ToastContextWrapper;
