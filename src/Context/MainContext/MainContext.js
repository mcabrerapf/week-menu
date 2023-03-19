import React from 'react';

const MainContext = React.createContext({});
const MainContextProvider = MainContext.Provider;
const MainContextConsumer = MainContext.Consumer;

export { MainContext, MainContextProvider, MainContextConsumer };
