import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import {Text} from '../../utils/Translate';
import {Button} from '../../utils/Translate';
import {OtpInput} from 'react-native-otp-entry';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import basic from '../../services/BasicServices';
import {StackActions} from '@react-navigation/native';
import ChatSockService from '../../services/api/ChatSockService';
import Toast from 'react-native-toast-message';
import BackgroundTimer from 'react-native-background-timer';
import {setLoggedIn} from '../../..';

const {width} = Dimensions.get('window');

export default function Otp({navigation, route}) {
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [errorMessage, setErrorMessage] = useState();
  const auth = new AuthenticationApiService();
  const {phone, userType} = route.params;

  let timerRef = null;

  const startOTPTimer = () => {
    setSeconds(59);
    if (timerRef) {
      BackgroundTimer.clearInterval(timerRef);
    }
    timerRef = BackgroundTimer.setInterval(() => {
      setSeconds(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          BackgroundTimer.clearInterval(timerRef);
          setErrorMessage('OTP Expired. Please Resend');
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    startOTPTimer();
    return () => {
      if (timerRef) {
        BackgroundTimer.clearInterval(timerRef);
      }
    };
  }, []);

  function otpChanged(value) {
    setErrorMessage('');
    setOtp(value + '');
  }

  async function resendOtp() {
    setErrorMessage(null);
    setLoading(true);
    try {
      let response = await auth.sendOtp(phone);
      if (response.status === 1) {
        ToastAndroid.show('Otp sent successfully', ToastAndroid.SHORT);
        startOTPTimer(); // ⏱️ Restart timer here
      } else {
        setErrorMessage('*' + response.Backend_Error);
      }
    } catch (error) {
      console.log('Error in Resending OTP: ', error.message);
      setErrorMessage('*Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function next() {
    if (!otp || otp.length === 0) {
      setErrorMessage('*Enter The OTP First');
      return;
    }

    if (otp.length !== 4) {
      setErrorMessage('*OTP must be of 4 digits');
      return;
    }

    try {
      setErrorMessage(null);
      setLoading(true);
      let response = await auth.verifyOtpAndRegister(phone, otp, userType);
      if (response.status === 1) {
        await basic.setJwt(response.token);
        await basic.setId(response.user_id);

        ChatSockService.connect();
        setLoggedIn(true);
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } else if (response.status === 2) {
        navigation.dispatch(
          StackActions.replace('SignupName', {
            phone: phone,
            otp: otp,
            userType: userType,
          }),
        );
      } else {
        setErrorMessage('*' + response.Backend_Error);
      }
    } catch (err) {
      console.log('Error in Verifying OTP: ', err.message);
      setErrorMessage('*Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={{zIndex: 200}}>
        <Toast />
      </View>
      <SafeAreaView style={styles.safeArView}>
        <View style={styles.bbView}>
          <Image
            source={require('../../assets/img/bbcolorlogo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        <View style={styles.containerCard}>
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <Text style={styles.heading}>Enter OTP to Continue</Text>
              <Image
                source={require('../../assets/img/arrowtoright.png')}
                resizeMode="contain"
                style={styles.rightArrow}
              />
            </View>

            <View style={styles.otpContainer}>
              <OtpInput
                numberOfDigits={4}
                focusColor="blue"
                focusStickBlinkingDuration={500}
                onTextChange={otpChanged}
                theme={{
                  pinCodeContainerStyle: styles.otpBox,
                  pinCodeTextStyle: styles.otpText,
                }}
                textInputProps={{selectTextOnFocus: false, caretHidden: true}}
              />
            </View>

            <View style={styles.otpMetaRow}>
            <View style={{flex:0.7}}>
                {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </View>
              <Text style={styles.validityText}>
                OTP Valid For: 00:{seconds > 9 ? seconds : '0' + seconds}
              </Text>
            </View>

            <Text style={styles.sentToText}>OTP Sent on +91 {phone}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.changeNumber}>Change Number</Text>
            </TouchableOpacity>

            <Button
              onPress={next}
              title="Confirm"
              loading={loading}
              titleStyle={styles.confirmTitle}
              buttonStyle={styles.confirmBtn}
              loadingProps={{
                size: 'large',
                color: '#701DDB',
              }}
            />

            <View style={styles.resendContainer}>
              <Text style={styles.resendLabel}>Did not receive OTP?</Text>
              <TouchableOpacity onPress={resendOtp}>
                <Text style={styles.resendLink}> Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomImageContainer}>
          <Image
            source={require('../../assets/img/Girl.png')}
            resizeMode="contain"
            style={styles.bottomImage}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bbView: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 250,
  },
  containerCard: {
    backgroundColor: '#701DDB',
    borderTopLeftRadius: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  cardContent: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  rightArrow: {
    width: 35,
    height: 35,
    marginLeft: 10,
    tintColor: '#fff',
  },
  otpContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#9856EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 13,
    fontWeight: '500',
  },
  validityText: {
    color: '#fff',
    fontSize: 12,
  },
  sentToText: {
    marginTop: 50,
    color: '#fff',
    fontSize: 12,
  },
  changeNumber: {
    color: ColorsConstant.TermColor,
    marginTop: 5,
    fontSize: 13,
  },
  confirmBtn: {
    marginTop: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
  },
  confirmTitle: {
    color: '#701DDB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  resendLabel: {
    color: '#fff',
  },
  resendLink: {
    color: ColorsConstant.TermColor,
    marginLeft: 4,
  },
  bottomImageContainer: {
    backgroundColor: '#701DDB',
    width: '100%',
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
