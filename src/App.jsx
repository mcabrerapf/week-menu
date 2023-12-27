// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import Main from './Components/Main';
import { MainContextWrapper } from './Contexts/MainContext';
import { ToastContextWrapper } from './Contexts/ToastContext';
import awsExports from './aws-exports';
import Footer from './Components/Footer';
import { ModalContextWrapper } from './Contexts/ModalContext';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

// Hold any of the footer buttons to copy that list to clipboard

function App() {
  return (
    <div className="app">
      <Authenticator hideSignUp>
        {({ signOut }) => (
          <ToastContextWrapper>
            <MainContextWrapper>
              <ModalContextWrapper>

                <Main />
                <Footer signOut={signOut} />
              </ModalContextWrapper>
            </MainContextWrapper>

          </ToastContextWrapper>
        )}
      </Authenticator>
    </div>

  );
}

export default App;
