import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StatusBar, SafeAreaView, ActivityIndicator, BackHandler, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';
import { set } from 'react-native-reanimated';

export default function ResultRewards({ navigation, route }) {
  const [isLoad, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [reward, setReward] = useState(0);
  const [image, setImage] = useState("https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png");
  const [name, setName] = useState('');
  const [wish, setWish] = useState('Congratulations');
  const [time, setTime] = useState('00:00');
  const [score, setScore] = useState('0/00');
  const [wallet, setWallet] = useState('00.00');
  const [per, setPer] = useState('00');


  const goBack = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar barStyle={'white-content'} translucent={false} backgroundColor={'#701DDB'} />
      <SafeAreaView style={styles.ViewSafe}>
        {
          isLoad ?
            <View style={styles.LoaderView}>
              <ActivityIndicator size={50} color={ColorsConstant.White} />
            </View>
            :
            <View style={styles.MainVie}>
              <View style={styles.MainVie1}>
                <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} style={styles.touchIcon}>
                 <Image source={require('../../assets/img/homedark.png')} tintColor={'#fff'} style={{width:25,height:25}}/>
                </TouchableOpacity>

                <View style={styles.pic}>
                  <View style={styles.ViewM}>
                    <Text style={{fontSize:20}}>+</Text>
                  </View>
                  <View style={styles.WalletView}>
                    <Image source={require('../../assets/img/bbcoin.png')} style={styles.Coin} />
                    <Text style={styles.TextWallet}>{wallet}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.WishView} >
                <Text style={styles.TextWish}>{wish}</Text>
                <Text style={styles.TextName}>{name}</Text>

              </View>
              <View style={styles.imgView} >
                <View style={styles.imgView1} >
                  <Image source={{ uri: image }} style={styles.img} />
                </View>
              </View>
              <View style={styles.BBView} >
                <Text style={styles.TextReward}>{reward <= 0 ? 'better luck next time' : 'You Won'}</Text>
              </View>
              <View style={styles.BBCoinVe}>
                <Image source={require('../../assets/img/bbcoin.png')} style={{ width: 40, height: 40 }} />
                <Text style={styles.TextRe}>{reward}</Text>
              </View>
              <View style={styles.PerView}>
                <View style={styles.PerView1}>
                  <View style={styles.PerView2} >
                    <Text style={styles.TextScore}>Percentage</Text>
                    <Text style={styles.TextPr} >{per} %</Text>
                  </View>
                  <View style={[styles.PerView2, { flex: 0.40 }]} >
                    <Text style={styles.TextScore}>score</Text>
                    <View style={{ flexDirection: "row", }}>
                      <Text style={styles.TextPr} >{score}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tymView} >
                  <Text style={styles.TextTym}>Time</Text>
                  <View style={styles.tymView1}>
                    <Text style={styles.textMIN} > 0 Sec  </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('TriviaScoreCard',)} style={styles.TRecord} >
                  <Text style={styles.textView} >View Scorecard</Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </SafeAreaView>
    </>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  ViewSafe: {
    flex: 1,
    backgroundColor: ColorsConstant.Theme,
    paddingHorizontal: 10
  },
  LoaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  MainVie: {
    flex: 1,
    backgroundColor: ColorsConstant.Theme
  },
  MainVie1: {
    flexDirection: "row",
    justifyContent: 'space-between',
    height: 70,
    alignItems: "center"
  },
  touchIcon: {
    flex: 0.20,
    width: '20%',
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: "#ffffff40"
  },
  pic: {
    flexDirection: "row",
    backgroundColor: '#00000070',
    borderRadius: 10,
    width: '35%',
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  ViewM: {
    backgroundColor: '#00000080',
    borderRadius: 5,
    padding: 10,
    alignItems: 'flex-start',
  },
  WalletView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  Coin: {
    width: 20,
    height: 20
  },
  TextWallet: {
    fontSize: 15,
    fontFamily: 'WorkSans-SemiBold',
    color: ColorsConstant.White,
    paddingLeft: 10
  },
  WishView: {
    width: '100%',
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  TextWish: {
    fontFamily: "WorkSans-Medium",
    fontSize: 24,
    color: ColorsConstant.White
  },
  TextName: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 40,
    color: ColorsConstant.White
  },
  imgView: {
    width: '100%',
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  imgView1: {
    width: 150,
    height: 150,
    backgroundColor: '#FAFF10',
    borderRadius: 100,
    alignItems: "center",
    justifyContent: 'center',
    padding: 5
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  BBView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextReward: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 32,
    color: ColorsConstant.White
  },
  BBCoinVe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  TextRe: {
    fontSize: 40,
    fontFamily: 'WorkSans-SemiBold',
    color: ColorsConstant.TermColor,
    paddingLeft: 10
  },
  PerView: {
    width: '100%',
    borderRadius: 8,
    borderColor: ColorsConstant.White,
    height: 182,
    backgroundColor: ColorsConstant.LightPink,
    paddingTop: 20,
    borderWidth: 1,
    marginTop: 20
  },
  PerView1: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  PerView2: {
    flex: 0.60,
    justifyContent: "center"
  },
  TextScore: {
    color: ColorsConstant.White,
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold'
  },
  TextPr: {
    color: ColorsConstant.TermColor,
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 30
  },
  tymView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  },
  TextTym: {
    color: ColorsConstant.White,
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
    flex: 0.20
  },
  tymView1: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    flex: 0.80
  },
  textMIN: {
    color: ColorsConstant.TermColor,
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20
  },
  TRecord: {
    width: '100%',
    height: 50,
    backgroundColor: ColorsConstant.White,
    justifyContent: 'center',
    alignItems: "center",
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
  textView: {
    color: '#2E2E2E',
    fontFamily: 'WorkSans-Medium',
    fontSize: 16
  }
})
