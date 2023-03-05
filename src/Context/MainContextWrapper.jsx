import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    view: 0,
  });
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
