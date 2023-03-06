import React from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { Main, Footer } from './Components';
import { MainContextWrapper } from './Context';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <MainContextWrapper>
          <div className="app">
            <button type="button" onClick={signOut}>get me out</button>
            {console.log(user)}
            <Main />
            <Footer />
          </div>
        </MainContextWrapper>
      )}
    </Authenticator>

  );
}

export default App;
