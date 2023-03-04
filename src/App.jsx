import React from 'react';
import './App.css';
import { Main, Footer } from './Components';
import { MainContextWrapper } from './Context';

function App() {
  return (
    <MainContextWrapper>
      <div className="app">
        <Main />
        <Footer />
      </div>
    </MainContextWrapper>

  );
}

export default App;
