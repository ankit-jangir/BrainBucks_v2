import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import { useIsFocused } from '@react-navigation/native';

const Deposit = ({ navigation }) => {
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  let walletService = new WalletApiService();
  const isFocused = useIsFocused();

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        console.log(orderID, 'Verified');
      },
      onError(error, orderID) {
        console.log('exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID);
      },
    });

    return CFPaymentGatewayService.removeCallback();
  }, [isFocused]);

  async function createOrder() {
    if (loading) return;
    setErrMsg(null);

    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setErrMsg('Enter a valid amount first');
      return;
    }

   if (numericAmount < 100) {
  setErrMsg('Minimum deposit amount is ₹100');
  return;
}


    try {
      setLoading(true);
      let res = await walletService.createOrder(amount);
      console.log(res);
      if (res.status === 1) {
        const session = new CFSession(
          res.payment_session_id,
          res.order_id,
          CFEnvironment.PRODUCTION
        );

        const paymentModes = new CFPaymentComponentBuilder()
          .add(CFPaymentModes.CARD)
          .add(CFPaymentModes.UPI)
          .add(CFPaymentModes.NB)
          .add(CFPaymentModes.WALLET)
          .add(CFPaymentModes.PAY_LATER)
          .build();

        const theme = new CFThemeBuilder()
          .setNavigationBarBackgroundColor(ColorsConstant.Theme)
          .setNavigationBarTextColor('#FFFFFF')
          .setButtonBackgroundColor(ColorsConstant.Theme)
          .setButtonTextColor('#FFFFFF')
          .setPrimaryTextColor('#212121')
          .setSecondaryTextColor('#757575')
          .build();

        const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
        CFPaymentGatewayService.doPayment(dropPayment);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while creating order', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 30 }}>
        <Toast />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            tintColor="gray"
            source={require('../../assets/img/wrong.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Deposit Money</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Work Sans', color: 'gray' }}>
            In my Brain Bucks Wallet
          </Text>
        </View>
      </View>

      <View style={styles.amountInputContainer}>
        <Text style={styles.amountLabel}>Select Amount {'(₹)'}</Text>
        <TextInput
          placeholderTextColor="gray"
          keyboardType="numeric"
          placeholder="Click on any option below"
          style={[styles.inputs, errMsg && { borderWidth: 1, borderColor: 'red' }]}
          value={amount}
          onChangeText={(e) => setAmount(e)}
          editable={true}
        />
        {errMsg && <Text style={styles.errmsg}>*{errMsg}</Text>}
      </View>

      <View style={styles.quickAmountContainer}>
        {['1', '50', '100', '500','1000', '2000'].map((amt, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setAmount(amt)}
            style={styles.quickAmountButton}
          >
            <Text style={styles.quickAmountText}>₹ {amt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={createOrder} style={styles.payNowButton}>
        {loading ? (
          <ActivityIndicator size={30} color="#fff" />
        ) : (
          <Text style={styles.payNowText}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Deposit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
  },
  actionIcon: {
    width: 40,
    height: 40,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Work Sans',
  },
  amountInputContainer: {
    margin: 20,
    marginTop: 40,
  },
  amountLabel: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Work Sans',
    marginBottom: 6,
  },
  inputs: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 20,
    color: ColorsConstant.Black,
    backgroundColor: '#f0f0f0',
    fontFamily: 'Work Sans',
  },
  errmsg: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
    fontStyle: 'italic',
  },
  quickAmountContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#8258B8',
    height: 44,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 6,
  },
  quickAmountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  payNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    paddingVertical: 13,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  payNowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Work Sans',
  },
});
