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
  const [data, setData] = useState(route.params.res)
  const [loading, setLoading] = useState(false);


  let walletServ = new WalletApiService()

  useEffect(() => {
    setLoading(true)
    walletServ.viewPaymentDetails(data._id).then((res) => {
      if (res.sendata) {
        setData(res.sendata)
      }
    }).catch(err => console.log("Error in getting payment details: ", err)).finally(() => setLoading(false))
  }, [])


  return (
    <>
      <StatusBar backgroundColor={
        data.success == 1 ?
          '#701DDB'
          : data.success == 0 ?
            'red'
            : 'orange'

      } />
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>


      <View style={{
        flex: 1,
        backgroundColor: data.success == 1 ? '#701DDB' : data.success == 0 ? 'red' : data.success == -1 ? 'orange' : 'red',
      }}>
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
        {
          loading ?
            <ActivityIndicator size={40} style={{ flex: 1 }} />
            :
            <>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>₹</Text>
                <Text style={styles.amountText}>{data.amount}</Text>
              </View>
              {
                data.success == 1 ? <>
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
                  data.success == 0 ? <>
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
                  </> :
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
                <Text style={styles.transactionLabel}>Order ID</Text>
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

                <View>
                  <Text style={[styles.paymentText, { marginBottom: 10 }]}>Payment Date</Text>

                  <View style={styles.transactionDetails}>

                    <Image
                      source={require('../../assets/img/Timer.png')}
                      style={styles.timerImage}
                    />

                    <Text style={styles.transactionDate}>{data.order_datetime}</Text>
                  </View>
                </View>
                {
                  data.bankdetails
                  &&
                  <View style={styles.FailureContainer}>
                    <Text style={styles.FailureText}>Bank Details</Text>
                    <View key={data.bankdetails._id} style={styles.bankDetailsContainer}>
                      <View style={styles.bankDetailsHeader}>
                        <View style={styles.bankIconContainer}>
                          <Image
                            source={require('../../assets/img/bank.png')}
                            resizeMode="contain"
                            style={styles.bankIcon}
                          />
                        </View>
                        <Text style={styles.bankName}>{data.bankdetails.bank_name}</Text>
                      </View>
                      <Text style={styles.bankHolder}>{data.bankdetails.acc_holder_name}</Text>
                      <View style={styles.bankAccountDetails}>
                        <Text style={styles.accountText}>{data.bankdetails.bank_acc_no}</Text>
                        <Text style={styles.ifscText}>{data.bankdetails.ifsc_code}</Text>
                      </View>
                    </View>

                  </View>
                }
              </View>
            </>
        }
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
    marginBottom: 10,
  },
  transactionId: {
    color: '#A1A2AD',
    fontSize: 19,
    fontFamily: 'Work Sans',
  },
  transactionDetails: {
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
    marginVertical: 10,
    marginTop: 20
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
  bankDetailsContainer: {
    margin: 10,
    // padding: 10,
    // backgroundColor:'#EFEFEF',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    borderColor: 'lightgray',
  },
  bankDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 8,
  },
  bankIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  bankIcon: {
    height: '100%',
    width: '100%',
  },
  bankName: {
    fontSize: 17,
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black',
  },
  bankHolder: {
    paddingLeft: 10,
    fontWeight: '400',
    color: '#7E7E7E',
    paddingTop: 20,
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  accountText: {
    color: 'black',
  },
  ifscText: {
    color: 'black',
  },
});
