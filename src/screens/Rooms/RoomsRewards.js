import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StatusBar,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {Text} from '../../utils/Translate';
import {ActivityIndicator} from 'react-native-paper';
import {ColorsConstant} from '../../constants/Colors.constant';
import {StyleConstants} from '../../constants/Style.constant';
import Toast from 'react-native-toast-message';
import {useQuiz} from '../../context/QuizPlayReducer';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import { BLOBURL } from '../../config/urls';
import RoomsApiService from '../../services/api/RoomsApiService';
export default function RoomsRewards({navigation, route}) {
  const [Load, setLoad] = useState(false);
  const [wallet, setwallet] = useState();

  const {quizState, dispatch} = useQuiz();
  const [data, setData] = useState({});

  const SubActive_id = quizState.id;
  const serv = new RoomsApiService();

  async function getQuizResult() {
    try {
      setLoad(true);
      let res = await serv.viewResult(SubActive_id);
      if (res.status === 1) {
        setData(res);
      }else{
        setData(res);
      }
    } catch (err) {
      console.log('Error while getting Reward in rooms ', err.message);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getQuizResult();
  }, []);

  // const goBack = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want exit from quiz?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'YES',
  //       onPress: () => navigation.reset({index: 0, routes: [{name: 'Home'}]}),
  //     },
  //   ]);
  // };

  useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );

    // return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={{zIndex: 10}}>
        <Toast />
      </View>
      <StatusBar
        barStyle={'white-content'}
        translucent={false}
        backgroundColor={ColorsConstant.Theme}
      />
      {Load ? (
        <ActivityIndicator size={20} color={ColorsConstant.Theme} />
      ) : (
        <View style={styles.containerV}>
          <View style={styles.containerVi}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.Touchable}>
              <Image
                source={require('../../assets/img/homedark.png')}
                tintColor={'#fff'}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.RewardName}>

          
            <Text style={styles.RewardText}>{data.reward === 0?'Better Luck Next Time ':'Congratulations'}</Text>
            <Text style={styles.RewardText1}>{data.self_name}</Text>
          </View>
          <View style={styles.containerV3}>
            <View style={styles.containerV4}>
              {data.self_profile_photo ? (

                <Image
                  source={{ uri: BLOBURL + data.self_profile_photo }}
                  style={styles.walletImg}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png',
                  }}
                  style={styles.walletImg}
                />
              )}
            </View>
          </View>
          <View style={styles.WonV}>
            <Text style={styles.WonText}>You Won</Text>
          </View>
          <View style={styles.RewardV}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              style={styles.RewardImg}
            />
            <Text style={styles.RewardTextB}>{data.reward}</Text>
          </View>
          <View style={styles.WalletView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('wallet')}
              style={styles.Touchable1}>
              <Image
                source={require('../../assets/img/wallet.png')}
                resizeMode="center"
                style={styles.WalletImage}
              />
              <Text style={styles.WalletText}>View Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    containerV: {
      flex: 1,
      backgroundColor: ColorsConstant.Theme,
      paddingHorizontal: 10,
    },
    containerVi: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 10,
    },
    Touchable: {
      // flex: 0.20,
      // width: '10%',
      borderRadius: 100,
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
      // paddingHorizontal: 10,
      backgroundColor: '#ffffff40',
    },
    AddView: {
      flexDirection: 'row',
      backgroundColor: '#00000070',
      borderRadius: 10,
      width: '50%',
      height: 40,
      paddingHorizontal: 5,
      alignItems: 'center',
    },
    AddView1: {
      backgroundColor: '#00000080',
      borderRadius: 5,
      padding: 3,
      alignItems: 'flex-start',
    },
    walletV: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    walletImg: {
      width: 200,
      height: 200,
      borderRadius:100
    },
    AddBtext: {
      fontSize: 15,
      fontFamily: 'WorkSans-SemiBold',
      color: '#fff',
      paddingLeft: 10,
    },
    RewardName: {
      width: '100%',
      alignItems: 'center',
      height: 100,
      justifyContent: 'center',
    },
    RewardText: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 24,
      color: '#fff',
    },
    RewardText1: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 40,
      color: '#fff',
    },
    containerV3: {
      width: '100%',
      height: 250,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerV4: {
      width: 200,
      height: 200,
      backgroundColor: ColorsConstant.TermColor,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    conImg: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
    WonV: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    WonText: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 32,
      color: '#fff',
    },
    RewardV: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    RewardImg: {
      width: 40,
      height: 40,
    },
    RewardTextB: {
      fontSize: 40,
      fontFamily: 'WorkSans-SemiBold',
      color: ColorsConstant.TermColor,
      paddingLeft: 10,
    },
    WalletView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
    },
    Touchable1: {
      width: 300,
      height: 60,
      backgroundColor: ColorsConstant.OtpbgColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    WalletImage: {
      width: 25,
      height: 25,
    },
    WalletText: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 24,
      color: '#fff',
      paddingLeft: 15,
    },
  });
