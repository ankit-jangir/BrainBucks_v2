import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing, useNativeDriver, StatusBar, SafeAreaView, ToastAndroid, BackHandler, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/Login.style';

export default function Splash({ navigation }) {
    const [checked, setChecked] = useState(false);
    const [state, setstate] = useState({ checked: "en" });

  const GetReferCode = async () => {
    let ReferCode = await AsyncStorage.getItem("referCode");
    console.log("refer", ReferCode);
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


  const [sellangauage, setSellangauage] = useState(langauge);

  const translation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 5,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
    GetReferCode();
  }, []);

  return (
    <>
      <StatusBar barStyle='white-content' translucent={false} backgroundColor={ColorsConstant.Theme} />
      <SafeAreaView style={styles.safe}>
        <Animated.View style={styles.aniView}>
          <Image source={require('../../assets/img/bblogo.png')} resizeMode='center' style={styles.logo} />
        </Animated.View>
        <View style={{ marginTop: 40 }}>
          <View style={styles.aniView2}>
            <Animated.View style={{ transform: [{ translateX: translation }] }} >
              <Text style={styles.langu}>Select your Language</Text>
            </Animated.View>
            {
              sellangauage.map((item, index) => (
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
        onPress={()=>{navigation.navigate('SingUp')}}
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
      </SafeAreaView>
    </>
  );
}

const SelectLangauage = (props) => {
  return (
    <Animated.View style={{ marginTop: 20, transform: [{ translateY: props.translation }] }} >
      <TouchableOpacity onPress={() => { props.setstate({ checked: props.item.value }); console.log(props.state) }} style={styles.touchRadio}>
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

