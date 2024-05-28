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
  const {width} = Dimensions.get('window');
  const CARD_MARGIN = 1; // Adjust this value as needed
  const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width

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
                  <Text style={styles.LiveText}>Enrolled Quizes</Text>
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
                    <Enrolledquizes
                      key={item.id}
                      item={item}
                      navigation={navigation}
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
                    <FreeTrivia
                      key={item.id}
                      item={item}
                      navigation={navigation}
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
                    <Enrolledquizes
                      key={item.id}
                      item={item}
                      navigation={navigation}
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

const Enrolledquizes = props => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 20,
        borderRadius: 8,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={require('../../assets/img/banner.png')}
            style={{width: 35, height: 35, borderRadius: 100}}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              paddingLeft: 20,
              fontWeight: '700',
            }}>
            SBI-PO Current Affairs
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Fees
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '700',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/img/time2.png')}
              resizeMode="contain"
              tintColor={'rgba(138, 138, 138, 1)'}
              style={{width: 20, height: 20}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              12/10/2002
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Prize
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/img/calendar.png')}
              resizeMode="contain"
              tintColor={'rgba(138, 138, 138, 1)'}
              style={{width: 17, height: 17}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              12/10/2002
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image
          source={require('../../assets/img/dollar.png')}
          resizeMode="contain"
          style={{width: 25, height: 25}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text
            style={{
              color: '#2188E7',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 18,
            }}>
            988/
          </Text>
          <Text
            style={{
              color: '#333333',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 18,
            }}>
            88
          </Text>
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

      <TouchableOpacity style={{width: '100%', marginTop: 16}}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.6, y: 2.0}}
          colors={['#54ACFD', '#2289E7']}
          tyle={{borderRadius: 10}}>
          <Text style={{textAlign: 'center', padding: 15, borderRadius: 10}}>
            JOIN NOW
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const LiveQuizz = props => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 20,
        borderRadius: 8,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={require('../../assets/img/banner.png')}
            style={{width: 35, height: 35, borderRadius: 100}}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              paddingLeft: 20,
              fontWeight: '700',
            }}>
            SBI-PO Current Affairs
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Fees
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '700',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/img/time2.png')}
              resizeMode="contain"
              tintColor={'rgba(138, 138, 138, 1)'}
              style={{width: 20, height: 20}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              12/10/2002
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Prize
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/img/calendar.png')}
              resizeMode="contain"
              tintColor={'rgba(138, 138, 138, 1)'}
              style={{width: 17, height: 17}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              12/10/2002
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image
          source={require('../../assets/img/dollar.png')}
          resizeMode="contain"
          style={{width: 25, height: 25}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text
            style={{
              color: '#2188E7',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 18,
            }}>
            988/
          </Text>
          <Text
            style={{
              color: '#333333',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 18,
            }}>
            88
          </Text>
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

      <TouchableOpacity style={{width: '100%', marginTop: 16}}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.6, y: 2.0}}
          colors={['#54ACFD', '#2289E7']}
          tyle={{borderRadius: 10}}>
          <Text style={{textAlign: 'center', padding: 15, borderRadius: 10}}>
            Register Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const FreeTrivia = props => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 20,
        borderRadius: 8,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={require('../../assets/img/banner.png')}
            style={{width: 35, height: 35, borderRadius: 100}}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              paddingLeft: 20,
              fontWeight: '700',
            }}>
            SBI-PO Current Affairs
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Fees
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '700',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
              Prize
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 5,
              }}>
              99
            </Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Image
          source={require('../../assets/img/cup.png')}
          resizeMode="contain"
          style={{width: 20, height: 20}}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#C922E4', marginLeft: 10}}>8888 %</Text>
        </View>
      </View>

      <View style={{marginTop: 5}}>
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
        onPress={() => props.navigation.navigate('FreeTriviaStarExam')}
        style={{
          width: '100%',
          height: 45,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#C922E4',
          marginTop: 14,
        }}>
        <Text
          style={{
            color: '#C922E4',
            fontSize: 14,
            fontFamily: 'WorkSans-Medium',
          }}>
          Participate Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const Exams = () => {
  return (
    <View style={styles.ExamView}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MyExamQuizzes')}
        style={styles.TouchExam}>
        <View style={styles.ActiveView}>
          <Image
            source={require('../../assets/img/image.png')}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
        </View>
        <View style={styles.ActiveView}>
          <Text style={styles.TextCat}>category_name</Text>
        </View>
        <View style={styles.ActiveView}>
          <Text style={styles.TextActive}>Active Quizzes</Text>
        </View>
        <View style={styles.ActiveView}>
          <Text style={[styles.TextActive, {color: '#DC1111', fontSize: 32}]}>
            77
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
