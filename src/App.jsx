// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import { Main, Header } from './Components';
import { MainContextWrapper } from './Contexts/MainContext';
import { ToastContextWrapper } from './Contexts/ToastContext';
import awsExports from './aws-exports';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

function App() {
  return (

    <div className="app">
      <Authenticator hideSignUp>
        {({ signOut }) => (
          <MainContextWrapper>
            <ToastContextWrapper>
              <div className="app-container">
                <Header signOut={signOut} />
                <Main />
              </div>
            </ToastContextWrapper>
          </MainContextWrapper>
        )}
      </Authenticator>
    </div>

  );
}

export default App;
