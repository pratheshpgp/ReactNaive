
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import {loginScreen} from 'screens'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name="Register" component={RegisterScreen} />
     <Stack.Screen name="Chat" component={ChatScreen} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}