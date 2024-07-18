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
import RazorpayCheckout from 'react-native-razorpay';
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

  const isFocused = useIsFocused()

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        console.log(orderID, "Verified")
      },
      onError(error, orderID) {
        console.log(
          'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
        );
      },
    });

    return CFPaymentGatewayService.removeCallback();

  }, [isFocused])

  async function createOrder() {
    if (loading) {
      return;
    }
    setErrMsg(null);
    if (!amount) {
      setErrMsg('Enter a valid amount first');
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
        const dropPayment = new CFDropCheckoutPayment(
          session,
          paymentModes,
          theme
        );

        CFPaymentGatewayService.doPayment(dropPayment);

        // CFPaymentGatewayService.doWebPayment(JSON.stringify(session));

        // RazorpayCheckout.open(res.option2)
        //   .then(data => {
        //     navigation.navigate('paymentpopup', {
        //       status: 1,
        //     });
        //   })
        //   .catch(error => {
        //     navigation.navigate('paymentpopup', {
        //       status: 0,
        //     });
        //   });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while creating order', err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong',
      // });
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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            tintColor="gray"
            source={require('../../assets/img/radic.png')}
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
          placeholder="Type Here..."
          style={[
            styles.inputs,
            errMsg && { borderWidth: 1, borderColor: 'red' },
          ]}
          value={amount}
          editable={false}
        />
        {errMsg && (
          <Text style={styles.errmsg} key={errMsg}>
            *{errMsg}
          </Text>
        )}
      </View>
      <View style={styles.quickAmountContainer}>
        <TouchableOpacity
          onPress={() => setAmount('50')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 50</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('100')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('500')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('1000')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 1000</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={createOrder} style={styles.payNowButton}>
        {loading ? (
          <ActivityIndicator size={30} />
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
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
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
  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 21,
    color: ColorsConstant.Black,
    fontFamily: 'Work Sans',
  },
  quickAmountContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#8258B8',
    height: 35,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  quickAmountText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Work Sans',
  },
  payNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'Work Sans',
  },
  errmsg: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
  },
});
