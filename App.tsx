/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navbar from './components/Navbar';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  return (
    <>
    <View
      style={{
        display:'flex',
        flex:1,
        backgroundColor:'black',
        position:'relative',
        flexDirection:'column'
      }}
    >
      <Text
        style={{color:'red',flex:1,backgroundColor:'white'}}
      >hi this is sahil khan</Text>
      <Navbar/>
    </View>
    </>
  );
}


export default App;
