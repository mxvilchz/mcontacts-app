import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'

import Navigation from './src/navigation'

import store from './src/config/store'

export default function App () {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <StatusBar style="auto" />
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  )
}
