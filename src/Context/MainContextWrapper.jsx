import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    view: 'menu',
    offlineMode: '',
  });

  useEffect(() => {
    const localOfflineMode = window.localStorage.getItem('week-menu-offline-mode');
    setContextState({ ...contextState, offlineMode: localOfflineMode });
  }, []);

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  return (
    <MainContextProvider value={{ ...contextState, setContextState: stateHandler }}>
      {children}
    </MainContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MainContextWrapper;
