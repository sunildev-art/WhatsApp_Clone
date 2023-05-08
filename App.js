
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import Signup from './src/Screens/Signup'
import { MD3LightTheme, Provider as PaperProvider,DefaultTheme } from 'react-native-paper';
import Route from './src/Navigation_Route/Route';



const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    // accent: '#f1c40f',
    // tertiary: '#a1b2c3',
  },
};

const App = () => {
  return (
    <>  
       <PaperProvider theme={theme}>
     <StatusBar barStyle="light-content" backgroundColor="green" />

    <Route />

    </PaperProvider>

    </>

  )
}

export default App

const styles = ScaledSheet.create({
  container:{
    // flex:1,
    // backgroundColor:"#FFFFFF"
  }
})

