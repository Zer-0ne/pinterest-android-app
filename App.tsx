import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  useColorScheme,
  View,
} from 'react-native';

import MainNavigation from './Navigation/MainNavigation';
import AuthProvider from './Auth/AuthContext';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  return (
    <>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </>
  );
}


export default App;
