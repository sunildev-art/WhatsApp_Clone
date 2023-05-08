import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, KeyboardAvoidingView, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import global from '../../global'
import { TextInput, Button } from 'react-native-paper'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setSetLoading] = useState(false)


    if(loading){
        return(
            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }

    const userLogin =async() =>{
        setSetLoading(true)
        if(!email || !password ){
            alert("please add all the feild")
        }
      try {
        const result = await auth().signInWithEmailAndPassword(email,password)
        
        setSetLoading(false)
      } catch (error) {
        alert("something went wrong")
      }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.main_Container} behavior="position">
                <View style={styles.box1}>
                    <Text style={styles.Header_Text_Style}>Welcome to Whatsapp 5.0</Text>
                    <Image source={global.Assets.whatsLogo} style={styles.logo_img_Style} />
                </View>
                <View style={styles.box2}>
                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        label="Password"
                        mode="outlined"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    
                    <Button mode="contained"
                        onPress={() => userLogin()}>LOGIN
                    </Button>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                        <Text style={{ textAlign: "center",color:"#010F07"}}>Don't have an account ?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    main_Container: {
        margin: "10@s",
        // alignItems:"center",
        justifyContent: "center",

    },
    Header_Text_Style: {
        fontSize: "22@s",
        color: "green",
        margin: "10@s"
    },
    logo_img_Style: {
        width: "150@s",
        height: "150@s",
        resizeMode: "contain",
        alignSelf: "center"
    },
    box1: {
        alignItems: "center",

    },
    box2: {
        paddingHorizontal: "30@s",
        justifyContent: "space-evenly",
        height: "50%"
    },

})