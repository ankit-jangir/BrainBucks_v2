import React, {useState, useEffect, useRef} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {StyleConstants} from '../../constants/Style.constant';
import {ColorsConstant} from '../../constants/Colors.constant';
import {Text} from '../../utils/Translate';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../../styles/Home.styles';
import basic from '../../services/BasicServices';
import QuizCard from '../../components/QuizCard';

export default function Home({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const {width} = Dimensions.get('window');
  const CARD_MARGIN = 1; // Adjust this value as needed
  const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width

  useEffect(() => {
    basic.getBearerToken().then(res => {
      console.log(res, 'token');
    });
  });

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };
  const DATA = [
    {
      id: '1',
      title: 'SBI-PO Current Affairs',
      fee: '9',
      date: '12/10/2002',
      prize: '90',
      earning: '8',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '6',
      date: '12/10/2002',
      prize: '9',
      earning: '88',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988',
    },

    {
      id: '2',
      title: ' Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '88',
    },
    // Add more items as needed
  ];

  const banner = [
    {title: 'Image 1', image: require('../../assets/img/banner1.png')},
    {title: 'Image 2', image: require('../../assets/img/banner_1.png')},
    {title: 'Image 3', image: require('../../assets/img/banner.png')},
  ];

  return (
    <>
      <SafeAreaView style={StyleConstants.safeArView}>
        <View>
          <SearchBar />
        </View>
        <ScrollView>
          <View style={{marginBottom: 240}}>
            <View style={styles.carouselContainer}>
              <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={banner}
                scrollAnimationDuration={100}
                renderItem={({index, item}) => (
                  <View style={styles.carouselItem}>
                    <Image source={item.image} style={styles.carouselImage} />
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
                  onPress={() => navigation.navigate('AllLiveQuizzes')}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: CARD_WIDTH,
                      margin: CARD_MARGIN,
                    }}>
                    <QuizCard
                      key={item.id}
                      prize={item.prize}
                      fees={item.fee}
                      time={item.date}
                      title={item.title}
                      date={item.date}
                      image={require('../../assets/img/banner.png')}
                      alotedslots={item.earning}
                      totalslots={item.earning}
                      type={'active'}
                      onPress={() => {
                        navigation.navigate('RulesofParticipation');
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
                contentContainerStyle={{paddingHorizontal: CARD_MARGIN}}
              />
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
                    <Text>yh</Text>
                  </View>
                </View>
              </View>
              <View style={styles.SeeView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllLiveQuizzes')}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: CARD_WIDTH,
                      margin: CARD_MARGIN,
                    }}>
                    <QuizCard
                      key={item.id}
                      prize={item.prize}
                      fees={item.fee}
                      title={item.title}
                      image={require('../../assets/img/banner.png')}
                      alotedslots={item.earning}
                      totalslots={item.earning}
                      type={'trivia'}
                      onPress={() => {
                        navigation.navigate('FreeRulesParticipation');
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
                contentContainerStyle={{paddingHorizontal: CARD_MARGIN}}
              />
            </View>
            {/* **********************************exam******************************* */}

            <View style={styles.LiveView}>
              <View style={styles.LiveView1}>
                <View style={styles.LiveView2}>
                  <Text style={styles.LiveText}>Exams</Text>
                  <View style={styles.lotiView}>
                    <Text>yh</Text>
                  </View>
                </View>
              </View>
              <View style={styles.SeeView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllLiveQuizzes')}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={DATA}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <>
                  <View style={styles.ExamView}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('MyExamQuizzes')}
                      style={styles.TouchExam}>
                      <View style={styles.ActiveView}>
                        <Image source={require('../../assets/img/image.png')} style={{ width: 40, height: 40, borderRadius: 100 }} />
                      </View>
                      <View style={styles.ActiveView}>
                        <Text style={styles.TextCat}>exam</Text>
                      </View>
                      <View style={styles.ActiveView}>
                        <Text style={styles.TextActive}>Active Quizzes</Text>
                      </View>
                      <View style={styles.ActiveView}>
                        <Text
                          style={[
                            styles.TextActive,
                            {color: '#DC1111', fontSize: 32},
                          ]}>
                          99
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              horizontal
              pagingEnabled
                showsHorizontalScrollIndicator={false}
                // snapToInterval={width}
                snapToAlignment="center"
                decelerationRate="fast"
            />
            {/* **********************************Enrolledquizes******************************* */}
            <View style={styles.LiveView}>
              <View style={styles.LiveView1}>
                <View style={styles.LiveView2}>
                  <Text style={styles.LiveText}>Enrolled Quizes</Text>
                  <View style={styles.lotiView}>
                    <Text>yh</Text>
                  </View>
                </View>
              </View>
              <View style={styles.SeeView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllLiveQuizzes')}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: CARD_WIDTH,
                      margin: CARD_MARGIN,
                    }}>
                    <QuizCard
                      key={item.id}
                      prize={item.prize}
                      fees={item.fee}
                      time={item.date}
                      title={item.title}
                      date={item.date}
                      image={require('../../assets/img/banner.png')}
                      alotedslots={item.earning}
                      totalslots={item.earning}
                      type={'enrolled'}
                      onPress={() => {
                        navigation.navigate('StartExam');
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
                contentContainerStyle={{paddingHorizontal: CARD_MARGIN}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
