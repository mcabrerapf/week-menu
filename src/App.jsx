import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import { ToastContextWrapper } from './Contexts/ToastContext';
import { MainContextWrapper } from './Contexts/MainContext';
import awsExports from './aws-exports';
import Main from './Components/Main';
import Footer from './Components/Footer';

Amplify.configure({
  ...awsExports,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

function App() {
  return (
    <div className="app h-f w-f bgc-bg">
      <Authenticator hideSignUp>
        {({ signOut }) => (
          <ToastContextWrapper>
            <MainContextWrapper>
              <Main />
              <Footer signOut={signOut} />
            </MainContextWrapper>
          </ToastContextWrapper>
        )}
      </Authenticator>
    </div>

  );
}

export default App;
