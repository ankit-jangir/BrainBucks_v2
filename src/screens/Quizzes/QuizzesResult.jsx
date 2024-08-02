import React, { useState, useEffect, useRef } from 'react';
import WinnerBoardLive from './WinnerBoardLive';
import { View, TouchableOpacity, Image, FlatList, StatusBar, Animated, Easing, BackHandler, ActivityIndicator, ToastAndroid, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import Toast from 'react-native-toast-message';
import { useQuiz } from '../../context/QuizPlayReducer';
import { BLOBURL } from '../../config/urls';
import BasicServices from '../../services/BasicServices';
import { useNavigation } from '@react-navigation/native';

export default function QuizzesResult({ route }) {
  const [isLoad, setLoad] = useState(false)
  const [isLoad2, setLoad2] = useState(true)
  const [mydata, setMydata] = useState([])
  const [topRank, setTopRank] = useState({ totMarks: 0 })
  const [score, setScore] = useState([])

  const navigation = useNavigation()

  const { quizState, dispatch } = useQuiz()
  const quiz_id = quizState.id ? quizState.id : route?.params?.id

  const snapPoints = useMemo(() => ['10%', '20%', '70%'], []);

  const serv = new ActiveQuizApiService()

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)

  console.log("On result page")

  useEffect(() => {
    // console.log(route);
    if (route && route.params && route.params.id) {
      try {
        dispatch({ type: 'change', state: { id: route.params.id } })
      }
      catch (e) {
        console.log("error>>>", e);
      }
    }
    getLeaderBoard();
  }, []);

  function getDataHelper(page) {
    return async () => {
      let res = await serv.getActiveQuizLeaderBoard(quiz_id, page);
      return res;
    }
  }

  async function getLeaderBoard(page) {
    if (!page) {
      page = 1
    }
    if (page <= totalPages) {
      setCurrentPage(page)
      let func = setLoadingMore
      if (page === 1) {
        func = setLoading
      }
      let res = await BasicServices.apiTryCatch(getDataHelper(page), Toast, () => { func(true) }, () => { func(false) })
      if (res) {
        setTotalPages(res.totalPages)
        if (page === 1)
          setScore(res.winners)
        else
          setScore([...score, ...res.winners])
      }
    }
  }


  async function getActiveQuizResult() {
    try {
      setLoad(true);
      let res = await serv.getActiveQuizResult(quiz_id);
      if (res.status === 1) {
        setMydata(res.topRank)
        setTopRank(res)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
        // setMydata(res?.topRank)
        // setTopRank(res)
        // setScore(res?.scoreboard)
      }
    } catch (err) {
      console.log('Error while getting Quizz Result data', err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong',
      // });
    } finally {
      setLoad(false);
    }
  }


  useEffect(() => {
    getActiveQuizResult()
  }, [])



  const translationY = useRef(
    new Animated.Value(0)
  ).current;
  const translationY1 = useRef(
    new Animated.Value(0)
  ).current;
  const translationY2 = useRef(
    new Animated.Value(0)
  ).current;
  const translationY3 = useRef(
    new Animated.Value(0)
  ).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(translationY3, {
        toValue: -420,
        duration: 3000,
        useNativeDriver: true,
      }),

      Animated.timing(translationY2, {
        toValue: -420,
        duration: 2000,
        useNativeDriver: true,
      }),

      Animated.timing(translationY1, {
        toValue: -420,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translationY, {
        toValue: -420,
        duration: 1500,
        useNativeDriver: true,
      })


    ]).start()
  })

  const sheetRef = React.useRef(null);

  return (
    <>
      <View style={{ zIndex: 20 }}><Toast /></View>
      {
        isLoad ?
          <>
            <ActivityIndicator color={ColorsConstant.Theme} size={40} style={{ marginTop: '80%' }} />
          </>
          :
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle={'white-content'} translucent={false} backgroundColor={ColorsConstant.Theme} />
            <View style={styles.HeaderView}>
              <View style={styles.HeaderView1}>
                <View style={{ flex: 0.40, }}>
                  <View style={styles.HeaderView2}>
                    <TouchableOpacity onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack()
                      }
                      else {
                        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
                      }
                    }} style={styles.HeaderTouchable}>
                      <Image source={require('../../assets/img/arrows.png')} resizeMode='center' tintColor={'#fff'} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={{ flex: 0.80 }}>
                  <Text style={styles.HeaderText} >My Result</Text>
                </View>
              </View>
              <View style={[styles.MyDataView]}>
                <View style={styles.MyDataView1}>
                  <View style={styles.MyDataView2} >
                    <Text style={styles.MyDataText}>Rank</Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.MyDataTextB} >{topRank.obtainRank || 0}/ </Text>
                      <Text style={styles.MyDataTextBb} >{topRank.totalRanks || 0}</Text>
                    </View>
                  </View>
                  <View style={styles.MyDataView3} >
                    <Text style={styles.MyDataText}>Score</Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.MyDataTextB} >{topRank.obtainMarks || 0} / </Text>
                      <Text style={styles.MyDataTextBb} >{topRank.totMarks || 0}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.MyDataText}>Time Taken</Text>
                  <View style={{ flexDirection: "row", }}>
                    {
                      topRank.submit_time_period
                      &&
                      <>
                        <Text style={styles.MyDataTextB} >{Math.floor(topRank.submit_time_period / 60) > 9 ? Math.floor(topRank.submit_time_period / 60) : "0" + Math.floor(topRank.submit_time_period / 60)}:</Text>
                        <Text style={styles.MyDataTextBb} >{Math.floor(topRank.submit_time_period % 60) > 9 ? Math.floor(topRank.submit_time_period % 60) : "0" + Math.floor(topRank.submit_time_period % 60)}</Text>
                      </>
                      ||
                      <Text style={styles.MyDataTextB}>00:00</Text>
                    }
                  </View>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate("ScoreCard") }} style={styles.Touchable} >
                  <Text style={styles.Scorecard} >View Scorecard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("QuizzesResultRewards") }} style={styles.TouchableReward} >
                  <Image source={require('../../assets/img/giftbox.png')} style={{ width: 30, height: 30, }} />
                  <Text style={styles.Scorecard} >View Rewards</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, backgroundColor: "transparent", marginTop: 10 }} >

              </View>
            </View>

            <View style={styles.RewardView}>
              <View style={styles.RewardView1} >

                <Animated.View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", height: 200, transform: [{ translateY: translationY }] }} >
                  {mydata[1] ? <View style={styles.MainView} >
                    <View style={styles.modelViewData} >
                      {
                        mydata[1]?.image
                          ?
                          <Image source={{ uri: BLOBURL + mydata[1]?.image }} style={styles.modelImg} />
                          :
                          <Image source={require('../../assets/img/nosay.png')} style={styles.modelImg} />
                      }
                    </View>
                    <View style={{ width: '100%' }} >
                      <Text numberOfLines={1} style={styles.DatatextN} >{mydata[1]?.stu_name ? mydata[1]?.stu_name : "Not Joined"}</Text>
                    </View>
                    <View style={styles.modelV} >
                      <Text style={styles.DataText}></Text>
                      {
                        mydata[1]?.marks
                          ?
                          <Text style={styles.DataText}>{mydata[1]?.marks + "/" + topRank?.totMarks}</Text>
                          :
                          <Text style={styles.DataText}>{0 + "/" + topRank?.totMarks}</Text>
                      }
                    </View>
                  </View> : <View style={{ flex: 1 }}></View>}
                  {mydata[0] ? <View style={styles.ManiDataV1} >
                    <View style={styles.modelViewData} >
                      {
                        mydata[0]?.image
                          ?
                          <Image source={{ uri: BLOBURL + mydata[0]?.image }} style={styles.modelImg} />
                          :
                          <Image source={require('../../assets/img/nosay.png')} style={styles.modelImg} />
                      }
                    </View>
                    <View style={{ width: '100%' }} >
                      <Text numberOfLines={1} style={styles.DatatextN} >{mydata[0]?.stu_name ? mydata[0]?.stu_name : "Not Joined"}</Text>
                    </View>
                    <View style={styles.modelV} >
                      {
                        mydata[0]?.marks
                          ?
                          <Text style={styles.DataText}>{mydata[0]?.marks + "/" + topRank?.totMarks}</Text>
                          :
                          <Text style={styles.DataText}>{0 + "/" + topRank?.totMarks}</Text>
                      }
                    </View>
                  </View> : <View style={{ flex: 1 }}></View>}
                  {mydata[2] ? <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }} >
                    <View style={styles.modelViewData} >
                      {
                        mydata[2]?.image
                          ?
                          <Image source={{ uri: BLOBURL + mydata[2]?.image }} style={styles.modelImg} />
                          :
                          <Image source={require('../../assets/img/nosay.png')} style={styles.modelImg} />
                      }
                    </View>
                    <View style={{ width: '100%' }} >
                      <Text numberOfLines={1} style={styles.DatatextN} >{mydata[2]?.stu_name ? mydata[2]?.stu_name : "Not Joined"}</Text>
                    </View>
                    <View style={styles.modelV} >
                      {
                        mydata[2]?.marks
                          ?
                          <Text style={styles.DataText}>{mydata[2]?.marks + "/" + topRank?.totMarks}</Text>
                          :
                          <Text style={styles.DataText}>{0 + "/" + topRank?.totMarks}</Text>
                      }
                    </View>
                  </View> : <View style={{ flex: 1 }}></View>}
                </Animated.View>

                <View style={styles.MainDataV} >
                  <View style={styles.ManiDataV1} >
                    {mydata[1] && <Animated.View style={{ width: '100%', transform: [{ translateY: translationY2 }] }}>
                      <Image source={require('../../assets/img/rank2img.png')} resizeMode='center' style={styles.MainImg} />
                    </Animated.View>
                    }
                  </View>
                  <View style={styles.ManiDataV1} >
                    {mydata[0] && <Animated.View style={{ width: '100%', alignItems: "center", transform: [{ translateY: translationY1 }] }}>
                      <Image source={require('../../assets/img/rank1img.png')} resizeMode='center' style={styles.MainImg1} />
                    </Animated.View>
                    }
                  </View>
                  <View style={styles.ManiDataV1} >
                    {mydata[2] && <Animated.View style={{ width: '100%', transform: [{ translateY: translationY3 }] }}>
                      <Image source={require('../../assets/img/rank3img.png')} resizeMode='center' style={styles.MainImg2} />
                    </Animated.View>
                    }
                  </View>
                </View>
              </View>
            </View>
            <>
              <BottomSheet index={0} snapPoints={snapPoints}>
                <Text style={styles.containerHeadline}>Winner’s Leaderboard 🎉</Text>
                {
                  loading
                    ?
                    <ActivityIndicator size={25} color={ColorsConstant.Theme} />
                    :
                    <BottomSheetFlatList
                      style={{ maxHeight: 520 }}
                      scrollEnabled
                      onEndReachedThreshold={0.8}
                      onEndReached={() => { getLeaderBoard(currentPage + 1) }}
                      data={score}
                      renderItem={({ item, index }) => (
                        <View style={styles.contentContainer}>
                          <View style={styles.Container}>
                            <TouchableOpacity style={styles.touch}>
                              <Text style={styles.TextIn}>{index + 1}</Text>
                              <View style={styles.imgView}>
                                <Image
                                  source={item.image ? { uri: BLOBURL + item.image } : require("../../assets/img/nosay.png")}
                                  resizeMode="contain"
                                  style={styles.img}
                                />
                              </View>

                              <View style={styles.TotView}>
                                <Text style={styles.TextTo}>{item.stu_name}</Text>
                                <View style={styles.tymView}>
                                  <Text style={styles.textTym}>
                                    Rank: {item.Rank}
                                  </Text>
                                  <Text style={[styles.textTym, { color: '#367CFF' }]}>
                                    {item.marks} /{topRank.totMarks}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                      keyExtractor={item => item._id}
                    />
                }
                {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}

              </BottomSheet>
            </>
          </GestureHandlerRootView>
      }
    </>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 80,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  touch: {
    flex: 1,
    backgroundColor: ColorsConstant.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: ColorsConstant.LightGray,
    borderRadius: 10,
  },
  TextIn: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 22,
    color: '#000',
    paddingHorizontal: 4,
  },
  imgView: {
    width: 60,
    height: 60,
    borderRadius: 120,
    // flex: 0.18,
    backgroundColor: '#f5f3f2',
    marginHorizontal: 20
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 120,
  },
  TotView: {
    width: 65,
    height: 65,
    // flex: 0.65,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  TextTo: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 20,
    color: '#000'
  },
  tymView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textTym: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    color: ColorsConstant.GreenColor,
  },
  // container: {
  // 	flex: 1,
  // 	alignItems: 'center',
  // 	justifyContent: 'center'
  // },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 10,
    color: '#000',
    textAlign: 'center'
  },
  WinnerBoardLiveView:
  {
    backgroundColor: '#fff',
    padding: 16,
    height: 850,
  },
  WinnerBoardLiveView2:
  {
    height: 4,
    width: '20%',
    backgroundColor: ColorsConstant.LightGray,
    alignSelf: 'center'
  },
  WinnerBoardLiveText:
  {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 20,
    color: ColorsConstant.Black
  },
  HeaderView:
  {
    flex: 1,
    backgroundColor: ColorsConstant.Theme,
    paddingHorizontal: 10,
  },
  HeaderView1:
  {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: "center"
  },
  HeaderView2:
  {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor: '#ffffff10',
  },
  HeaderTouchable:
  {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  HeaderText:
  {
    color: '#fff',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 24,
  },
  MyDataView:
  {
    width: '100%',
    borderRadius: 8,
    borderColor: '#fff',
    backgroundColor: ColorsConstant.LightPink,
    paddingTop: 20,
    borderWidth: 1,
  },
  MyDataView1:
  {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  MyDataView2:
  {
    flex: 0.60,
    justifyContent: "center"
  },
  MyDataText:
  {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold'
  },
  MyDataTextB:
  {
    color: '#FAFF10',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 30
  },
  MyDataTextBb:
  {
    color: '#fff',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 30
  },
  MyDataView3:
  {
    flex: 0.40,
    justifyContent: "center"
  },
  MySubmitView:
  {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  },
  TimeText:
  {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
    flex: 0.20
  },
  TimeView:
  {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    flex: 0.80
  },
  TimeTextB:
  {
    color: '#FAFF10',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20
  },
  Touchable:
  {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: "center",
    zIndex: 200
  },
  Scorecard:
  {
    color: '#2E2E2E',
    fontFamily: 'WorkSans-Medium',
    fontSize: 16
  },
  TouchableReward:
  {
    width: '100%',
    height: 50,
    backgroundColor: ColorsConstant.TermColor,
    justifyContent: 'center',
    alignItems: "center",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    flexDirection: "row"
  },
  RewardView:
  {
    padding: 0,
    position: "absolute",
    bottom: 0,
    height: 0,
    width: "100%",
    paddingHorizontal: 10
  },
  RewardView1:
  {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 30,
  },
  ModelView:
  {
    flex: 1,
    alignItems: "center",
  },
  modelViewData:
  {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  modelImg:
  {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  modelText:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: '#fff',
  },

  modelV:
  {
    width: '90%',
    height: 40,
    flexDirection: "row",
    backgroundColor: "#ffffff20",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  DataText:
  {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: '#fff'
  },
  DatatextN:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: '#fff',
  },
  MainView:
  {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
    justifyContent: "flex-end"
  },
  MainDataV:
  {
    flexDirection: "row"
    , width: "100%",
    justifyContent: "space-between",
    height: 250,
    alignItems: "center"
  },
  ManiDataV1:
  {
    flex: 1,
    alignItems: "center",
  },
  MainImg:
  {
    width: 100,
    height: 250
  },
  MainImg1:
  {
    width: 100,
    height: 310
  },
  MainImg2:
  {
    width: 100,
    height: 230
  }
})