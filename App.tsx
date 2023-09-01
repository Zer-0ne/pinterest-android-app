import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import MainNavigation from './Navigation/MainNavigation';
import AuthProvider from './Auth/AuthContext';
import SplashScreen from './components/SplashScreen';
import Toast from './components/Toast';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  
  return (
    <>
      <ToastProvider
        placement="top"
        animationType='zoom-in'
        animationDuration={250}
        swipeEnabled={true}
        // renderToast={(toastOptions) => <Toast options={toastOptions} />}
      >
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </ToastProvider>
    </>
  );
}


export default App;
