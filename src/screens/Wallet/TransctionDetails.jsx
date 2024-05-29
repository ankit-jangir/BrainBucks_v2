import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text } from '../../utils/Translate';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';

const TransctionDetails = ({ navigation, route }) => {
  const data = route.params.res;
  console.log(data);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);

  const wallet = new WalletApiService();

  return (
    <>
      <StatusBar backgroundColor={
        data.success==1?
        '#701DDB'
        : data.success==0?
        'red'
        :'orange'
        
        }/>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>

     
        <View style={{ flex: 1,
      backgroundColor: data.success==1?'#701DDB':data.success==0?'red': data.success==-1?'orange':'red',}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
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
            <Text style={styles.amountText}>{data.amount}</Text>
          </View>
          {
            data.success==1?<>
            <View style={styles.amountContainer}>
            <View style={styles.ContainertickImage}>
              <Image
                source={require('../../assets/img/arrowright.png')}
                style={styles.tickImage1}
                tintColor={'white'}
              />
            </View>
            <Text style={styles.messageText}>Payment success</Text>
          </View>
            </>
            :
            data.success==0?<>
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
            </>:
            <View style={styles.amountContainer}>
            <View style={styles.ContainertickImage}>
              <Image
                source={require('../../assets/img/pending.png')}
                style={styles.tickImage1}
                tintColor={'white'}
              />
            </View>
            <Text style={styles.messageText}>Payment pandding</Text>
          </View>

          }
          <View style={styles.detailsContainer}>
            <Text style={styles.transactionLabel}>Transaction ID</Text>
            <Text style={styles.transactionId}>{data.order_id}</Text>
            <View>
              <Text style={styles.paymentText}>Payment Method</Text>
              <View style={styles.ImageContiner}>
                <Image
                  source={require('../../assets/img/GroupB.png')}
                  style={styles.timerImage}
                  resizeMode="contain"
                />
                <Text style={[styles.paymentText1]}>{data.type}</Text>
              </View>
            </View>
            <View style={styles.transactionDetails}>
              <Image
                source={require('../../assets/img/Timer.png')}
                style={styles.timerImage}
              />
              <Text style={styles.transactionDate}>{data.order_datetime}</Text>
            </View>
            {/* <View style={styles.FailureContainer}>
              <Text style={styles.FailureText}>Reason for Failure</Text>
              <Text style={styles.FailureTextR}>Declined by Client</Text>
            </View> */}
          </View>
        </View>
    </>
  );
};

export default TransctionDetails;

const styles = StyleSheet.create({
  container: {
   
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
    fontFamily: 'Work Sans',
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
    fontFamily: 'Work Sans',
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
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    paddingTop: 7,
    fontFamily: 'Work Sans',
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
    fontSize: 16,
    fontFamily: 'Work Sans',
  },
  transactionId: {
    color: '#A1A2AD',
    fontSize: 19,
    fontFamily: 'Work Sans',
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
    fontFamily: 'Work Sans',
    fontWeight: '600',
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
    fontFamily: 'Work Sans',
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
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  FailureTextR: {
    textAlign: 'center',
    color: '#A1A2AD',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
});
