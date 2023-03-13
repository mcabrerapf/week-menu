import React from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import { Main, Header } from './Components';
import { MainContextWrapper } from './Context';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
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
    <MainContextWrapper>
      <div className="app">
        {/* {console.log(user)} */}
        <Authenticator hideSignUp>
          {({ signOut }) => (
            <div className="app-container">
              <Header signOut={signOut} />
              <Main />
            </div>

          )}
        </Authenticator>
      </div>
    </MainContextWrapper>

  );
}

export default App;
