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
} from 'react-native';
import SearchBar from './SearchBar';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant';
import { Text } from '../../utils/Translate';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../../styles/Home.styles';
import basic from '../../services/BasicServices';
import QuizCard from '../../components/QuizCard';
import { getTriviaDetails } from '../../controllers/TriviaQuizController';
import Toast from 'react-native-toast-message';
import { useSignal } from '@preact/signals-react';
import { getHomeData } from '../../controllers/HomeController';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';
import { useQuiz } from '../../context/QuizPlayReducer';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const { width } = Dimensions.get('window');
  const CARD_MARGIN = 1; // Adjust this value as needed
  const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width
  const [loading, setLoading] = useState(true)
  const [homeData, setHomeData] = useState({})

  const isFocused = useIsFocused()

  useEffect(() => {
    loadData()
    basic.getBearerToken().then(res => {
      console.log(res, 'token');
    });
  }, []);

  useEffect(()=>{
    getHomeData(Toast, setRefresh, setHomeData)
  },[isFocused])
  // console.log("HOME DATA: ", homeData);

  function loadData() {
    getHomeData(Toast, setLoading, setHomeData)
  }

  const onRefresh = () => {
    getHomeData(Toast, setRefresh, setHomeData)
  };



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
              <View style={{ marginBottom: 240 }}>
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

                {/* **********************************livequizes******************************* */}
                <View style={styles.LiveView}>
                  <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                      <Text style={styles.LiveText}>Live Quizes</Text>
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
                      onPress={() => navigation.navigate('AllLiveQuizzes',  {type: 'active'})}
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

                {/* ********************************************card**************************************** */}
                <TouchableOpacity style={styles.ReferCard}>
                  <ImageBackground
                    source={require('../../assets/img/background2.png')}
                    resizeMode="contain"
                    style={styles.bgPic}>
                    <View style={styles.ReferView}>
                      <Text style={styles.TextEarn}>Refer & Earn upto </Text>
                      <Text style={styles.TextRupee}>50,000</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
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
                      onPress={() => navigation.navigate('AllLiveQuizzes',  {type: 'trivia'})}
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
                      onPress={() => navigation.navigate('myexams', {exams: homeData?.exams})}
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
                              onPress={() => navigation.navigate('MyExamQuizzes', {id: item.id, imgurl: item.image, title:item.category_name})}
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
                      <Text style={styles.LiveText}>Enrolled Quizes</Text>
                      <View style={styles.lotiView}>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SeeView}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AllLiveQuizzes', {type: 'enrolled'})}
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
              </View>
            </ScrollView>
        }
      </SafeAreaView>
    </>
  );
}
