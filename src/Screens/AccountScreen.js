import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { ScaledSheet } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const AccountScreen = ({ user }) => {
    const [profile, setProfile] = useState("")

    useEffect(() => {
        firestore().collection('user').doc(user.uid).get().then(docsnap => {
            setProfile(docsnap.data())
        })
    }, [])

    if (!profile) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
            <View style={{ flex: 1, margin: 10,justifyContent:"space-evenly" }}>
                <Image source={{ uri: profile.pic }} style={styles.profile_Image_Style} />
                <Text style={styles.name_Text_Style}>Name - {profile.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <Feather name='mail' size={30} color="white" />
                    <Text style={styles.email_Text_Style}>{profile.email}</Text>
                </View>
                <Button
                style={styles.btn_Style}
                    mode="contained"
                    onPress={() => {
                        firestore().collection('user')
                      .doc(user.uid)
                      .update({
                        status:firestore.FieldValue.serverTimestamp()
                      }).then(()=>{
                        auth().signOut()
                      })
                     }}>LOGOUT
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen

const styles = ScaledSheet.create({
    profile_Image_Style: {
        height: "200@s",
        width: "200@s",
        borderRadius: "100@s",
        borderWidth: "3@s",
        borderColor: "white",
        alignSelf: "center"
    },
    name_Text_Style: {
        textAlign: "center",
        marginTop: "15@s",
        fontSize: "23@s",
        color: "white"
    },
    email_Text_Style: {
        // marginTop:"10@s",
        fontSize: "23@s",
        color: "white",
        marginLeft: "10@s"

    },
    btn_Style:{
borderColor:"white",
borderWidth:"2@s",
width:"120@s",
alignSelf:"center",
borderRadius:"5@s"
    }
})