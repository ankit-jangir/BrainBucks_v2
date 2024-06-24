import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { useWithdraw } from '../../context/WithdrawReducer';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import NoDataFound from '../../components/NoDataFound';
import { useIsFocused } from '@react-navigation/native';

const Withdraw = ({ navigation }) => {
  const { withdrawState, dispatch } = useWithdraw()
  const [verifiedBanks, setVerifiedBanks] = useState([])
  const [loading, setLoading] = useState(false)
  const wallServ = new WalletApiService();

  const bhRef = useRef()

  useEffect(() => {
    getVerifiedBanks()
    bhRef.current = BackHandler.addEventListener(
      'hardwareBackPress', () => {dispatch({type:'empty'})}
    )
    return () => bhRef.current.remove()
  }, [])

  async function getVerifiedBanks() {
    try {
      setLoading(true)
      let res = await wallServ.getVerfiedBanks()
      if (res.status === 1) {
        setVerifiedBanks(res.banks)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in getting verified banks: ", err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong'
      // })
    } finally {
      setLoading(false)
    }
  }

  function selectBank(bank) {
    dispatch({ type: 'details', withdrawDetails: { bank: bank } })
  }

  function inputAmount(text) {
    let reg = /^\d*$/
    if (reg.test(text)) {
      dispatch({ type: 'details', withdrawDetails: { amount: parseInt(text) } })
    }
  }

  async function next() {
    if (!withdrawState.amount) {
      Toast.show({
        type: 'error',
        text1: "Enter an amount to withdraw "
      })
      return;
    }

    if (!withdrawState.bank || Object.keys(withdrawState.bank).length===0) {
      Toast.show({
        type: 'error',
        text1: "Select a bank to withdraw the money "
      })
      return;
    }

    if (withdrawState.amount > withdrawState.balance - 10) {
      Toast.show({
        type: 'error',
        text1: "You can't withdraw more than Redeemable balance "
      })
      return;
    }

    bhRef.current.remove()
    navigation.navigate('withdrawMoney');
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 80 }}>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch({type:'empty'});
            navigation.navigate('Wallet');
          }}>
          <Image
            tintColor="gray"
            source={require('../../assets/img/radic.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Withdraw Money</Text>
          <Text style={{fontSize: 14, color: '#D92828',    fontFamily:"Work Sans"
        }}>
            Deduction fees = 3% per Transaction
          </Text>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text>Total Redeemable Balance</Text>
        <Text style={styles.balanceAmount}>₹ {withdrawState.balance - 10 >= 0 ? withdrawState.balance - 10 : 0}</Text>
      </View>
      <View style={styles.amountInputContainer}>
        <Text style={styles.amountLabel}>Enter Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Type Here..."
          value={withdrawState.amount}
          onChangeText={inputAmount}
          style={styles.inputs}
        />
        <Text>
          Entered amount should be less than or equal to{' '}
          <Text style={{ color: '#D92828' }}>₹ {withdrawState.balance - 10 >= 0 ? withdrawState.balance - 10 : 0}</Text>{' '}
        </Text>
      </View>
      <Text style={styles.balanceAmount1}>Select Bank account</Text>

      <ScrollView>
        {
          loading ?
            <ActivityIndicator size={40} />
            :
            verifiedBanks.length === 0 ?
              <NoDataFound message={"No Verified Banks yet. Wait for your banks to get verified or add new banks if not added"} action={getVerifiedBanks} actionText={"Load Again"} />
              :
              verifiedBanks.map((res, index) => {
                return (
                  <TouchableOpacity key={res._id} onPress={() => selectBank(res)}>
                    <View key={index} style={[styles.bankDetailsContainer, withdrawState.bank._id === res._id && { borderWidth: 2, borderColor: 'green' }]}>
                      <View style={styles.bankDetailsHeader}>
                        <View style={styles.bankIconContainer}>
                          <Image
                            source={require('../../assets/img/bank.png')}
                            resizeMode="contain"
                            style={styles.bankIcon}
                          />
                        </View>
                        <Text style={styles.bankName}>{res.bank_name}</Text>
                      </View>
                      <Text style={styles.bankHolder}>{res.acc_holder_name}</Text>
                      <View style={styles.bankAccountDetails}>
                        <Text style={styles.accountText}>{res.bank_acc_no}</Text>
                        <Text style={styles.ifscText}>{res.ifsc_code}</Text>
                      </View>
                      <View style={{ margin: 0 }}>
                        <TouchableOpacity style={styles.button}>
                          <Text style={styles.buttonText}>Remove Account</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
      </ScrollView>
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={next}>
        <Text style={styles.payNowText}>Withdraw Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    fontFamily:"Work Sans"

  },
  balanceContainer: {
    margin: 10,
    marginBottom: 0,
    borderColor: '#EFEFEF',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily:"Work Sans"

  },
  balanceAmount1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 20,
    fontFamily:"Work Sans",
    paddingBottom:5

  },
  amountInputContainer: {
    padding: 15,
  },
  amountLabel: {
    color: 'black',
    fontSize: 17,
    fontFamily:"Work Sans"

  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    fontSize: 17,
    fontFamily:"Work Sans",
color:"black"
  },
  bankDetailsContainer: {
    marginTop: 5,
    margin: 10,
    // padding: 10,
    // backgroundColor:'#EFEFEF',
    borderRadius: 10,
    borderWidth: 1,
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
    fontFamily:"Work Sans"

  },
  bankHolder: {
    paddingLeft: 10,
    fontWeight: '400',
    color: '#7E7E7E',
    paddingTop: 20,
    fontFamily:"Work Sans"

  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

  },
  accountText: {
    color: 'black',
    fontFamily:"Work Sans"

  },
  ifscText: {
    color: 'black',
    fontFamily:"Work Sans"

  },
  payNowButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    color: 'white',
    fontSize: 21,
    fontFamily:"Work Sans"

  },
  button: {
    backgroundColor: '#FFF2F2',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    color: '#D92828',
    fontSize: 14,
    fontWeight: '400',

  },
});
