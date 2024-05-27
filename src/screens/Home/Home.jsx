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

export default function Home({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const width = Dimensions.get('window').width;

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };
  const DATA = [
    {
      id: '1',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },

    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
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
        <ScrollView
          style={{margin: 10, height: 1000}}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          <View style={{marginBottom: 100}}>
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
                  onPress={() => navigation.navigate('AllLiveQuizzes')}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, elevation: 4}}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <LiveQuizz
                    key={item.id}
                    item={item}
                    navigation={navigation}
                  />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={width}
                decelerationRate="fast"
              />
            </View>

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
            <View>
              <View style={styles.FreeView}>
                <View style={styles.FreeView1}>
                  <Text style={styles.TextExam}>Free Trivia</Text>
                </View>
                <View style={styles.LoadingView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AllTriviaQuizzes', {data: trivia})
                    }
                    style={styles.TouchAll}>
                    <Text style={styles.SeeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1, elevation: 4}}>
                <FlatList
                  data={DATA}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <FreeTrivia
                      key={item.id}
                      item={item}
                      navigation={navigation}
                    />
                  )}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={width}
                  decelerationRate="fast"
                />
              </View>
            </View>
            <View>
              <View style={styles.FreeView}>
                <View style={styles.FreeView1}>
                  <Text style={styles.TextExam}>Exams</Text>
                </View>
                <View style={styles.LoadingView}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MyExams');
                    }}
                    style={styles.TouchAll}>
                    <Text style={styles.SeeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {DATA.map(item => (
                  <Exams key={item.id} item={item} navigation={navigation} />
                ))}
              </ScrollView>
            </View>
            <View>
              <View style={styles.FreeView}>
                <View style={styles.FreeView1}>
                  <Text style={styles.TextExam}>Enrolled Quizes</Text>
                </View>
                <View style={styles.LoadingView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EnrolledQuizes', {
                        data: enrolledquizes,
                      })
                    }
                    style={styles.TouchAll}>
                    <Text style={styles.SeeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 1, elevation: 4}}>
                <FlatList
                  data={DATA}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <Enrolledquizes
                      key={item.id}
                      item={item}
                      navigation={navigation}
                    />
                  )}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={width}
                  decelerationRate="fast"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const Enrolledquizes = props => {
  return (
    <View style={styles.QuizzView}>
      <View style={styles.MaskedVieww}>
        <View style={styles.QuizzView1}>
          <View style={styles.QuizzView2}>
            <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.CatePic}
            />
          </View>
          <View style={styles.TitleView}>
            <Text style={styles.TitleTextt}>{props.item.title}</Text>
          </View>
        </View>
        <View style={styles.FeeView}>
          <View style={styles.FeeView1}>
            <View style={{flex: 6}}>
              <View style={styles.FeeView2}>
                <Text style={styles.TextPrice}>Fees</Text>
                <View style={styles.CoinView}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.CoinPic}
                  />
                  <Text style={styles.TextEntryFee}>{props.item.fee}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.TextPrice}>Prize</Text>
                <View style={styles.CoinView}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.CoinPic}
                  />
                  <Text style={styles.TextEntryFee}>{props.item.prize}</Text>
                </View>
              </View>
            </View>

            <View style={styles.TimeView}>
              <View style={styles.TimeView1}>
                <Image
                  source={require('../../assets/img/time2.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.TextLobi}>{props.item.date}</Text>
              </View>
              <View style={styles.TimeView1}>
                <Image
                  source={require('../../assets/img/calendar.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{width: 17, height: 17}}
                />
                <Text style={styles.TextLobi}>{props.item.date}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.FilledSlot}>
          <Image
            source={require('../../assets/img/dollar.png')}
            resizeMode="contain"
            style={styles.DollarPic}
          />
          <View style={styles.FilledSlot1}>
            <Text style={styles.TextSlot}>{props.item.earning}</Text>
          </View>
        </View>
        <View style={styles.LiniView}>
          <View style={styles.LiniView1}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 10}}
              colors={['#54ACFD', '#2289E7']}
              style={{
                borderRadius: 8,
                height: 10,
              }}></LinearGradient>
          </View>
        </View>
        <TouchableOpacity style={{width: '100%'}}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.6, y: 2.0}}
            colors={['#54ACFD', '#2289E7']}
            style={styles.RegiView}>
            <Text style={styles.TextRegister}>JOIN NOW</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LiveQuizz = props => {
  return (
    <View style={styles.QuizzView}>
      <View style={styles.MaskedVieww}>
        <View style={styles.QuizzView1}>
          <View style={styles.QuizzView2}>
            <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.CatePic}
            />
          </View>
          <View style={styles.TitleView}>
            <Text style={styles.TitleTextt}>{props.item.title}</Text>
          </View>
        </View>
        <View style={styles.FeeView}>
          <View style={styles.FeeView1}>
            <View style={{flex: 6}}>
              <View style={styles.FeeView2}>
                <Text style={styles.TextPrice}>Fees</Text>
                <View style={styles.CoinView}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.CoinPic}
                  />
                  <Text style={styles.TextEntryFee}>{props.item.fee}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.TextPrice}>Prize</Text>
                <View style={styles.CoinView}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.CoinPic}
                  />
                  <Text style={styles.TextEntryFee}>{props.item.prize}</Text>
                </View>
              </View>
            </View>

            <View style={styles.TimeView}>
              <View style={styles.TimeView1}>
                <Image
                  source={require('../../assets/img/time2.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.TextLobi}>{props.item.date}</Text>
              </View>
              <View style={styles.TimeView1}>
                <Image
                  source={require('../../assets/img/calendar.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{width: 17, height: 17}}
                />
                <Text style={styles.TextLobi}>{props.item.date}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.FilledSlot}>
          <Image
            source={require('../../assets/img/dollar.png')}
            resizeMode="contain"
            style={styles.DollarPic}
          />
          <View style={styles.FilledSlot1}>
            <Text style={styles.TextSlot}>{props.item.earning}</Text>
          </View>
        </View>
        <View style={styles.LiniView}>
          <View style={styles.LiniView1}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 10}}
              colors={['#54ACFD', '#2289E7']}
              style={{
                borderRadius: 8,
                height: 10,
              }}></LinearGradient>
          </View>
        </View>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('RulesofParticipation');
          }}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.6, y: 2.0}}
            colors={['#54ACFD', '#2289E7']}
            style={styles.RegiView}>
            <Text style={styles.TextRegister}>Register Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FreeTrivia = props => {
  return (
    <View style={{flex: 1, paddingVertical: 5}}>
      <View
        style={{
          width: 340,
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#F5F5F5',
          marginRight: 20,
          backgroundColor: '#fff',
          alignItems:"center"
        }}>
        <View style={styles.QuizzView1}>
          <View style={styles.QuizzView2}>
            <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.CatePic}
            />
          </View>
          <View style={styles.TitleView}>
            <Text style={styles.TitleTextt}>{props.item.title}</Text>
          </View>
        </View>

        <View style={styles.FeeView}>
          <View style={styles.FeeView1}>
            <View style={{flex: 6}}>
              <View style={styles.FeeView2}>
                <Text style={styles.TextPrice}>Fees</Text>
                <View style={styles.CoinView}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.CoinPic}
                  />
                  <Text style={styles.TextEntryFee}>{props.item.fee}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.TextPrice}>Prize</Text>
                  <View style={styles.CoinView}>
                    <Image
                      source={require('../../assets/img/bbcoin.png')}
                      style={styles.CoinPic}
                    />
                    <Text style={styles.TextEntryFee}>{props.item.prize}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.FilledSlot}>
          <Image
            source={require('../../assets/img/cup.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
          <View style={styles.SourecView}>
            <Text style={styles.TextMin}>{props.item.earning} %</Text>
          </View>
        </View>
        <View style={styles.LiniView}>
          <View style={styles.LiniView1}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={['#DD74EE', '#A715BE']}
              style={{
                borderRadius: 8,
                height: 10,
              }}></LinearGradient>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            height: 45,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#C922E4',
          }}>
          <Text
            style={{
              color: '#C922E4',
              fontSize: 17,
              fontFamily: 'WorkSans-Medium',
            }}>
            Participate Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Exams = () => {
  return (
    <View style={styles.ExamView}>
      <TouchableOpacity style={styles.TouchExam}>
        <View style={styles.ActiveView}>
          <Image
            source={require('../../assets/img/banner.png')}
            resizeMode="contain"
            style={styles.CatePic}
          />
        </View>
        <View style={styles.ActiveView}>
          <Text style={styles.TextCat}>000</Text>
        </View>
        <View style={styles.ActiveView}>
          <Text style={styles.TextActive}>Active Quizzes</Text>
        </View>
        <View style={styles.ActiveView}>
          <Text style={[styles.TextActive, {color: '#DC1111', fontSize: 32}]}>
            999
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
