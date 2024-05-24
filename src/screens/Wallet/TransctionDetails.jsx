import {StyleSheet, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {Text} from '../../utils/Translate';

const TransctionDetails = ({navigation}) => {
  return (
    <>
    <StatusBar  backgroundColor={"#D92828"}></StatusBar>

    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={()=>{navigation.navigate("history")}}>
      <Image
          source={require('../../assets/img/back.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>
        
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      <View style={styles.amountContainer}>
  <Image
    source={require('../../assets/img/bb.png')}
    style={styles.tickImage}
  />
  <Text style={styles.amountText}>15,600</Text>
</View>
<View style={styles.amountContainer}>
  <View style={styles.ContainertickImage}>
    <Image
      source={require('../../assets/img/radic.png')}
      style={styles.tickImage1}
      tintColor={'white'}
    />
  </View>
  <Text style={styles.messageText}>Payment Failed</Text>
</View>
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionLabel}>Transaction ID</Text>
        <Text style={styles.transactionId}>#htnOP1256BHIPOK569822</Text>
        <View>
          <Text style={styles.paymentText}>Payment Method</Text>
          <View style={styles.ImageContiner}>
            <Image
              source={require('../../assets/img/GroupB.png')}
              style={styles.timerImage}
              resizeMode="contain"
            />
            <Text style={[styles.paymentText1]}>UPI</Text>
          </View>
        </View>
        <View style={styles.transactionDetails}>
          <Image
            source={require('../../assets/img/Timer.png')}
            style={styles.timerImage}
          />
          <Text style={styles.transactionDate}>20 Dec 2022 | 12:34 IST</Text>
        </View>
        <View style={styles.FailureContainer}>
          <Text style={styles.FailureText}>Reason for Failure</Text>
          <Text style={styles.FailureTextR}>Declined by Client</Text>
        </View>
      </View>
    </View>
    </>
   
  );
};

export default TransctionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D92828',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 37,
    fontWeight: '800',
    color: '#FFFFFF',
    paddingLeft: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  ContainertickImage: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    padding: 3,
    marginRight: 5,
    marginTop:8,
    justifyContent:"center",
    alignItems:"center"
  },
  tickImage: {
    height: 45,
    width: 45,
  },
  tickImage1: {
    height: 15,
    width: 15,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign:"center",
    paddingTop:7
  },

  
  detailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,

    marginTop: 40,
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 200,
  },
  transactionLabel: {
    color: '#A1A2AD',
    fontSize: 14,
  },
  transactionId: {
    color: '#A1A2AD',
    fontSize: 19,
  },
  transactionDetails: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerImage: {
    height: 35,
    width: 35,
  },
  transactionDate: {
    paddingLeft: 20,
    fontSize: 17,
    color: '#A1A2AD',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A1A2AD',
    paddingTop: 15,
    paddingLeft: 5,
  },
  paymentText1: {
    fontSize: 24,
    fontWeight: '600',
    color: '#A1A2AD',
    paddingLeft: 15,
  },

  ImageContiner: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  FailureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  FailureText: {
    textAlign: 'center',
    color: '#A1A2AD',
    fontSize: 16,
    fontWeight: "500",
  },
  FailureTextR: {
    textAlign: 'center',
    color: '#A1A2AD',
    fontSize: 24,
    fontWeight: "600",
  },
});
