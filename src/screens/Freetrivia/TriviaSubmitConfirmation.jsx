import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, ScrollView, BackHandler, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';
import { getResultOfTriviaQuiz } from '../../controllers/TriviaQuizController';

export default function TriviaSubmitConfirmation({ navigation, route }) {


  const [timerCount, setTimer] = useState(3)
  const [minute, setMinute] = useState(0)
  var interval;
  useEffect(() => {
    interval = setInterval(() => {
      setTimer(lastTimerCount => {
        const newTimerCount = lastTimerCount - 1;
        if (newTimerCount <= 0) {
          clearInterval(interval);
        }
        return newTimerCount;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minute]);
  useEffect(() => {
    if (timerCount == 0) {
      navigation.navigate('TriviaResult');
      clearInterval(interval);
    }
  }, [timerCount])

  const goBack = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <View style={[StyleConstants.safeArView, { paddingHorizontal: 20 }]}>
      <ScrollView>
        <View style={styles.AnsView}>
          <Text style={styles.TextAns}>Answers Submitted Succesfully</Text>
        </View>
        <View style={styles.ViewLoti} >
          <LottieView
            autoPlay
            style={styles.ViewLoti1}
            source={require('../../assets/img/email.json')}
          />
        </View>
        <View style={styles.ViewRe} >
          <View style={{ width: '50%' }} >
            <Text style={styles.TextRe}>Results will be Declared in</Text>
          </View>
        </View>

        <View style={styles.MinView} >
          <View style={styles.MinView1} >
            <View style={{ flexDirection: 'row' }} >
              <View style={{ flex: 1, alignItems: 'flex-end' }} >
                <Text style={styles.BText}>{timerCount}</Text>
                <Text style={styles.TextMin}>Mins</Text>
              </View>
              <View style={styles.ColumnView} >
                <Text style={styles.TextColumn}>:</Text>
              </View>
              <View style={{ flex: 1, }} >
                <Text style={styles.BText}>{timerCount}</Text>
                <Text style={styles.TextSec}>Sec</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.lotiV}>
          <View style={styles.lotiV1}>
            <View style={styles.lotiV2}>
              <LottieView
                autoPlay
                style={styles.imgloti}
                source={require('../../assets/img/bell-notification.json')}
              />
            </View>
            <View style={styles.willView}>
              <Text style={styles.TextWe1}>We will notify you once results are declared </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
    TextWe1: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color:'#000'
      },
  AnsView: {
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 50
  },
  TextAns: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 24,
    color: "#2E2E2E",
    textAlign: "center"
  },
  ViewLoti: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  ViewLoti1: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
  ViewRe: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
  },
  TextRe: {
    color: ColorsConstant.GrayyColor,
    fontSize: 20,
    fontFamily: "WorkSans-SemiBold",
    textAlign: "center"
  },
  MinView: {
    width: '100%',
    height: 80,
    alignItems: "center",
    marginTop: 20
  },
  MinView1: {
    width: '70%',
    backgroundColor: "#EFF5FF",
    borderRadius: 5,
    flex: 1,
    alignItems: 'center'
  },
  BText: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 36,
    color: '#367CFF'
  },
  TextMin: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    color: '#367CFF'
  },
  ColumnView: {
    flex: 0.40,
    alignItems: "center"
  },
  TextColumn: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 36,
    color: '#367CFF',
    paddingBottom: 5
  },
  TextSec: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    color: '#367CFF',
  },
  lotiV: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: ColorsConstant.LightGray,
    borderRadius: 10,
    marginTop: 80,
  },
  lotiV1: {
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
  },
  lotiV2: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.20
  },
  imgloti: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  },
  willView: {
    flex: 0.80,
    width: "100%",
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center'
    ,
    TextWe1: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
    }
  }

})

