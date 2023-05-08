import { StyleSheet, Text, TouchableOpacity, View,Image, SafeAreaView, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore'
import { ScaledSheet } from 'react-native-size-matters'
import { FAB } from 'react-native-paper';


const HomeScreen = ({user,navigation}) => {
  const [users,setUsers] = useState(null)
// console.log(user)
const getUser = async()=>{
  const quarySnap = await firestore().collection("user").where('uid',"!=",user.uid).get()
 const alluser = quarySnap.docs.map(docSnap =>docSnap.data())
//  console.log("kkkkkkkkkkkkkk",alluser)
 setUsers(alluser)
}

useEffect(() => {
  getUser()
}, [])

const RenderCard=({item})=>{
return(
  <TouchableOpacity onPress={()=>navigation.navigate("chat",{name:item.name,uid:item.uid,userImage:item.pic})}>
  <View style={styles.myCard}>
    <Image source={{uri:item.pic}} style={styles.image_Style}/>
    <View>
      <Text style={styles.name_Text_Style}>{item.name}</Text>
      <Text style={styles.name_Text_Style}>{item.email}</Text>
    </View>
  </View>
  </TouchableOpacity>
)
}

  return (
    <SafeAreaView style={styles.maincontainer}>
    <View style={styles.container}>
     <FlatList 
      data={users}
      keyExtractor={item=>item.uid}
      renderItem={({item})=><RenderCard item={item}/>}
     />
     <FAB
    icon="face-man-profile"
    color='black'
    style={styles.fab}
    onPress={() => navigation.navigate("account")}
  />
  
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = ScaledSheet.create({
  maincontainer:{
    flex:1,
    // backgroundColor:"#FFFFFF",
    // alignItems:"center"
  },
  container:{
    // margin:"5@s",
    marginVertical:"3@s",
    marginHorizontal:"5@s",
    flex:1
    
  },
  image_Style:{
    width:"60@s",
    height:"60@s",
    borderRadius:"30@s",
    backgroundColor:"green",
    // resizeMode:"contain"
  },
  name_Text_Style:{
    fontSize:"15@s",
marginLeft:"15@s",
color:"#010F07",

  },
  myCard:{
    flexDirection:"row",
    margin:"3@s",
    padding:"4@s",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:"10@s",
    borderBottomWidth:"1.8@s",
    borderBottomColor:"gray"
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    borderRadius:"50@s",
    backgroundColor:"#ccc"
  },
})