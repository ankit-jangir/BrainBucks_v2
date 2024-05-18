import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar, Animated, Easing, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/Login.style';
export default function SignupName({ navigation ,route}) {
  const [name, setName] = useState();
  
  return (
    <SafeAreaView style={StyleConstants.safeArView}>
      <StatusBar barStyle='white-content' translucent={false} backgroundColor={ColorsConstant.Theme} />
      <View style={styles.mainView}>
        <View style={styles.mainView1}>
          <View style={styles.mainView2}>
            <View style={styles.mainView3}>
              <Text style={styles.WelcomeText}>Welcome</Text>
              <Image source={require('../../assets/img/rightarrow.png')} resizeMode='contain' style={styles.ArrowPic} />
            </View>
            <View style={styles.mainView22}>
              <Text style={styles.WelcomeText}>Buddy</Text>
              <Image source={require('../../assets/img/hand.png')} resizeMode='contain' style={styles.HandPic} />
            </View>
            <View style={styles.LookView}>
              <Text style={styles.LooksText}>Looks like you are {"\n"}
                new to our Family</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end',marginTop:10}} >
          <LottieView
            autoPlay
            style={styles.lottiView}
            source={require('../../assets/img/leaf.json')}
          />
        </View>
        <Image source={require('../../assets/img/shadow.png')} resizeMode='contain' style={{ width: '100%', flex: 1 }} />
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={styles.letView} >
          <Text style={styles.TextEach}>Let’s know each other</Text>
        </View>
        <View style={{ width: '100%', height: 100, }}>
          <Text style={styles.TextMy}>My name is</Text>
          <View style={styles.inputView}>
            <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputView1}
              placeholder='Enter Your Name'
              placeholderTextColor={'#8A8C94'}
            />
          </View>
        </View>
        <View style={styles.TouchView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignupGender')} style={[StyleConstants.Btn, { backgroundColor: ColorsConstant.Theme }]}>
            <Text style={[StyleConstants.BtnText, { color: ColorsConstant.White }]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

