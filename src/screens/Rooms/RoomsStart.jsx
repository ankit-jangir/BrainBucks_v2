import React, { useState, useEffect, useRef } from 'react';
import RoomsReward from './RoomsReward.js';
import RoomsRules from './RoomsRules.js';
import RoomsParticipants from './RoomsParticipants.js.jsx';
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
import { Text } from '../../utils/Translate.js';
import styles from '../../styles/StartExam.styles.js';
import { useQuiz } from '../../context/QuizPlayReducer.js';
import { getactiveDetails, joinactiveQuiz } from '../../controllers/ActiveQuizController.js';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls.js';
import { LinearProgress } from '@rneui/themed';
import basic from '../../services/BasicServices.js';
import { StackActions } from '@react-navigation/native';
import { joinQuizInController } from '../../controllers/RoomsController.js';
import RoomsApiService from '../../services/api/RoomsApiService.js';
import { useQuery } from '@apollo/client';

const Tab = createMaterialTopTabNavigator();

export default function RoomsStart({ navigation, route }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [load, setLoad] = useState(false)
  const { quizState, dispatch } = useQuiz()

  let quiz_obj = route.params.quiz_obj

  const [refresh, setRefresh] = useState(false);
  const [response, setResponse] = useState({
    participants:[],
    rewards:[]
  })

  let roomServ = new RoomsApiService();

  const { error, data, loading, refetch } = useQuery(roomServ.GETQUIZDETAILS, {
    variables: {
      room_id: quiz_obj._id
    }
  })

  // console.log(response.participants, response.rewards, error, "sakalakaboomboom");

  useEffect(() => {
    if (!data || !data.view_detail_of_roomquiz) {
      return;
    }

    const details = data.view_detail_of_roomquiz;

    if (details.error) {
       ToastAndroid.show(details.error, ToastAndroid.SHORT);
      return;
    }

    let res = details.response;
    if (res) {
      setResponse(res)
    }

  }, [data])

  //   let id = route.params.id
  let timeoutId = useRef()
  const [remainingTime, setRemainingTime] = useState(1000)

  useEffect(() => {
    try {
      let time;
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      if (quiz_obj.sch_time) {
        time = basic.getDateFromSchTime(quiz_obj?.sch_time) - Date.now()
        setRemainingTime(time)
      }
      if (time > 0) {
        timeoutId.current = setTimeout(() => {
          setRemainingTime(basic.getDateFromSchTime(quiz_obj?.sch_time) - Date.now())
        }, time + 200)
      }
    }
    catch (err) {
      console.log("ERROR IN DATE CONVERSION: ", err);
    }
  }, [quiz_obj])


  async function joinQuiz() {
    let res = await joinQuizInController(quiz_obj._id, Toast, setLoad)
    if (res) {
      dispatch({ type: "change", state: { time: res.timeperiod, total: res.total_question, id: quiz_obj._id } })
      navigation.dispatch(
        StackActions.replace("Roomanmations")
      )
    }
  }

  function next() {
    joinQuiz()
  }

  return (
    <>
      <View style={{ zIndex: 20 }}><Toast /></View>
      {
        load
          ?
          <ActivityIndicator size={40} style={{ flex: 1 }} />
          :
          <View key={JSON.stringify(quiz_obj)} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: 150 }}>
              <ImageBackground
                source={{ uri: BLOBURL + quiz_obj?.category_image }}
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
                    source={{ uri: BLOBURL + quiz_obj?.category_image }}
                    resizeMode="contain"
                    style={styles.categoryImage}
                  />
                </View>
                <View style={styles.categoryView}>
                  <Text
                    style={[styles.categoryText, { marginTop: 10, color: '#8A8A8A' }]}>
                    {quiz_obj?.category_name}
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
                        <Text style={styles.EnteryFeesBText}>{quiz_obj?.entryFees}</Text>
                      </View>
                    </View>
                    <View style={styles.EnteryV3}>
                      <Text style={[styles.EnteryFeesText]}>Reward</Text>
                      <View style={styles.EnteryV2}>
                        <Image
                          source={require('../../assets/img/bbcoin.png')}
                          style={styles.EnteryImg}
                        />
                        <Text style={styles.EnteryFeesBText}>{quiz_obj.prize}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.DateV}>
                    <View style={styles.DateV1}>
                      <Image
                        source={require('../../assets/img/time2.png')}
                        tintColor={'#8A8A8A'}
                        style={styles.EnteryImg}
                      />
                      <Text style={styles.DateText}>{quiz_obj?.sch_time?.substr(0, 10)}</Text>
                    </View>
                    <View style={styles.DateV1}>
                      <Image
                        source={require('../../assets/img/calendar.png')}
                        tintColor={'#8A8A8A'}
                        style={styles.EnteryImg}
                      />
                      <Text style={styles.DateText}>{quiz_obj?.sch_time?.substr(11, 8)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.TotalSlotsVi, { marginTop: 20 }]}>
                <Image
                  source={require('../../assets/img/dollar.png')}
                  resizeMode="contain"
                  style={styles.DateImg}
                />
                <View style={styles.TotalSlotsVi1}>
                  <Text style={styles.TotalSlotsBtext}>{quiz_obj?.slot_aloted}/</Text>
                  <Text style={[styles.TotalSlotsBtext, { color: '#333333' }]}>
                    {quiz_obj?.slots}
                  </Text>
                </View>
              </View>
              <View style={styles.TotalSlotsVi2}>
                <View style={styles.TotalSlotsVi3}>
                  <LinearProgress
                    style={{ marginVertical: 10, height: 8, borderRadius: 10 }}
                    value={quiz_obj.slots ? quiz_obj.slot_aloted / quiz_obj.slots : 0}
                    variant="determinate"
                    color={'#54ACFD'}
                  />
                </View>
              </View>
              <View style={styles.StartExamV}>
                <TouchableOpacity onPress={() => { next() }} style={{ width: '80%' }}>
                  <LinearGradient
                    key={remainingTime > 0}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.6, y: 2.0 }}
                    colors={['#54ACFD', '#2289E7']}
                    style={styles.StartExamLiner}>
                    {
                      remainingTime > 0
                        ?
                        <Text key={'remaining'} style={styles.LobbtText}>{quiz_obj.sch_time}</Text>
                        :
                        <Text key={'joinnow'} style={styles.LobbtText}>Start</Text>
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
                key={JSON.stringify(response)}
                rulesList={quiz_obj.rules ? quiz_obj?.rules : []}
                response={response}
                refetch={refetch}
              />
            </View>
          </View>
      }
    </>
  );
}

const Roomsrules = ({ rulesList, response, refetch }) => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ flex: 1 }}
        screenListeners={{
          tabPress: ()=>{refetch()}
        }}
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
        <Tab.Screen name="Participants" >
          {props => (
            <RoomsParticipants {...props} participants={response.participants}></RoomsParticipants>
          )}
        </Tab.Screen>
        <Tab.Screen name="Reward">
          {props => <RoomsReward {...props} rewards={response.rewards} ></RoomsReward>}
        </Tab.Screen>
        <Tab.Screen name="Rules">
          {props => <RoomsRules {...props} rulesList={rulesList}></RoomsRules>}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
