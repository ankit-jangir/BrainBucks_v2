import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import styles from '../../styles/SingUp.styles';
import {Text, TextInput, Button} from '../../utils/Translate';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import {SelectList} from 'react-native-dropdown-select-list';
import BasicServices from '../../services/BasicServices';

export default function Signup({navigation, route}) {
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [numberDone, setNumberDone] = useState(false);
  const [selected, setSelected] = useState('');
  const [isEduStored, setIsEduStored] = useState(null); // null = not set

  const referralCode = route.params?.referCode;

  const data = [
    {key: '1', value: 'Student'},
    {key: '2', value: 'Educator'},
  ];

  // Load from AsyncStorage on mount
  useEffect(() => {
    const fetchLocalUserType = async () => {
      const localObj = await BasicServices.getLocalObject();
      const isEdu = localObj?.is_edu;

      console.log('====================================');
      console.log(localObj, ';;;sss');
      console.log('====================================');

      if (isEdu === true || isEdu === false) {
        setIsEduStored(isEdu); // true or false
      } else {
        setIsEduStored(null); // not set
      }
    };
    fetchLocalUserType();
  }, []);

async function next() {
  setErrorMessage(null);

  // Validate phone number
  if (!phone || phone.length !== 10) {
    setErrorMessage('*Please enter valid 10-digit mobile number');
    setNumberDone(false);
    return;
  }

  setNumberDone(true);

  // Validate user type
  const isUserTypeSelected = isEduStored !== null || selected !== '';
  if (!isUserTypeSelected) {
    setErrorMessage('*Please select user type');
    return;
  }

  // Validate terms & conditions
  if (!checked) {
    setErrorMessage('*You must accept the terms and conditions');
    return;
  }

  setLoading(true);
  try {
    setErrorMessage(null);

    const auth = new AuthenticationApiService();

    // Determine user type to send
    const userTypeToSend =
      isEduStored !== null ? isEduStored : selected === 'Educator';

    const response = await auth.sendOtp(phone, userTypeToSend);

    if (response.status === 1) {
      if (response.otp) {
        ToastAndroid.show(response.otp + '', ToastAndroid.LONG);
      }

      navigation.navigate('Otp', {
        phone: phone,
        userType: userTypeToSend,
        referCode: referralCode,
      });
    } else {
      setErrorMessage('*' + response.Backend_Error);
    }
  } catch (error) {
    console.log('Error while Sending OTP: ', error.message);
    setErrorMessage('*Something went wrong');
  } finally {
    setLoading(false);
  }
}



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.bbView}>
              <Image
                source={require('../../assets/img/bbcolorlogo.png')}
                resizeMode="contain"
                style={{width: 250}}
              />
            </View>

            <View style={styles.container}>
              {/* Header */}
              <View style={[styles.LetsView, {marginTop: 20}]}>
                <View style={styles.LetsView2}>
                  <View>
                    <Text style={styles.textLets}> Let’s Crack Exams,</Text>
                    <View style={styles.togetherview}>
                      <Text style={styles.texttogether}> Together👋 </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../../assets/img/arrowtoright.png')}
                    resizeMode="contain"
                    style={styles.rightarraow}
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View
                style={{width: '100%', paddingHorizontal: 1, marginTop: 15}}>
                <Text style={styles.textEnter}> Enter Your Mobile Number </Text>
                <View
                  style={[
                    styles.inputView,
                    errorMessage && !numberDone && {borderColor: 'red'},
                  ]}>
                  <View style={styles.inputview91}>
                    <Text style={styles.text91}>+ 91</Text>
                  </View>
                  <View style={styles.inputView1}>
                    <TextInput
                      onChangeText={value => {
                        setErrorMessage(null);
                        setPhone(value);
                      }}
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

              {errorMessage && !numberDone && (
                <Text key={errorMessage} style={styles.errormsg}>
                  {errorMessage}
                </Text>
              )}

             
                <View style={{marginTop: 15, width: '100%'}}>
                  <Text style={styles.textEnter}> Select User Type </Text>
                  <SelectList
                    setSelected={val => {
                      setErrorMessage(null);
                      setSelected(val);
                    }}
                    data={data}
                    search={false}
                    save="value"
                    boxStyles={{
                      backgroundColor: '#9856EB',
                      borderColor: '#ffffff80',
                      paddingVertical: 15,
                      marginTop: 6,
                    }}
                    dropdownStyles={{backgroundColor: '#9856EB'}}
                    placeholder="Select user type"
                    inputStyles={{color: '#fff'}}
                    arrowicon={
                      <Image
                        source={require('../../assets/img/down-arrow.png')}
                        style={{width: 20, height: 20}}
                        tintColor={'#fff'}
                      />
                    }
                  />
                </View>
              {/* Terms and Conditions */}
              <View style={styles.checboxview}>
                <View style={styles.checboxview2}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setErrorMessage(null);
                        setChecked(!checked);
                      }}>
                      <View style={styles.checkboimg}>
                        <Image
                          source={
                            !checked
                              ? require('../../assets/img/square.png')
                              : require('../../assets/img/check-box-with-check-sign.png')
                          }
                          tintColor={
                            errorMessage && numberDone ? 'red' : '#fff'
                          }
                          style={styles.checkboxImage}
                        />
                      </View>
                    </TouchableOpacity>

                    <Text style={styles.textHereby}>
                      {' '}
                      I hereby confirm my age is 18 Years or above & agree to
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            'https://brainbucks.in/terms/condition',
                          )
                        }>
                        <Text style={styles.textTerm}>
                          {' '}
                          terms & conditions{' '}
                        </Text>
                      </TouchableOpacity>
                      <View style={{marginTop: -6}}>
                        <Text
                          style={{color: ColorsConstant.White, fontSize: 10}}>
                          and
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            'https://brainbucks.in/privacy/policy',
                          )
                        }>
                        <Text style={styles.textTerm}>Privacy policy</Text>
                      </TouchableOpacity>
                      <View style={{marginTop: -6}}>
                        <Text style={styles.textBrain}> Of Brain Bucks.</Text>
                      </View>
                    </Text>
                  </View>
                </View>
                {errorMessage && numberDone && (
                  <Text key={errorMessage} style={styles.errormsg}>
                    {errorMessage}
                  </Text>
                )}
              </View>

              {/* Button */}
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
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Bottom Image */}
      <View
        style={[
          styles.imgView,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        ]}>
        <View style={styles.imgView2}>
          <Image
            source={require('../../assets/img/Girl.png')}
            resizeMode="contain"
            style={styles.girlimg}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
