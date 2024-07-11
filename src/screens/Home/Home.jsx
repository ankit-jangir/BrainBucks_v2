import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import SearchBar from './SearchBar';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant';
import { Button, Text } from '../../utils/Translate';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../../styles/Home.styles';
import { styles as styles2 } from '../Courses/PaidCourses';
import basic from '../../services/BasicServices';
import QuizCard from '../../components/QuizCard';
import Toast from 'react-native-toast-message';
import { getHomeData } from '../../controllers/HomeController';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import CourseApiService from '../../services/api/CourseApiService';
import { Modal as PaperModal } from 'react-native-paper';

export default function Home({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const { width } = Dimensions.get('window');
  const CARD_MARGIN = 1; // Adjust this value as needed
  const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width
  const [loading, setLoading] = useState(true)
  const [buyModalVisible, setBuyModalVisible] = useState(false)
  const [homeData, setHomeData] = useState({})
  const [currentCourse, setCurrentCourse] = useState()

  const isFocused = useIsFocused()
  const couServ = new CourseApiService()


  useEffect(() => {

    loadData()
    basic.getBearerToken().then(res => {
      console.log("jwt token: " + res);
    });
  }, []);

  useEffect(() => {
    getHomeData(Toast, setRefresh, setHomeData)
  }, [isFocused])
  // console.log("HOME DATA: ", homeData);

  function loadData() {
    getHomeData(Toast, setLoading, setHomeData)
  }

  const onRefresh = () => {
    getHomeData(Toast, setRefresh, setHomeData)
  };

  async function buyCourse() {
    try {
      let res = await couServ.buyCourse(currentCourse._id);
      if (res.status === 1) {
        // setModalVisible(false);
        let courses = homeData.courses.filter((c)=>c._id!==currentCourse._id)
        setHomeData({...homeData, courses:courses})

        Toast.show({
          type: 'success',
          text1: 'Course bought successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in Buying paid courses on home: ', err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong',
      // });
    } finally {
      setBuyModalVisible(false)
    }
  }



  return (
    <>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      <SafeAreaView style={StyleConstants.safeArView}>

        <View>
          <SearchBar />
        </View>
        {
          loading ?
            <View style={{ flex: 1 }}>
              <LottieView autoPlay style={{ flex: 0.8, padding: 10 }} source={require("../../assets/img/homeloading.json")} />
              <Text style={{ flex: 0.2, fontSize: 20, color: ColorsConstant.Theme, textAlign: 'center' }}>Loading...</Text>
            </View>
            :
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
              <View style={{ marginBottom: 20 }}>
                <View style={styles.carouselContainer}>
                  <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={homeData.banners}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                      <View style={styles.carouselItem}>
                        <Image source={{ uri: BLOBURL + item }} style={styles.carouselImage} />
                      </View>
                    )}
                  />
                </View>

                {/* ********************************************courses**************************************** */}

                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Courses</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Courses')}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {
                    (homeData?.courses?.length === 0 || Object.keys(homeData).length === 0)
                      ?
                      <NoDataFound scale={0.7} message={"No Courses Found"} action={onRefresh} actionText={"Reload"} />
                      :
                      <FlatList
                        keyExtractor={item => item._id}
                        data={homeData?.courses}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={(current, index) => {
                          current = current.item
                          return (
                            <View style={[styles2.centeredView, { margin: 10 }]}>
                              <View style={[styles2.modalView, { elevation: 2 }]}>
                                <View style={{ height: 150, width: '100%', objfit: 'cover' }}>
                                  <Image
                                    source={{ uri: BLOBURL + current?.banner }}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="contain"
                                  />
                                </View>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: 21,
                                    fontFamily: 'work-Sans',
                                    fontWeight: '800',
                                    textAlign: 'center',
                                  }}>
                                  {current?.cou_name}
                                </Text>
                                <View
                                  style={[
                                    styles2.mainv,
                                    { alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 5 },
                                  ]}>
                                  <Text style={styles2.datatext}>
                                    Price:
                                    <Text
                                      style={[
                                        styles2.datatext1,
                                        { textDecorationLine: 'line-through', fontSize: 14 },
                                      ]}>
                                      {' '}
                                      ₹ {current?.amount}
                                    </Text>
                                  </Text>
                                  <Text
                                    style={[
                                      styles2.datatext1,
                                      {
                                        backgroundColor: '#F6E482',
                                        padding: 3,
                                        borderRadius: 5,
                                        fontSize: 12,
                                      },
                                    ]}>
                                    {' '}
                                    <Text style={[styles2.datatext, { fontSize: 12 }]}>
                                      Duration:
                                    </Text>{' '}
                                    {current?.Duration}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: 5,
                                    gap: 10,
                                  }}>
                                  <Text style={styles2.datatext1}>
                                    <Text style={styles2.datatext}>Price:</Text> ₹{' '}
                                    {current?.final_amount}
                                  </Text>
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      backgroundColor: 'green',
                                      padding: 4,
                                      borderRadius: 5,
                                      color: 'white',
                                      fontSize: 14,
                                    }}>
                                    {current?.discount}% : off
                                  </Text>
                                </View>
                                <View style={styles2.mainv}>
                                  <Text style={styles2.datatext1}>
                                    <Text style={styles2.datatext}>Videos Count:</Text>{' '}
                                    {current?.videos_count}
                                  </Text>

                                  <Text style={styles2.datatext1}>
                                    <Text style={styles2.datatext}>Attachment:</Text>{' '}
                                    {current?.attachment_count}
                                  </Text>
                                </View>
                                <View style={styles2.buttonV}>
                                  <TouchableOpacity
                                    onPress={() => { setCurrentCourse(current), setBuyModalVisible(true) }}
                                    style={[styles2.button, styles2.buttonClose, {}]}>
                                    <Text style={styles2.textStyle}>Buy Course</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={[
                                      styles2.button,
                                      styles2.buttonClose,
                                      {
                                        paddingHorizontal: 38,
                                      },
                                    ]}
                                    onPress={() => { setBuyModalVisible(false), navigation.navigate("Courses") }}>
                                    <Text style={styles2.textStyle}>View Courses</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          )
                        }}
                      />
                  }
                </View>

                {/* **********************************livequizes******************************* */}
                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Live Quizzes</Text>
                      <View style={styles.lotiView}>
                        <LottieView
                          autoPlay
                          style={styles.ViewLoti}
                          source={require('../../assets/img/live-pulse.json')}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'active' })}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {
                    (homeData?.activequizes?.length === 0 || Object.keys(homeData).length === 0)
                      ?
                      <NoDataFound scale={0.7} message={"No Active Quizes Currently"} action={onRefresh} actionText={"Reload"} />
                      :
                      <FlatList
                        data={homeData.activequizes}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              width: CARD_WIDTH,
                              margin: CARD_MARGIN,
                            }}>
                            <QuizCard
                              prize={item.prize}
                              fees={item.entryFees}
                              title={item.quiz_name}
                              date={item.sch_time}
                              image={{ uri: BLOBURL + item.banner }}
                              alotedslots={item.slot_aloted}
                              totalslots={item.slots}
                              type={'active'}
                              onPress={() => {
                                navigation.navigate('RulesofParticipation', { id: item._id });
                              }}
                            />
                          </View>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={width}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
                      />
                  }
                </View>

                {/* ******************************freeTrivia****************************** */}
                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Free Trivia</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'trivia' })}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {
                    (homeData?.triviaquizes?.length === 0 || Object.keys(homeData).length === 0)
                      ?
                      <NoDataFound scale={0.7} message={"No Trivia Quizes Currently"} action={onRefresh} actionText={"Reload"} />
                      :
                      <FlatList
                        data={homeData.triviaquizes}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              width: CARD_WIDTH,
                              margin: CARD_MARGIN,
                            }}>
                            <QuizCard
                              prize={item.reward}
                              fees={item.entryFees}
                              title={item.quiz_name}
                              image={{ uri: BLOBURL + item.banner }}
                              alotedslots={item.slot_aloted}
                              totalslots={item.slots}
                              type={'trivia'}
                              date={item.sch_time}
                              minper={item.min_reward_per}
                              onPress={() => {
                                navigation.navigate('FreeRulesParticipation', { id: item._id })
                              }}
                            />
                          </View>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={width}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
                      />
                  }
                </View>
                {/* **********************************exam******************************* */}

                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Exams</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('myexams', { exams: homeData?.exams })}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {
                  (homeData?.exams?.length === 0 || Object.keys(homeData).length === 0)
                    ?
                    <NoDataFound scale={0.7} message={"No Exam found"} action={onRefresh} actionText={"Reload"} />
                    :
                    <FlatList
                      data={homeData.exams}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.ExamView}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('MyExamQuizzes', { id: item.id, imgurl: item.image, title: item.category_name })}
                            style={styles.TouchExam}>
                            <View style={styles.ActiveView}>
                              <Image source={{ uri: BLOBURL + item.image }} style={{ width: 40, height: 40, borderRadius: 100 }} />
                            </View>
                            <View style={styles.ActiveView}>
                              <Text style={styles.TextActive}>{item.category_name}</Text>
                            </View>
                            <View style={styles.ActiveView}>
                              <Text style={[styles.TextActive, { color: 'blue' }]}>Go to exam</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      // snapToInterval={width}
                      snapToAlignment="center"
                      decelerationRate="fast"
                    />
                }
                {/* **********************************Enrolledquizes******************************* */}
                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Enrolled Quizzes</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'enrolled' })}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {
                    (homeData?.enrolledquizes?.length === 0 || Object.keys(homeData).length === 0)
                      ?
                      <NoDataFound scale={0.7} message={"Not Enrolled in any quiz yet"} action={onRefresh} actionText={"Reload"} />
                      :
                      <FlatList
                        data={homeData.enrolledquizes}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              width: CARD_WIDTH,
                              margin: CARD_MARGIN,
                            }}>
                            <QuizCard
                              prize={item.reward}
                              fees={item.entryFees}
                              title={item.quiz_name}
                              date={item.sch_time}
                              image={{ uri: BLOBURL + item.banner }}
                              alotedslots={item.slot_aloted}
                              totalslots={item.slots}
                              type={'enrolled'}
                              onPress={() => {
                                navigation.navigate('StartExam', { id: item._id });
                              }}
                            />
                          </View>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={width}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
                      />
                  }
                </View>

                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Reels</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('reels') }}
                      style={styles.TouchAll}>
                      <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flex: 1, margin: 20 }}>
                  {
                    (homeData?.reels?.length === 0 || Object.keys(homeData).length === 0)
                      ?
                      <NoDataFound scale={0.7} message={"No Reels Found"} action={onRefresh} actionText={"Reload"} />
                      :
                      <FlatList
                        data={homeData.reels}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => { navigation.navigate('reels', { first_reel: item }) }}>
                            <Image
                              style={{ width: screenWidth / 3, height: 200, borderRadius: 5, objectFit: 'cover' }}
                              source={{ uri: BLOBURL + item.banner }}
                              controls={false}
                            />
                          </TouchableOpacity>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={width}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: CARD_MARGIN, gap: 14 }}
                      />
                  }
                </View>
              </View>
            </ScrollView>
        }
        <PaperModal visible={buyModalVisible} style={{ alignItems: "center" }}>
          <View style={styles.buyCourseModalView}>
            <Text style={styles.buyCourseModalText}>Buy {currentCourse?.cou_name} Course</Text>
            <View style={styles.buyCourseModalButtonsView}>
              <Button
                title="Yes"
                color={'#eb1313'}
                titleStyle={{
                  color: 'white',
                  fontSize: 15,
                  padding: 15,
                  paddingHorizontal: 30,
                }}
                buttonStyle={styles.logoutyesbutton}
                onPress={() => {
                  buyCourse()
                }}
              />
              <Button
                color={'#e6e3e8'}
                title="Cancel"
                buttonStyle={styles.logoutyesbutton}
                titleStyle={{ color: 'black', fontSize: 15, padding: 15 }}
                onPress={() => { setBuyModalVisible(false) }}
              />
            </View>
          </View>
        </PaperModal>
      </SafeAreaView>
    </>
  );
}


// import { View, Text, ScrollView } from 'react-native'
// import React from 'react'
// import { screenHeight } from '../../constants/Sizes.constant'

// export default function Home() {
//   return (
//     <ScrollView contentContainerStyle={{flexGrow:1}}>
//       <Text style={{height:screenHeight}}>Home1</Text>
//       <Text style={{height:screenHeight}}>Home2</Text>
//     </ScrollView>
//   )
// }