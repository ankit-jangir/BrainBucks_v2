import React, { useState, useEffect, useRef } from 'react';
import Particpants from './Particpants';
import Rewards from './Rewards';
import Rules from './Rules';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  ImageBackground,
  Share,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from '../../utils/Translate';
import styles from '../../styles/StartExam.styles';
import { useQuiz } from '../../context/QuizPlayReducer';
import { getactiveDetails, joinactiveQuiz } from '../../controllers/ActiveQuizController';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { LinearProgress } from '@rneui/themed';
import basic from '../../services/BasicServices';
import { StackActions } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function StartExam({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const { quizState, dispatch } = useQuiz()
  const [data, setData] = useState([])
  let id = route.params.id
  let timeoutId = useRef()
  const [remainingTime, setRemainingTime] = useState(1000)

  useEffect(() => {
    getactiveDetails(id, Toast, setData, setLoading, dispatch)
  }, [])

  useEffect(() => {
    try {
      let time;
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      if(data.sch_time){
        time = basic.getDateFromSchTime(data?.sch_time)- Date.now()
        setRemainingTime(time)
    }
      if (time > 0) {
        timeoutId.current = setTimeout(() => {
          setRemainingTime(basic.getDateFromSchTime(data?.sch_time) - Date.now())
        }, time + 200)
      }
    }
    catch (err) {
      console.log("ERROR IN DATE CONVERSION: ", err);
    }
  }, [data])


  async function joinQuiz() {
    let res = await joinactiveQuiz(id, Toast, setLoading, dispatch)
    if (res) {
      navigation.dispatch(
        StackActions.replace("ActiveQuizzJoinAnimation")
      )
    }
  }

  function next() {
    if (remainingTime > 0) {
      Toast.show({
        type: "info",
        text1: `Wait till ${data?.sch_time}`
      })
      return;
    }

    joinQuiz()

  }

  return (
    <>
      <View style={{ zIndex: 20 }}><Toast /></View>
      {
        loading
          ?
          <ActivityIndicator size={40} style={{ flex: 1 }} />
          :
          <View key={JSON.stringify(data)} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: 150 }}>
              <ImageBackground
                source={{ uri: BLOBURL + data?.image }}
                style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                  style={styles.InsufficientTouchable1}>
                  <Image
                    source={require('../../assets/img/arrows.png')}
                    tintColor={'#fff'}
                    style={styles.EnteryImg}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.InsufficientV3}>
              <View style={styles.InsufficientV4}>
                <View style={styles.InsufficientV5}>
                  <Image
                    source={{ uri: BLOBURL + data?.image }}
                    resizeMode="contain"
                    style={styles.categoryImage}
                  />
                </View>
                <View style={styles.categoryView}>
                  <Text
                    style={[styles.categoryText, { marginTop: 10, color: '#8A8A8A' }]}>
                    {data?.quiz_name}
                  </Text>
                </View>
              </View>
              <View style={styles.EnteryV}>
                <View style={styles.EnteryV1}>
                  <View style={{ flex: 6 }}>
                    <View style={styles.EnteryFeesVi}>
                      <Text style={styles.EnteryFeesText}>Entry Fees</Text>
                      <View style={styles.EnteryV2}>
                        <Image
                          source={require('../../assets/img/bbcoin.png')}
                          style={styles.EnteryImg}
                        />
                        <Text style={styles.EnteryFeesBText}>{data?.entryFees}</Text>
                      </View>
                    </View>
                    {/* <View style={styles.EnteryV3}>
                      <Text style={[styles.EnteryFeesText]}>First Prize</Text>
                      <View style={styles.EnteryV2}>
                        <Image
                          source={require('../../assets/img/bbcoin.png')}
                          style={styles.EnteryImg}
                        />
                        <Text style={styles.EnteryFeesBText}>dothis</Text>
                      </View>
                    </View> */}
                  </View>
                  <View style={styles.DateV}>
                    <View style={styles.DateV1}>
                      <Image
                        source={require('../../assets/img/time2.png')}
                        tintColor={'#8A8A8A'}
                        style={styles.EnteryImg}
                      />
                      <Text style={styles.DateText}>{data?.sch_time?.substr(0, 10)}</Text>
                    </View>
                    <View style={styles.DateV1}>
                      <Image
                        source={require('../../assets/img/calendar.png')}
                        tintColor={'#8A8A8A'}
                        style={styles.EnteryImg}
                      />
                      <Text style={styles.DateText}>{data?.sch_time?.substr(11, 8)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.TotalSlotsVi}>
                <Image
                  source={require('../../assets/img/dollar.png')}
                  resizeMode="contain"
                  style={styles.DateImg}
                />
                <View style={styles.TotalSlotsVi1}>
                  <Text style={styles.TotalSlotsBtext}>{data?.slot_aloted}/</Text>
                  <Text style={[styles.TotalSlotsBtext, { color: '#333333' }]}>
                    {data?.slots}
                  </Text>
                </View>
              </View>
              <View style={styles.TotalSlotsVi2}>
                <View style={styles.TotalSlotsVi3}>
                  <LinearProgress
                    style={{ marginVertical: 10, height: 8, borderRadius: 10 }}
                    value={data.slots ? data.slot_aloted / data.slots : 0}
                    variant="determinate"
                    color={'#54ACFD'}
                  />
                </View>
              </View>
              <View style={styles.StartExamV}>
                <TouchableOpacity onPress={next} style={{ width: '80%' }}>
                  <LinearGradient
                    key={remainingTime > 0}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.6, y: 2.0 }}
                    colors={['#54ACFD', '#2289E7']}
                    style={styles.StartExamLiner}>
                    {
                      remainingTime > 0
                        ?
                        <Text key={'remaining'} style={styles.LobbtText}>{data?.sch_time}</Text>
                        :
                        <Text key={'joinnow'} style={styles.LobbtText}>Join Now</Text>
                    }
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '15%',
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#51C386',
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../assets/img/whatsapp.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Roomsrules
                rulesList={data.rules ? data?.rules : []}
              />
            </View>
          </View>
      }
    </>
  );
}

const Roomsrules = ({ rulesList }) => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ flex: 1 }}
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: { fontSize: 16, textTransform: 'none' },
          tabBarStyle: {
            width: '100%',
            elevation: 0,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#E2E2E2',
          },
          tabBarIndicatorStyle: { backgroundColor: '#000000' },
        }}>
        <Tab.Screen name="Participants">
          {props => (
            <Particpants {...props}></Particpants>
          )}
        </Tab.Screen>
        <Tab.Screen name="Rewards">
          {props => <Rewards {...props} ></Rewards>}
        </Tab.Screen>
        <Tab.Screen name="Rules">
          {props => <Rules {...props} rulesList={rulesList}></Rules>}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
