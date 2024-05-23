// History.js
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';

const History = () => {
  const data = [
    {
      r:"₹ 15,600",
      s:"12:34 | 20 Dec 2022",
      sucess:1,
      type:0,
    },
    {
      r:"₹ 15,600",
      s:"12:34 | 20 Dec 2022",
      sucess:-1,
      type:"debit",
    },
    {
      r:"₹ 15,600",
      s:"12:34 | 20 Dec 2022",
      sucess:0,
      type:"credit",
    },
    {
      r:"₹ 15,600",
      s:"12:34 | 20 Dec 2022",
      sucess:1,
      type:"debit",
    },  {
      r:"₹ 15,600",
      s:"12:34 | 20 Dec 2022",
      sucess:0,
      type:"credit",
    }
    
  ]
  return (
    <View style={{backgroundColor:"white",flex:1}}>
      <View style={styles.header}>
        <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      <ScrollView>

      {

        data.map((res)=>{
          return(
            <View style={styles.historyContainer}>
        <View style={styles.transactionEntry}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/img/downarrow.png')} style={styles.icon} tintColor={"#129C73"} />
          </View>
          <View>
            <Text style={styles.transactionAmount}>{res.r}</Text>
            <Text style={styles.timestamp}>{res.s}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusIcon}>
              <Image source={require('../../assets/img/radic.png')} style={styles.icon1} tintColor={"white"} />
            </View>
            <Text style={styles.statusText}>Failed</Text>
          </View>
          <View style={styles.arrowIconContainer}>
            <Image source={require('../../assets/img/rightarrow1.png')} style={styles.icon2} tintColor={"gray"} />
          </View>
        </View>
      </View>
          )
        })
      }
      </ScrollView>

      
    </View>
  );
}

export default History;

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
    fontWeight: "600",
    color: "black",
  },
  historyContainer: {
    margin: 10,
    backgroundColor:"#FFFFFF"
  },
  transactionEntry: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#EFFFF6",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  icon2: {
    height: 15,
    width: 15,
    alignSelf: "center",
  },
  icon1: {
    height: 10,
    width: 10,
    alignSelf: "center",
  },
  transactionAmount: {
    color: "black",
    fontSize: 21,
    fontWeight: "600",
  },
  timestamp: {
    color: "#8A8A8A",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    height: 25,
    width: 25,
    backgroundColor: "#DC1111",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#DC1111",
    paddingLeft: 8,
    fontSize:17,
    fontWeight:"600"
  },
  arrowIconContainer: {
    // height: 40,
    // width: 40,
    // borderRadius: 50,
    // backgroundColor: "#f0f2f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
