import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, KeyboardAvoidingView, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import global from '../../global'
import { TextInput, Button } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null)
    const [showNext, setShowNext] = useState(false)
    const [loading, setSetLoading] = useState(false)

    if(loading){
        return(
            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }

const userSignup =async() =>{
    setSetLoading(true)
    if(!email || !password || !name || !image){
        alert("please add all the feild")
    }
  try {
    const result = await auth().createUserWithEmailAndPassword(email,password)
    firestore().collection("user").doc(result.user.uid).set({
     name:name,
     email:result.user.email,
     uid:result.user.uid,
     pic:image,
     status:"online"
    })
    setSetLoading(false)
  } catch (error) {
    alert("something went wrong")
  }
}


const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, (fileobj) => {
        if(fileobj.errorCode || fileobj.didCancel){
            return console.log("user cancellation!")
        }
        const img = fileobj.assets[0];
        const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(img.uri)
        // console.log(uri)
        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress == 100) alert('image uploaded')

            },
            (error) => {

                alert("error uploading image")
            },
            () => {
         uploadTask.snapshot.ref.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL)
                });
            }
        );
    }
    )
}
// const pickImageAndUpload = () => {
//     launchImageLibrary({quality:0.5},(fileobj)=>{
//         console.log(fileobj)
//     })
// }





    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.main_Container} behavior="position">
                <View style={styles.box1}>
                    <Text style={styles.Header_Text_Style}>Welcome to Whatsapp 5.0</Text>
                    <Image source={global.Assets.whatsLogo} style={styles.logo_img_Style} />
                </View>
                <View style={styles.box2}>
                    {!showNext &&
                        <>
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
                        </>
                    }

                    {showNext ?
                        <>
                            <TextInput
                                label="Name"
                                value={name}
                                mode="outlined"
                                onChangeText={(text) => setName(text)}
                            />
                            <Button mode="contained"
                                onPress={() => pickImageAndUpload()}>SELECT PROFILE PIC
                            </Button>
                            <Button mode="contained"
                                onPress={() => userSignup()}
                                disabled={image?false:true}
                                >SIGNUP
                            </Button>
                        </>
                        :
                        <Button mode="contained"

                            onPress={() => setShowNext(true)}>NEXT
                        </Button>
                    }

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ textAlign: "center", color: "#010F07" }}>Already have an account ?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Signup

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

