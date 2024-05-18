import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
  Dimensions,
  StatusBar,
  Linking,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import styles from '../../styles/SingUp.styles';
import {Checkbox} from 'react-native-paper';
import { Text, TextInput } from '../../utils/Translate';

export default function SingUp({navigation, route}) {
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("*Accept The Terms conditions first")

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <View style={styles.bbView}>
        <Image
          source={require('../../assets/img/bbcolorlogo.png')}
          resizeMode="contain"
          style={{width: 250}}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.LetsView}>
          <View style={styles.LetsView2}>
            <View style={{flex: 0.95}}>
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
            <View style={{flex: 0.3}}>
              <Image
                source={require('../../assets/img/rightarrow.png')}
                resizeMode="contain"
                style={styles.rightarraow}
              />
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.textEnter}> Enter Your Mobile Number </Text>
          <View style={[styles.inputView, errorMessage&&{"borderColor": "red"}]}>
            <View style={styles.inputview91}>
              <Text style={styles.text91}>+ 91</Text>
            </View>
            <View style={styles.inputView1}>
              <TextInput
                onChangeText={value => setPhone(value)}
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

        {errorMessage&&<Text style={styles.errormsg}>{errorMessage}</Text>}

        <View style={styles.checboxview}>
          <View style={styles.checboxview2}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setChecked(!checked)}>
                <View style={styles.checkboimg}>
                  <Image
                    source={
                      checked
                        ? require('../../assets/img/square.png')
                        : require('../../assets/img/check-box-with-check-sign.png')
                    }
                    tintColor={'#fff'}
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
                      'https://www.brainbucks.in/terms_and_conditions.html',
                    );
                  }}>
                  <Text style={styles.textTerm}> terms & conditions </Text>
                </TouchableOpacity>
                <View style={{marginTop: -6}}>
                  <Text style={{color: ColorsConstant.White, fontSize: 10}}>
                    and
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.brainbucks.in/privacy.html');
                  }}>
                  <Text style={styles.textTerm}>Privacy policy</Text>
                </TouchableOpacity>
                <View style={{marginTop: -6}}>
                  <Text style={styles.textBrain}> Of Brain Bucks.</Text>
                </View>
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Otp');
          }}
          style={styles.BtnOtp}>
          <Text style={styles.textOt}>Get OTP</Text>
        </TouchableOpacity>
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
