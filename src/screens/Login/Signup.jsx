import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
  Linking
} from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/SingUp.styles';
import { Text, TextInput } from '../../utils/Translate';
import { Button } from '../../utils/Translate';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';

export default function Signup({ navigation, route }) {
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [numberDone, setNumberDone] = useState(false)

  /**
   * This function validates user input and sends to the otp screen
   * @returns exit if the mobile number is not 10 digits or terms are not accepted
   */
  async function next() {

    setErrorMessage(null)
    if (phone.length === 0) {
      setErrorMessage("*Please enter mobile number")
      setNumberDone(false)
      return;
    }
    if (phone.length !== 10) {
      setErrorMessage("*Mobile number must be of 10 digits")
      setNumberDone(false)
      return;
    }

    setNumberDone(true)
    if (!checked) {
      setErrorMessage("*You must accept the terms and conditions")
      return;
    }

    setLoading(true)

    try {
      setErrorMessage(null)
      const auth = new AuthenticationApiService();
      const resposne = await auth.sendOtp(phone)
      console.log("Response for OTP", resposne)
      if (resposne.status === 1) {
        if (resposne.otp) {
          ToastAndroid.show(resposne.otp + "", ToastAndroid.LONG)
        }
        navigation.navigate('Otp', {
          phone: phone
        })
      } else {
        setErrorMessage("*" + resposne.Backend_Error)
      }
    } catch (error) {
      console.log("Error while Sending OTP: ", error.message);
      setErrorMessage("*Something went wrong")
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorsConstant.White }}>
      <View style={styles.bbView}>
        <Image
          source={require('../../assets/img/bbcolorlogo.png')}
          resizeMode="contain"
          style={{ width: 250 }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.LetsView}>
          <View style={styles.LetsView2}>
            <View style={{ flex: 0.95 }}>
              <Text style={styles.textLets}> Let’s Crack Exams,</Text>
              <View style={styles.togetherview}>
                <Text style={styles.texttogether}> Together </Text>
                <Image
                  source={require('../../assets/img/hand.png')}
                  resizeMode="contain"
                  style={styles.handPic}
                />
              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <Image
                source={require('../../assets/img/arrowtoright.png')}
                resizeMode="contain"
                style={styles.rightarraow}
              />
            </View>
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.textEnter}> Enter Your Mobile Number </Text>
          <View style={[styles.inputView, (errorMessage && !numberDone) && { "borderColor": "red" }]}>
            <View style={styles.inputview91}>
              <Text style={styles.text91}>+ 91</Text>
            </View>
            <View style={styles.inputView1}>
              <TextInput
                onChangeText={value => {setErrorMessage(null), setPhone(value)}}
                value={phone}
                maxLength={10}
                style={styles.textinputt}
                keyboardType="numeric"
                placeholder="123   456   7890"
                placeholderTextColor={ColorsConstant.uncheckedcolor}
              />
            </View>
          </View>
        </View>

        <View>
          {(errorMessage && !numberDone) && <Text key={errorMessage} style={styles.errormsg}>{errorMessage}</Text>}
        </View>
        <View style={styles.checboxview}>
          <View style={styles.checboxview2}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                setErrorMessage(null)
                setChecked(!checked)
              }}>
                <View style={styles.checkboimg}>
                  <Image
                    source={
                      !checked
                        ? require('../../assets/img/square.png')
                        : require('../../assets/img/check-box-with-check-sign.png')
                    }
                    tintColor={errorMessage && numberDone ? "red" : '#fff'}
                    style={styles.checkboxImage}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.textHereby}>
                {' '}
                I hereby confirm my age is 18 Years or above & agree to
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'https://brainbucks.co.in/terms/condition',
                    );
                  }}>
                  <Text style={styles.textTerm}> terms & conditions </Text>
                </TouchableOpacity>
                <View style={{ marginTop: -6 }}>
                  <Text style={{ color: ColorsConstant.White, fontSize: 10 }}>
                    and
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://brainbucks.co.in/privacy/policy');
                  }}>
                  <Text style={styles.textTerm}>Privacy policy</Text>
                </TouchableOpacity>
                <View style={{ marginTop: -6 }}>
                  <Text style={styles.textBrain}> Of Brain Bucks.</Text>
                </View>
              </Text>
            </View>
          </View>
          {(errorMessage && numberDone) && <Text key={errorMessage} style={styles.errormsg}>{errorMessage}</Text>}

        </View>

        <Button
          onPress={next}
          title="Get OTP"
          loading={loading}
          titleStyle={styles.textOt}
          buttonStyle={styles.BtnOtp}
          loadingProps={{
            size: 'large',
            color: '#701DDB',
          }}
        />
        <View style={styles.imgView}>
          <View style={styles.imgView2}>
            <Image
              source={require('../../assets/img/Girl.png')}
              resizeMode="contain"
              style={styles.girlimg}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
