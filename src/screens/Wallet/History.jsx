import { StyleSheet, View ,Image} from 'react-native'
import React from 'react'
import { Text } from '../../utils/Translate'

const History = () => {
  return (
    <View>
    <View style={styles.header}>
    <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
    <Text style={styles.headerText}>Transaction History</Text>
  </View>
  <View style={{margin:10,flexDirection:"row",backgroundColor:"#F2F2F2",justifyContent:"space-between",padding:15,borderRadius:10,elevation:2}}>
  <View style={{height: 40, width: 40, borderRadius: 50, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center"}}>
  <Image source={require('../../assets/img/downarrow.png')} style={{height: 20, width: 20, alignSelf: "center"}} tintColor={"gray"} />
</View>
<View>
<Text style={{color:"black",fontSize:21,fontWeight:600}}>₹ 15,600</Text>
<Text style={{color:"lightgray"}}>12:34 | 20 Dec 2022</Text>

</View>
<View style={{flexDirection:"row",alignItems:"center"}}>
<View style={{height:15,width:15,backgroundColor:"blue",borderRadius:50,justifyContent:"center",alignItems:"center",}}>
<Image source={require('../../assets/img/radic.png')} style={{height: 10, width: 10, alignSelf: "center"}} tintColor={"green"} />
</View>
<Text style={{color:"black",paddingLeft:8}}>Failed</Text>

</View>
<View style={{height: 40, width: 40, borderRadius: 50, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center"}}>
<Image source={require('../../assets/img/rightarrow1.png')} style={{height: 20, width: 20, alignSelf: "center"}} tintColor={"gray"} />
</View>
  </View>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 0.2,
        borderBottomColor: "gray",
        marginBottom: 20,
      },
      backImage: {
        height: 45,
        width: 45,
        marginRight: 8, 
      },
      headerText: {
        fontSize: 24,
        fontWeight:"600" ,
        color:"black"
      },
})
