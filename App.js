/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Login from './src/Login';
import Home from './src/Home';

const Stack = createStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator component={'home'}>
      <Stack.Screen 
        name="login"  
        component={Login} 
        options={{headerShown:false}}
      />
      <Stack.Screen name="home"  component={Home} />

    </Stack.Navigator>
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </NavigationContainer>
};


export default App;
