import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


const ChatScreen = ({ user, route }) => {
  const [messages, setMessages] = useState([]);

  const { uid } = route.params || {};

  const getallMesaage = async () => {
    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    const querysnap = await firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', "desc")
      .get()
    const allmsg = querysnap.docs.map(docsnap => {
      return {
        ...docsnap.data(),
        createdAt: docsnap.data().createdAt.toDate()
      }
    })
    setMessages(allmsg)
  }

  useEffect(() => {
    //  getallMesaage()
    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    const messageRef = firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', "desc")

    const unSubscribe = messageRef.onSnapshot((querysnap) => {
      const allmsg = querysnap.docs.map(docsnap => {
        const data = docsnap.data()
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate()
          }
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date()
          }
        }
      })
      setMessages(allmsg)
    })


    return ()=>{
      unSubscribe()
    }

  }, [])

  const onSend = (messageArray) => {
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date()
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
  }

  return (

    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'black',
                },
                left: {
                  color: "white"
                }
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: 'green',
                },
                right: {
                  backgroundColor: "violet"
                }
              }}
            />
          );
        }}
        renderInputToolbar={(props)=>{
          return <InputToolbar {...props} 
          containerStyle={{borderTopWidth:1, borderTopColor: 'green'}}
          textInputStyle={{ color: "black" }}
          textStyle={{ color: "black" }}
           />
        }}
      />
    </View>


  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,

  }
})

//DOMOpOcnTNgsQxViFotBEyoJ06B3-T0S06hsxbhXu31QquccdQKCD7cP2 

