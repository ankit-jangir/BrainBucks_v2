import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing, useNativeDriver, StatusBar, SafeAreaView, ToastAndroid, BackHandler, StyleSheet, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/Login.style';
import { getSavedLanguage, setSavedLanguage } from '../../utils/Translate';
import basic from '../../services/BasicServices';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';

export default function Splash({ navigation }) {
  const [state, setstate] = useState({ checked: "en" });
  const [checklang, setCheckLang] = useState({ i: 'a' })
  const auth = new AuthenticationApiService()

  useEffect(() => {
    async function getLang() {
      let langinasync = await AsyncStorage.getItem("language")
      if (langinasync) {
        let localobj = await basic.getLocalObject()
        if (localobj.jwt) {
          let res;
          try {
            res = await auth.getUserProfile();
            if (res.status === 1) {
              setCheckLang(res)
            } else {
              setCheckLang(null)
            }
          } catch (err) {
            console.log("ERROR IN GETTING PROFILE", err.message)
            setCheckLang(null)
          }
          if (res && res.status === 1) {
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
          } else {
            setCheckLang(null)
          }
        }
      } else {
        setCheckLang(null)
      }
    }
    try {
      getLang()
    } catch (er) { console.log("ERROR WHILE RETERIEVING LANGUAGE", er.message) }
  }, [])

  const GetReferCode = async () => {
    let ReferCode = await AsyncStorage.getItem("referCode");
    // console.log("refer", ReferCode);
  }

  function setLanguageAndProceed() {
    console.log("Setting language to ", state.checked);
    setSavedLanguage(state.checked).then(() => {
      navigation.navigate('signup')
    })
  }

  const langauge = [
    {
      bhasha: 'हिन्दी',
      value: 'hi'
    },
    {
      bhasha: 'English',
      value: 'en'
    },
  ]

  const translation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 5,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
    try { GetReferCode(); } catch (err) {
      console.log("ERROR IN GETTING REFER CODE");
    }
  }, []);

  return (
    <>
      <StatusBar barStyle='white-content' translucent={false} backgroundColor={ColorsConstant.Theme} />
      <SafeAreaView style={styles.safe}>
        <Animated.View style={styles.aniView}>
          <Image source={require('../../assets/img/bblogo.png')} resizeMode='center' style={styles.logo} />
        </Animated.View>
        {checklang ?
          <LottieView source={require('../../assets/img/loadbook.json')} autoPlay style={{ flex: 1, }} />
          :
          <>
            <View style={{ marginTop: 40 }}>
              <View style={styles.aniView2}>
                <Animated.View style={{ transform: [{ translateX: translation }] }} >
                  <Text style={styles.langu}>Select Your Language</Text>
                </Animated.View>
                {
                  langauge.map((item, index) => (
                    <SelectLangauage item={item} key={index} state={state} setstate={setstate} translation={translation} />
                  ))
                }
              </View>
            </View>
            <TouchableOpacity
              // onPress={async () => {
              //   await AsyncStorage.setItem('language', state.checked)
              //   navigation.navigate('Otp', { lan: state.checked })
              // }}
              onPress={setLanguageAndProceed}
              style={styles.touchPro}>
              <Text style={styles.textProceed} >Proceed</Text>
            </TouchableOpacity>
            <View style={styles.lottiV} >
              <LottieView
                autoPlay
                style={styles.lottiV2}
                source={require('../../assets/img/earth.json')}
              />
            </View>
          </>
        }
      </SafeAreaView>
    </>
  );
}

const SelectLangauage = (props) => {
  return (
    <Animated.View style={{ marginTop: 20, transform: [{ translateY: props.translation }] }} >
      <TouchableOpacity onPress={() => { props.setstate({ checked: props.item.value }); }} style={styles.touchRadio}>
        <View style={{}}>
          <RadioButton
            uncheckedColor={ColorsConstant.LightWhite}
            color={ColorsConstant.White}
            value={props.item.bhasha}
            label="Carto Base MAp"
            status={props.state.checked === props.item.value ? 'checked' : 'unchecked'}
            onPress={() => { props.setstate({ checked: props.item.value }); }}
          />
        </View>
        <View style={{}} >
          <Text style={styles.Textbha} >{props.item.bhasha}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

