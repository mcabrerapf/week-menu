/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContextProvider } from './ToastContext';
import { deepCopy } from '../../Components/helpers';
import './ToastContextWrapper.css';
import ToastMessage from './ToastMessage';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    toasts: [],
  });

  const addToast = (newMsg, type) => {
    const newToasts = deepCopy(contextState.toasts);
    if (Array.isArray(newMsg)) {
      newMsg.forEach(({ message }) => newToasts.push({ content: message, type }));
    } else {
      newToasts.push({ content: newMsg, type });
    }

    setContextState({ ...contextState, toasts: newToasts });
  };

  const removeToast = (toastIndex) => {
    const newToasts = deepCopy(contextState.toasts);
    newToasts.splice(toastIndex, 1);
    setContextState({ ...contextState, toasts: newToasts });
  };

  const { toasts } = contextState;
  return (
    <ToastContextProvider value={{
      ...contextState,
      addToast,

    }}
    >
      <div className="toast-messages-container">
        {toasts.map(({ content, type = 'info' }, index) => (
          <ToastMessage
            key={`${content}-${index}`}
            id={index}
            content={content}
            type={type}
            removeToast={removeToast}
          />
        ))}
      </div>
      {children}
    </ToastContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MainContextWrapper;
