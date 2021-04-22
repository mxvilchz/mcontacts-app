import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import HomeScreens from '../screens/HomeScreens'
import InitialScreens from '../screens/InitialScreens'
import ContactScreen from '../screens/ContactScreen'

const Stack = createStackNavigator()

const Navigation = () => {
  const { goToHome } = useSelector(state => state.contact)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !goToHome ? (
            <>
              <Stack.Screen name="Initial" component={InitialScreens} options={{
                headerShown: false
              }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreens} />
              <Stack.Screen name="Contact" component={ContactScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
