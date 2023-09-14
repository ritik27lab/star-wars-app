import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { STORE_KEY, storeReducer } from './src/redux/store';
import { configureStore } from '@reduxjs/toolkit';


import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  const Store = configureStore({
    reducer: { [STORE_KEY]: storeReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });



  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator colorScheme={"light"} />
      </NavigationContainer>

    </Provider>
  );
}

export const navigationRef = createNavigationContainerRef();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
