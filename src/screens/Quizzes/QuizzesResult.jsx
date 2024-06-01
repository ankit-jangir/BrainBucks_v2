import React, { useState, useEffect, useRef } from 'react';
import WinnerBoardLive from './WinnerBoardLive';
import { View,  TouchableOpacity, Image, ScrollView, StatusBar, Animated, Easing, BackHandler, ActivityIndicator, ToastAndroid, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
// import BottomSheet from 'reanimated-bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function QuizzesResult({ navigation, }) {
  const [isLoad, setLoad] = useState(false)
  const [isLoad2, setLoad2] = useState(true)
  const [mydata, setMydata] = useState([])
  const [length, setLength] = useState()

  const modelData=[
    {
        name:"sonu",
        h:'2'
    },
    {
        name:"sonu",
        h:'2'
    },
    {
        name:"sonu",
        h:'2'
    }
  ]


  const translationY = useRef(
    new Animated.Value(0)
  ).current;
  useEffect(() => {
    Animated.timing(translationY, {
      toValue: -420,
      duration: 1500,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const translationY1 = useRef(
    new Animated.Value(0)
  ).current;
  useEffect(() => {
    Animated.timing(translationY1, {
      toValue: -420,
      duration: 2500,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const translationY2 = useRef(
    new Animated.Value(0)
  ).current;
  useEffect(() => {
    Animated.timing(translationY2, {
      toValue: -420,
      duration: 2000,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const translationY3 = useRef(
    new Animated.Value(0)
  ).current;
  useEffect(() => {
    Animated.timing(translationY3, {
      toValue: -420,
      duration: 3000,
      deasing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderContent = () => (
    <>
      <View style={styles.WinnerBoardLiveView}>
        <View style={styles.WinnerBoardLiveView2}></View>
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.WinnerBoardLiveText}>Winner’s Leaderboard</Text>
        </View>
        {
          isLoad ?
            <ActivityIndicator color={'#701DDB'} size={21} />
            :
            <WinnerBoardLive modelData={modelData} />
        }
      </View>
    </>
  );

  const sheetRef = React.useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setLoad2(false);
    }, 4000)
  }, [])

  return (
    <>
      {
        isLoad || isLoad2 ?
          <ActivityIndicator color={ColorsConstant.Theme} size={21} />
          : <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle={'white-content'} translucent={false} backgroundColor={ColorsConstant.Theme} />
            <View style={styles.HeaderView}>
              <View style={styles.HeaderView1}>
                <View style={{ flex: 0.40, }}>
                  <View style={styles.HeaderView2}>
                    <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} style={styles.HeaderTouchable}>
                    <Image source={require('../../assets/img/arrows.png')} resizeMode='center' tintColor={'#fff'} style={{width:25,height:25}} />
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={{ flex: 0.80, }}>
                  <Text style={styles.HeaderText} >My Result</Text>
                </View>
              </View>
              <View style={styles.MyDataView}>
                <View style={styles.MyDataView1}>
                  <View style={styles.MyDataView2} >
                    <Text style={styles.MyDataText}>Rank</Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.MyDataTextB} >5/ </Text>
                      <Text style={styles.MyDataTextBb} >3</Text>
                    </View>
                  </View>
                  <View style={styles.MyDataView3} >
                    <Text style={styles.MyDataText}>Score</Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.MyDataTextB} >0 / </Text>
                      <Text style={styles.MyDataTextBb} >4</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.MySubmitView} >
                  <Text style={styles.TimeText}>Time : </Text>
                  <View style={styles.TimeView}>
                    <Text style={styles.TimeTextB} >4 Seconds </Text>
                    {<Text style={styles.TimeTextB} >12 Sec</Text>}
                  </View>
                </View>
                <TouchableOpacity  style={styles.Touchable} >
                  <Text style={styles.Scorecard} >View Scorecard</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.TouchableReward} >
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
                  {
                    length == 1 ?
                      (<>
                        <View style={styles.MainView} >
                        </View>
                        <View style={styles.ModelView} >
                          <View style={styles.modelViewData} >
                            {/* <Image source={{ uri: modelData[0].image }} style={styles.modelImg} /> */}
                          </View>
                          <View style={{ width: '100%' }} >
                            <Text numberOfLines={1} style={styles.DatatextN} >{modelData[0].name}</Text>
                          </View>
                          <View style={styles.modelV} >
                            <Text style={styles.DataText}>2/</Text>
                            <Text style={styles.DataText}>2</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }} >
                        </View>
                      </>) :
                      length == 2 ?
                        (<>
                          <View style={styles.MainView} >
                            <View style={styles.modelViewData} >
                              {/* <Image source={{ uri: modelData[1].image }} style={styles.modelImg} /> */}
                            </View>
                            <View style={{ width: '100%' }} >
                              <Text numberOfLines={1} style={styles.DatatextN} >2</Text>
                            </View>
                            <View style={styles.modelV} >
                              <Text style={styles.DataText}>2/</Text>
                              <Text style={styles.DataText}>2</Text>
                            </View>
                          </View>
                          <View style={styles.ManiDataV1} >
                            <View style={styles.modelViewData} >
                              {/* <Image source={{ uri: modelData[0].image }} style={styles.modelImg} /> */}
                            </View>
                            <View style={{ width: '100%' }} >
                              <Text numberOfLines={1} style={styles.DatatextN} >2</Text>
                            </View>
                            <View style={styles.modelV} >
                              <Text style={styles.DataText}>2/</Text>
                              <Text style={styles.DataText}>2</Text>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }} >
                          </View>
                        </>) : <>
                          <View style={styles.MainView} >
                            <View style={styles.modelViewData} >
                              {/* <Image source={{ uri: modelData[1].image }} style={styles.modelImg} /> */}
                            </View>
                            <View style={{ width: '100%' }} >
                              <Text numberOfLines={1} style={styles.DatatextN} >2</Text>
                            </View>
                            <View style={styles.modelV} >
                              <Text style={styles.DataText}></Text>
                              <Text style={styles.DataText}>uestions</Text>
                            </View>
                          </View>
                          <View style={styles.ManiDataV1} >
                            <View style={styles.modelViewData} >
                              {/* <Image source={{ uri: modelData[0].image }} style={styles.modelImg} /> */}
                            </View>
                            <View style={{ width: '100%' }} >
                              <Text numberOfLines={1} style={styles.DatatextN} >2w</Text>
                            </View>
                            <View style={styles.modelV} >
                              <Text style={styles.DataText}>wq/</Text>
                              <Text style={styles.DataText}>we</Text>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }} >
                            <View style={styles.modelViewData} >
                              {/* <Image source={{ uri: modelData[2].image }} style={styles.modelImg} /> */}
                            </View>
                            <View style={{ width: '100%' }} >
                              <Text numberOfLines={1} style={styles.DatatextN} >dsd</Text>
                            </View>
                            <View style={styles.modelV} >
                              <Text style={styles.DataText}>fd/</Text>
                              <Text style={styles.DataText}>d</Text>
                            </View>
                          </View>
                        </>
                  }
                </Animated.View>
                <View style={styles.MainDataV} >
                  <View style={styles.ManiDataV1} >
                    <Animated.View style={{ width: '100%', transform: [{ translateY: translationY1 }] }}>
                      <Image source={require('../../assets/img/rank2img.png')} resizeMode='center' style={styles.MainImg} />
                    </Animated.View>
                  </View>
                  <View style={styles.ManiDataV1} >
                    <Animated.View style={{ width: '100%', alignItems: "center", transform: [{ translateY: translationY2 }] }}>
                      <Image source={require('../../assets/img/rank1img.png')} resizeMode='center' style={styles.MainImg1} />
                    </Animated.View>
                  </View>
                  <View style={styles.ManiDataV1} >
                    <Animated.View style={{ width: '100%', transform: [{ translateY: translationY3 }] }}>
                      <Image source={require('../../assets/img/rank3img.png')} resizeMode='center' style={styles.MainImg2} />
                    </Animated.View>
                  </View>
                </View>
              </View>
            </View>
            <>
              {/* <BottomSheet
                ref={sheetRef}
                snapPoints={[70, 400]}
                borderRadius={40}
                renderContent={renderContent}
                enabledInnerScrolling={true}
                enabledContentGestureInteraction={true}
              /> */}
            </>
          </GestureHandlerRootView>
      }
    </>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
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
    paddingHorizontal: 10
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
    height: 230,
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
    alignItems: "center"
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