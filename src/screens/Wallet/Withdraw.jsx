import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { useWithdraw } from '../../context/WithdrawReducer';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import NoDataFound from '../../components/NoDataFound';

const Withdraw = ({ navigation }) => {
  const { withdrawState, dispatch } = useWithdraw();
  const [verifiedBanks, setVerifiedBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const wallServ = new WalletApiService();
  const bhRef = useRef();

  useEffect(() => {
    getVerifiedBanks();
    bhRef.current = BackHandler.addEventListener('hardwareBackPress', () => {
      dispatch({ type: 'empty' });
    });
    return () => bhRef.current.remove();
  }, []);

  async function getVerifiedBanks() {
    try {
      setLoading(true);
      let res = await wallServ.getVerfiedBanks();
      if (res.status === 1) {
        setVerifiedBanks(res.banks);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in getting verified banks: ', err.message);
    } finally {
      setLoading(false);
    }
  }

  function selectBank(bank) {
    dispatch({ type: 'details', withdrawDetails: { bank: bank } });
  }

  function inputAmount(text) {
    let reg = /^\d*$/;
    if (reg.test(text)) {
      dispatch({
        type: 'details',
        withdrawDetails: { amount: parseInt(text) },
      });
    }
  }

  async function next() {
    if (!withdrawState.amount) {
      ToastAndroid.show('Enter an amount to withdraw ', ToastAndroid.SHORT);
      return;
    }

    if (withdrawState.amount < 100) {
      ToastAndroid.show('Minimum amount should be ₹100', ToastAndroid.SHORT);
      return;
    }

    if (!withdrawState.bank || Object.keys(withdrawState.bank).length === 0) {
      ToastAndroid.show('Select a bank to withdraw the money ', ToastAndroid.SHORT);
      return;
    }

    if (withdrawState.amount > withdrawState.balance - 10) {
      ToastAndroid.show("You can't withdraw more than Redeemable balance ", ToastAndroid.SHORT);
      return;
    }

    bhRef.current.remove();
    navigation.navigate('withdrawMoney');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', paddingBottom: 80 }}>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: 'empty' });
            navigation.goBack();
          }}>
          <Image
            tintColor="#000"
            source={require('../../assets/img/radic.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Withdraw Money</Text>
          <Text style={styles.feeText}>Deduction fees = 3% per Transaction</Text>
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
          placeholder="Minimum ₹100"
          placeholderTextColor="#888"
          value={withdrawState.amount?.toString()}
          onChangeText={inputAmount}
          style={styles.inputs}
        />
        <Text style={styles.warningText}>
          Amount must be between ₹100 and ₹{withdrawState.balance - 10 >= 0 ? withdrawState.balance - 10 : 0}
        </Text>
      </View>

      <Text style={styles.balanceAmount1}>Select Bank account</Text>

      <ScrollView>
        {loading ? (
          <ActivityIndicator size={40} />
        ) : verifiedBanks.length === 0 ? (
          <NoDataFound
            message={'No Verified Banks yet. Wait for your banks to get verified or add new banks if not added'}
            action={getVerifiedBanks}
            actionText={'Load Again'}
          />
        ) : (
          verifiedBanks.map((res) => (
            <TouchableOpacity key={res._id} onPress={() => selectBank(res)}>
              <View
                style={[
                  styles.bankCard,
                  withdrawState.bank._id === res._id && {
                    borderColor: '#701DDB',
                    backgroundColor: '#F3EDFF',
                  },
                ]}>
                <View style={styles.bankHeader}>
                  <Image
                    source={require('../../assets/img/bank.png')}
                    style={styles.bankIcon}
                  />
                  <Text style={styles.bankName}>{res.bank_name}</Text>
                </View>
                <Text style={styles.bankHolder}>{res.acc_holder_name}</Text>
                <View style={styles.bankAccountDetails}>
                  <Text style={styles.accountText}>A/C: {res.bank_acc_no}</Text>
                  <Text style={styles.ifscText}>IFSC: {res.ifsc_code}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.payNowButton} onPress={next}>
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
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    width: 22,
    height: 22,
  },
  headerTextContainer: {
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Work Sans',
  },
  feeText: {
    fontSize: 13,
    color: '#D92828',
    fontFamily: 'Work Sans',
  },
  balanceContainer: {
    margin: 15,
    borderColor: '#EFEFEF',
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Work Sans',
    color: 'black',
  },
  balanceAmount1: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 20,
    fontFamily: 'Work Sans',
    paddingBottom: 5,
    paddingTop: 10,
  },
  amountInputContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  amountLabel: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Work Sans',
    marginBottom: 6,
  },
  inputs: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Work Sans',
    backgroundColor: '#fff',
    color: 'black',
  },
  warningText: {
    fontSize: 13,
    marginTop: 6,
    color: '#D92828',
    fontFamily: 'Work Sans',
  },
  bankCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bankIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bankName: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Work Sans',
  },
  bankHolder: {
    fontWeight: '400',
    color: '#7E7E7E',
    fontFamily: 'Work Sans',
    marginBottom: 10,
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountText: {
    color: 'black',
    fontFamily: 'Work Sans',
  },
  ifscText: {
    color: 'black',
    fontFamily: 'Work Sans',
  },
  payNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  payNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
});
