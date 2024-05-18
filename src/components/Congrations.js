import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Congrations = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card1}>
    <View>
    <LottieView
    source={require('../assets/img/Congrations.json')}
    autoPlay
    loop
    style={styles.animation}
  />
    </View>
    <View>
    <Text style={{fontSize:12,textAlign:"center"}} >Successfully Registered for </Text>
    <View>
    <View style={styles.ImgContainer}>
    <Image
        source={require('../assets/img/Rectangle.png')}
        
        resizeMode='contain'
      />
      <Text style={styles.Text11}>SBI-PO Current Affairs</Text>
    </View>
   <View style={styles.CContainer}>
   <TouchableOpacity>
   <Text style={{fontSize:17}}>Continue</Text>
   </TouchableOpacity>
   </View>
    </View>
    </View>
      </View>

    </View>
  )
}

export default Congrations

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    card1:{
        height:350,
        width:"80%",
        backgroundColor:"white",
        borderRadius:10,
        alignItems:"center",
        elevation: 14,
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    animation:{
        height:150,
        width:400
    },
    ImgContainer: {
        // aspectRatio: 1, 
        // borderRadius: 50, 
        // borderWidth: 1,
        overflow: 'hidden',
        marginTop: 20,
        justifyContent:"space-between",
        flexDirection:"row"
      },
      image: {
        flex: 1,
        width:"100%",
        height: "100%",
      },
      Text11:{
        paddingLeft:5,
        textAlign:"center",
        paddingTop:7,
        fontWeight:"800",
        color:"black"
      },
      CContainer:{
        alignItems:"center",
        marginTop:20,
        padding:8,
        borderRadius:5,
        backgroundColor:"#9de3b3"
      }
})