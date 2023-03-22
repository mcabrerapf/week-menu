import React from 'react';

const ModalContext = React.createContext({});
const ModalContextProvider = ModalContext.Provider;
const ModalContextConsumer = ModalContext.Consumer;

export { ModalContext, ModalContextProvider, ModalContextConsumer };
