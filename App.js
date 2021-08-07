import React from 'react';
import Main from './screens/Main';
import Home from './screens/Home';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home' screenOptions = {{headerShown: false}} >
        <Stack.Screen name = 'Home' component = {Home} />
        <Stack.Screen name = 'Main' component = {Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}