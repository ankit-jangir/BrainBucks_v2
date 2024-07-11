import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/AllLiveQuizzes.styles';
import LottieView from 'lottie-react-native';
import { getactiveDetails, registerActiveQuiz } from '../../controllers/ActiveQuizController';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { useQuiz } from '../../context/QuizPlayReducer';
import { StackActions } from '@react-navigation/native';
import { registerQuizInController } from '../../controllers/RoomsController';
import { useQuery } from '@apollo/client';
import RoomsApiService from '../../services/api/RoomsApiService';

export default function RoomsDetails({ navigation, route }) {

  // const [data, setData] = useState(route.params.quiz_obj)
  const { quizState, dispatch } = useQuiz()
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState({})

  let roomServ = new RoomsApiService()

  const {error, data, loading, refetch} = useQuery(roomServ.GETQUIZDETAILS, {
    variables:{
      room_id: route.params.quiz_obj._id
    }
  })

  useEffect(()=>{
    if(!data || !data.view_detail_of_roomquiz){
      return;
    }

    const details = data.view_detail_of_roomquiz;

    if(details.error){
      Toast.show({
        type:'error',
        text1:details.error
      })      
      return;
    }

    let res = details.response;
    if(res){
      setResponse(res)
    }

  },[data])

  async function register() {
    let res = await registerQuizInController(response._id, Toast)
    if (res) {
      setModalVisible()
    }
  }

  return (
    <>
      <View style={{ zIndex: 12 }}>
        <Toast />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../assets/img/arrows.png')}
                resizeMode="contain"
                style={styles.backButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Quiz Details</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {
            refresh
              ?
              <ActivityIndicator size={40} style={{ flex: 1 }} />
              :
              <View key={JSON.stringify(data)} style={{ flex: 1, margin: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(126, 126, 126, 1)',
                    fontWeight: '500',
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Name of Exam Category
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={{uri : BLOBURL+response?.category_image}}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <Text
                  key={response.category_name}
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontWeight: '600',
                      padding: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    {response?.category_name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(126, 126, 126, 1)',
                    fontWeight: '500',
                    marginTop: 20,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Timing
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: 5,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../../assets/img/calendar.png')}
                      tintColor={'rgba(138, 138, 138, 1)'}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text
                    key={response?.sch_time?.substr(0, 10)}
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: '600',
                        padding: 10,
                        fontFamily: 'WorkSans-SemiBold',
                      }}>
                      {response?.sch_time?.substr(0, 10)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Image
                      source={require('../../assets/img/time2.png')}
                      tintColor={'rgba(138, 138, 138, 1)'}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text
                     key={response?.sch_time?.substr(11,8)}
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: '600',
                        padding: 10,
                        fontFamily: 'WorkSans-SemiBold',
                      }}>
                      {response?.sch_time?.substr(11, 8)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(126, 126, 126, 1)',
                    fontWeight: '500',
                    marginTop: 10,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Entry Fees
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 2,
                  }}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text
                    key={response.entryFees}
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '600',
                      padding: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    {response?.entryFees}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(126, 126, 126, 1)',
                    fontWeight: '500',
                    marginTop: 10,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Reward
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 2,
                  }}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text
                    key={response.prize}
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '600',
                      padding: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    {response?.prize}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(126, 126, 126, 1)',
                    fontWeight: '500',
                    marginTop: 10,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Slots
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 2,
                  }}>
                  <Image
                    source={require('../../assets/img/paper.png')}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text
                    key={response.slot_aloted}
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '600',
                      padding: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    {response?.slot_aloted}/{response?.slots}
                  </Text>
                </View>
                {/* <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'rgba(46, 46, 46, 1)',
                      fontWeight: '500',
                      marginTop: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    <Text style={{color:'rgb(138,138,138)'}}>Number of Questions :</Text> {response?.total_num_of_quest}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'rgba(46, 46, 46, 1)',
                      fontWeight: '500',
                      marginTop: 10,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    <Text style={{color:'rgb(138,138,138)'}}>Time for Each Question :</Text> {response?.time_per_question} Sec.
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'rgba(46, 46, 46, 1)',
                      fontWeight: '500',
                      marginTop: 30,
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    <Text style={{color:'rgb(138,138,138)'}}>Subjects</Text>
                  </Text>

                  <View style={styles.ul}>
                    {response?.subjects?.map((item, index) => (
                      <View style={styles.li} key={index}>
                        <Text style={styles.liBullet}>• </Text>
                        <Text style={styles.liText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View> */}

                {/* <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'rgba(46, 46, 46, 1)',
                      fontWeight: '500',
                      fontFamily: 'WorkSans-SemiBold',
                    }}>
                    <Text style={{ color: 'rgb(138,138,138)' }}>Subjects:</Text>
                  </Text>

                  <View style={styles.ul}>
                    {response?.rules?.map((item, index) => (
                      <View style={styles.li} key={index}>
                        <Text style={styles.liText1}>{index + 1}{".  "}{item}</Text>
                      </View>
                    ))}
                    
                  </View>
                </View> */}
              </View>}
        </ScrollView>

        <View style={styles.AgreeV}>
          <TouchableOpacity
            onPress={() => {
              register()
              //   registerActiveQuiz(Toast, setRefresh, setModalVisible)
            }}
            style={{ width: '100%' }}>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.6, y: 2.0 }}
              colors={['#54ACFD', '#2289E7']}
              style={{
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'WorkSans-Medium',
                }}>
                Agree & Register
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.goBack()
        }}>
        <TouchableOpacity
          onPress={() => { setModalVisible(!modalVisible), navigation.goBack() }}
          style={styles.RulesTouchable2}>
          <View style={styles.RulesPV2}>
            <View style={styles.RulesPV3}>
              <Text style={styles.RulesText}>Congratulations!</Text>
              <LottieView
                autoPlay
                style={styles.RulesLott}
                source={require('../../assets/img/upvote.json')}
              />
              <Text style={styles.RegisteredT}>
                Successfully Registered for{' '}
              </Text>
              <View style={styles.RegisteredV}>
                <View style={styles.RegisteredV1}>
                  <Image
                    source={{ uri: BLOBURL + response?.image }}
                    resizeMode="contain"
                    style={styles.RegisteredImg}
                  />
                </View>
                <View style={styles.RulesName}>
                  <Text style={styles.NameText}>{response?.category_name}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('Roomstart')
                  navigation.dispatch(StackActions.replace('Roomstart', { quiz_obj: response })), setModalVisible(false);
                }}
                style={styles.continueTouchable}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>

              <Text style={{ color: ColorsConstant.RedLight, fontFamily: 'WorkSans-SemiBold', fontSize: 12 }}>
                We will notify you before Exam Starts
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
