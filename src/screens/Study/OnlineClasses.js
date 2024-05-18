import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';

export default function OnlineClasses({ navigation }) {
  return (
    <View style={StyleConstants.safeArView}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.lottieContainer}>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require('../../assets/img/creativeidea.json')}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.mainText}>
              Learn from Industry Expert Teachers, live from your home, for FREE!!
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Coming Soon</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: 250,
    backgroundColor: 'transparent',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: '80%',
  },
  mainText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#367CFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 24,
    color: ColorsConstant.White,
    textAlign: 'center',
  },
});
