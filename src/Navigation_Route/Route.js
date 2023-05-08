import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import auth from '@react-native-firebase/auth'
import HomeScreen from '../Screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../Screens/ChatScreen';
import firestore from '@react-native-firebase/firestore'
import AccountScreen from '../Screens/AccountScreen';

const Stack = createNativeStackNavigator();

const Route = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const unRagister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist)
        firestore().collection('user')
          .doc(userExist.uid)
          .update({
            status: "online"
          })
      }
      else setUser('')
    })
    return () => {
      unRagister()
    }

  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: "green"
      }}>
        {user ?
          <>
            <Stack.Screen name="Home" options={{
              // headerRight: () =>
              //   <MaterialIcons
              //     name='account-circle'
              //     size={34}
              //     color="green"
              //     style={{ marginRight: 10 }}
              //     onPress={() => {
              //       firestore().collection('user')
              //         .doc(user.uid)
              //         .update({
              //           status:firestore.FieldValue.serverTimestamp()
              //         }).then(()=>{
              //           auth().signOut()
              //         })
                   
              //     }}
              //   />,
              title: "WhatsApp"
            }} >
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="chat"
              options={({ route }) => ({ title:route.params.name })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="account">
              {props => <AccountScreen {...props} user={user} />}
            </Stack.Screen>
          </>
          :
          <>
            <Stack.Screen name="Login" component={Login} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Signup" component={Signup}
              options={{
                headerShown: false
              }}
            />
          </>
        }


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Route

