import React from 'react';

const ToastContext = React.createContext({});
const ToastContextProvider = ToastContext.Provider;
const ToastContextConsumer = ToastContext.Consumer;

export { ToastContext, ToastContextProvider, ToastContextConsumer };
