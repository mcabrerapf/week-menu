/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContextProvider } from './ToastContext';
import { deepCopy } from '../../Components/helpers';
import './ToastContextWrapper.scss';
import ToastMessage from './ToastMessage';

function ToastContextWrapper({ children }) {
  const [contextToasts, setContextToasts] = useState([]);

  const addToast = (newMsg, type = 'info') => {
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
      <div className="toast-context-wrapper col">
        {contextToasts.map(({ content, type }, index) => (
          <ToastMessage
            key={`${content}-${index}`}
            content={content}
            type={type}
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
