import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { useWithdraw } from '../../context/WithdrawReducer';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import NoDataFound from '../../components/NoDataFound';
import { ColorsConstant } from '../../constants/Colors.constant';

const Withdraw = ({ navigation }) => {
  const { withdrawState, dispatch } = useWithdraw();
  const [verifiedBanks, setVerifiedBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const wallServ = new WalletApiService();
  const bhRef = useRef();

  useEffect(() => {
    getVerifiedBanks();
    bhRef.current = BackHandler.addEventListener('hardwareBackPress', () => {
      dispatch({ type: 'empty' });
      return false;
    });
    return () => bhRef.current.remove();
  }, []);

  async function getVerifiedBanks() {
    try {
      setLoading(true);
      let res = await wallServ.getVerfiedBanks();
      if (res.status === 1) {
        setVerifiedBanks(res.data);
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
    if (!withdrawState.amount || withdrawState.amount < 100) {
      ToastAndroid.show('Enter minimum ₹100 amount', ToastAndroid.SHORT);
      return;
    }

    if (!withdrawState.bank?._id) {
      ToastAndroid.show('Select a bank first', ToastAndroid.SHORT);
      return;
    }

    if (withdrawState.amount > withdrawState.balance) {
      ToastAndroid.show('Amount exceeds redeemable balance', ToastAndroid.SHORT);
      return;
    }

    try {
      setWithdrawLoading(true); // Set loader for Withdraw Now button
      const result = await wallServ.withdrawMoneyReq({
        bankAccountId: withdrawState.bank._id,
        amount: withdrawState.amount,
      });

      if (result.status === 1) {
        ToastAndroid.show('Withdrawal request successful', ToastAndroid.SHORT);
        dispatch({ type: 'empty' }); // Clear state after successful withdrawal
        navigation.navigate('history');
      } else {
        ToastAndroid.show(result.Backend_Error || 'Something went wrong', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.error('Error in withdrawal request:', err.message);
      ToastAndroid.show('Withdrawal failed', ToastAndroid.SHORT);
    } finally {
      setWithdrawLoading(false); // Reset loader
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 80 }}>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      <StatusBar backgroundColor={ColorsConstant.Theme} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: 'empty' });
            navigation.navigate("wallet");
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
        <Text style={styles.totaltext}>Total Redeemable Balance</Text>
        {/* <Text style={styles.balanceAmount}>₹ {withdrawState.balance - 10 >= 0 ? withdrawState.balance - 10 : 0}</Text>*/}
        <Text style={styles.balanceAmount}>₹ {withdrawState.balance}</Text>

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
          Amount must be between ₹100 and ₹{withdrawState.balance}
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
                <Text style={styles.bankHolder}>{res.account_holder_name}</Text>
                <View style={styles.bankAccountDetails}>
                  <Text style={styles.accountText}>A/C: {res.account_number}</Text>
                  <Text style={styles.ifscText}>IFSC: {res.ifsc}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

     <TouchableOpacity
        style={[styles.payNowButton, withdrawLoading && styles.disabledButton]}
        onPress={next}
        disabled={withdrawLoading}>
        {withdrawLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.payNowText}>Withdraw Now</Text>
        )}
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
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    width: 17,
    height: 17,
  },
  headerTextContainer: {
    paddingLeft: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Work Sans',
  },
  feeText: {
    fontSize: 13,
    color: '#D92828',
    fontFamily: 'Work Sans',
    fontWeight: "400"
  },
  balanceContainer: {
    margin: 12,
    borderColor: '#EFEFEF',
    padding: 15,
    borderWidth: 0.6,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  totaltext: {
    fontFamily: "Work Sans",
    fontWeight: "400",
    fontSize: 14,
    color: "#8A8A8A",
    fontStyle: "Regular"
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Work Sans',
    color: '#7E7E7E',
  },
  balanceAmount1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 20,
    fontFamily: 'Work Sans',
    paddingBottom: 5,
    paddingTop: 40,
  },
  amountInputContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  amountLabel: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Work Sans',
    marginBottom: 6,
    fontWeight: "500"
  },
  inputs: {
    borderColor: '#ccc',
    borderWidth: 0.6,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Work Sans',
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 5
  },
  warningText: {
    fontSize: 13,
    marginTop: 3,
    color: '#D92828',
    fontFamily: 'Work Sans',
  },
  bankCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,

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
    color: '#000',
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
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  payNowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
});
