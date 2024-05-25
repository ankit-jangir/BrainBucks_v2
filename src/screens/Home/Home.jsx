import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import SearchBar from './SearchBar';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from "../../constants/Colors.constant";
import { Text } from "../../utils/Translate";

export default function Home({navigation}) {
  const [refresh, setRefresh] = useState(false);  
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(()=>(
      setRefresh(false)
    ),3000)
  }
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
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          style={{paddingHorizontal: 10}}>
          <View style={styles.carouselContainer}>
            {/* <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={banner}
              // scrollAnimationDuration={1000}
              renderItem={({index, item}) => (
                <View style={styles.carouselItem}>
                  <Image source={item.image} style={styles.carouselImage} />
                </View>
              )}
            /> */}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <LiveQuizz item={DATA} navigation={navigation} />
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              Url();
            }}
            style={styles.ReferCard}>
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
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <FreeTrivia item={DATA}  navigation={navigation} />
            </ScrollView>
          </View>
          <View>
            <View style={styles.FreeView}>
              <View style={styles.FreeView1}>
                <Text style={styles.TextExam}>Exams</Text>
              </View>
              <View style={styles.LoadingView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyExams', {data: exam});
                  }}
                  style={styles.TouchAll}>
                  <Text style={styles.SeeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Exams item={DATA} navigation={navigation} />
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

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 100}}>
              <Enrolledquizes item={DATA}  navigation={navigation} />
            </ScrollView>
          </View>
          <View></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const Enrolledquizes = () => {
  return (
    <View style={styles.QuizzView}>
      <View
        style={styles.MaskedVieww}>
        <View style={styles.QuizzView1}>
          <View style={styles.QuizzView2}>
            <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.CatePic}
            />
          </View>
          <View style={styles.TitleView}>
            <Text style={styles.TitleTextt}>098765</Text>
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
                  <Text style={styles.TextEntryFee}>
                  666
                  </Text>
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
                  <Text style={styles.TextEntryFee}>98765</Text>
                </View>
              </View>
            </View>

            <View style={styles.TimeView}>
              <View style={styles.TimeView1}>
                <Text style={styles.TextLobi}>
                 7654567
                </Text>
              </View>
              <View style={styles.TimeView1}>
              
                <Text style={styles.TextLobi}>
                  8765678
                </Text>
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
            <Text style={styles.TextSlot}>88/</Text>
            <Text style={[styles.TextSlot, {color: '#333333'}]}>
             000
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
        <TouchableOpacity
          
            style={{width: '100%'}}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 2.0}}
              colors={['#54ACFD', '#2289E7']}
              style={styles.RegiView}>
              <Text style={styles.TextRegister}>JOIN</Text>
            </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const LiveQuizz = () => {
  return (
    <View style={styles.QuizzView}>
      <View
        style={styles.MaskedVieww}>
        <View style={styles.QuizzView1}>
          <View style={styles.QuizzView2}>
          <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.CatePic}
            />
          </View>
          <View style={styles.TitleView}>
            <Text style={styles.TitleTextt}>9988</Text>
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
                  <Text style={styles.TextEntryFee}>
                   0987
                  </Text>
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
                  <Text style={styles.TextEntryFee}>678</Text>
                </View>
              </View>
            </View>

            <View style={styles.TimeView}>
              <View style={styles.TimeView1}>
                <Text style={styles.TextLobi}>
                  ooo
                </Text>
              </View>
              <View style={styles.TimeView1}>
                <Text style={styles.TextLobi}>09876544
                </Text>
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
            <Text style={styles.TextSlot}>99/</Text>
            <Text style={[styles.TextSlot, {color: '#333333'}]}>
          00
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
          <TouchableOpacity
           style={{width: '100%'}}>
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

const FreeTrivia = () => {
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
            <Text style={styles.TitleTextt}>8888</Text>
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
                  <Text style={styles.TextEntryFee}>0</Text>
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
                    <Text style={styles.TextEntryFee}>99</Text>
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
            <Text style={styles.TextMin}>
              00 %
            </Text>
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
      <TouchableOpacity
        style={styles.TouchExam}>
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
            uuuuu
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    MainView: {
      width: '100%',
      height: 145,
      justifyContent: 'center',
      alignItems: 'center',
    },
    LiveView: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      flex: 1,
    },
    LiveView1: {
      flex: 1,
      justifyContent: 'center',
    },
    LiveView2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    LiveText: {
      color: '#000',
      fontSize: 16,
      fontFamily: 'WorkSans-Medium',
    },
    lotiView: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    SeeView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    TouchAll: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    SeeAll: {
      color: ColorsConstant.GreenColor,
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
    },
    ViewLoti: {
      width: 25,
      height: 25,
      backgroundColor: 'transparent',
    },
    ReferCard: {
      width: '100%',
      paddingHorizontal: 0,
      marginBottom: 10,
      height: 'auto',
    },
    bgPic: {
      width: '100%',
      height: 100,
      alignItems: 'flex-start',
    },
    ReferView: {
      width: '100%',
      paddingLeft: 10,
      paddingVertical: 13,
    },
    TextEarn: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 16,
      color: ColorsConstant.White,
    },
    TextRupee: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 36,
      color: ColorsConstant.White,
    },
    FreeView: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      flex: 1,
    },
    FreeView1: {
      flex: 1,
      justifyContent: 'center',
    },
    TextExam: {
      color: '#000',
      fontSize: 16,
      fontFamily: 'WorkSans-Medium',
    },
    LoadingView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    TouchRender: {
      flex: 1,
      width: 100,
      height: 100,
      paddingHorizontal: 10,
    },
    Pic: {
      width: '100%',
      height: 145,
    },
    QuizzView: {
      flex: 1,
      paddingVertical: 5,
    },
    MaskedVieww: {
      width: 340,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      marginRight: 20,
      backgroundColor: ColorsConstant.White,
    },
    QuizzView1: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: ColorsConstant.White,
    },
    QuizzView2: {
      width: 50,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    CatePic: {
      width: 40,
      height: 40,
    },
    TitleView: {
      width: '100%',
      height: 'auto',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    TitleTextt: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18,
      width: '90%',
    },
    FeeView: {
      width: '100%',
      height: 60,
      backgroundColor: ColorsConstant.White,
      marginTop: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    FeeView1: {
      flex: 1,
      flexDirection: 'row',
    },
    FeeView2: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextPrice: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: ColorsConstant.GrayyColor,
      flex: 0.3,
    },
    CoinView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex: 0.7,
      alignItems: 'center',
    },
    CoinPic: {
      width: 20,
      height: 20,
    },
    TextEntryFee: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: '#F5B807',
      paddingLeft: 10,
    },
    TimeView: {
      flex: 4,
      backgroundColor: ColorsConstant.White,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    TimeView1: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextLobi: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
      color: '#8A8A8A',
      paddingLeft: 10,
    },
    FilledSlot: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    DollarPic: {
      width: 25,
      height: 25,
    },
    FilledSlot1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    TextSlot: {
      color: '#2188E7',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18,
    },
    LiniView: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
    },
    LiniView1: {
      height: 10,
      backgroundColor: 'whitesmoke',
      borderRadius: 10,
    },
    RegiView: {
      height: 45,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextRegister: {
      color: ColorsConstant.White,
      fontSize: 17,
      fontFamily: 'WorkSans-Medium',
    },
    SourecView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    TextMin: {
      color: '#C922E4',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18,
    },
    ExamView: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 5,
    },
    TouchExam: {
      width: 160,
      padding: 8,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      marginRight: 20,
      backgroundColor: ColorsConstant.White,
    },
    ActiveView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextCat: {
      fontSize: 20,
      fontFamily: 'WorkSans-SemiBold',
      textAlign: 'center',
    },
    TextActive: {
      fontSize: 16,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'center',
      color: ColorsConstant.GrayyColor,
    },
    ChalView: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 20,
    },
    GraView: {
      width: 340,
      borderRadius: 10,
      padding: 15,
      justifyContent: 'space-between',
      marginRight: 20,
    },
    GraView1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    TextHash: {
      color: '#F0F0F050',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
    },
    CountView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextCount: {
      color: '#F0F0F050',
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
    },
    TextJoin: {
      color: ColorsConstant.White,
      fontFamily: 'WorkSans-Medium',
      fontSize: 16,
    },
    ViewCatName: {
      justifyContent: 'flex-start',
      paddingTop: 20,
    },
    CateName: {
      color: ColorsConstant.White,
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 30,
    },
    ViewCatName1: {
      width: '100%',
      height: 30,
      justifyContent: 'center',
    },
    GradientView: {
      height: 10,
      backgroundColor: '#F8F8F840',
      borderRadius: 10,
    },
  });
