import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  ScrollView,
  Linking,
  ToastAndroid,
  Clipboard,
  Alert,
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import styles from '../../styles/ViewProfile.styles';
import Toast from 'react-native-toast-message';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import {useIsFocused} from '@react-navigation/native';
import {APPURL, BLOBURL} from '../../config/urls';
import {Overlay} from '@rneui/themed';
import {Button} from '../../utils/Translate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatSockService from '../../services/api/ChatSockService';
import { generateDynamicLink } from '../../utils/createDynamicLink';

export default function ViewProfile({navigation, route}) {
  const [image1, setImage1] = useState('https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png',
  );
  const [user, setUser] = useState({});
  let auth = new AuthenticationApiService();


  let isFocused = useIsFocused();
  const [loggingOut, setLoggingOut] = useState(false);
  const [visible, setVisible] = useState(false);

  const [referCode, setReferCode] = useState('');
  const [totalPlayed, setTotalPlayed] = useState(0);

  useEffect(() => {
    try {
      auth.getUserProfile().then(res => {
        if (res.status === 1) {
          setUserData(res.user_details);
          if (res.user_details.image) {
            setImage1(BLOBURL + res.user_details.image);
          }
          setTotalPlayed(res.totalquizplayed);
          
        } else {
          ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      console.log('Error in Fetching User Profile', err.message);
    }
  }, [isFocused]);






  useEffect(() => {
    const fetchReferCode = async () => {
      const code = await auth.getReferCode();
      if (code) {
        setReferCode(code);
      }
    };

    fetchReferCode();
  }, []);

  function toggleOverlay() {
    setVisible(!visible);
  }

  async function logOut() {
    setLoggingOut(true);
    try {
      let response = await auth.logout();
      if (response.status === 1) {
        basic.setJwt('').then(() => {
          AsyncStorage.removeItem('language').then(() => {
            toggleOverlay();
            ChatSockService.disconnect();
          });
        });
      } else {
        ToastAndroid.show(response.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in Logging out', err.message);
    } finally {
      navigation.reset({index: 0, routes: [{name: 'Splash'}]});
      setLoggingOut(false);
    }
  }

  useEffect(() => {
    try {
      auth.getUserProfile().then(res => {
        if (res.status === 1) {
          setUser(res.user_details);
          if (res.user_details.image) {
            setImage1(BLOBURL + res.user_details.image);
          }
        } else {
          ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      console.log('Error in Fetching Profile in Edit Profile', err.message);
    }
  }, [isFocused]);


// const onShare = async () => {
//   if (!referCode) {
//     ToastAndroid.show(
//       'Unable to get referral code. Please try again later.',
//       ToastAndroid.SHORT
//     );
//     return;
//   }

//   try {
//     // ✅ Get short dynamic link from Firebase
//     const dynamicLink = await generateDynamicLink(referCode);

//     if (!dynamicLink) {
//       ToastAndroid.show('Failed to generate referral link', ToastAndroid.SHORT);
//       return;
//     }

//     const message = `🎉 Earn Rewards with BrainBucks! 🧠💰

// Hey! I’ve been using this awesome app called BrainBucks where you earn real rewards by participating in fun quizzes! 🏆📱

// 👉 My Referral Code: ${referCode}

// 📲 Download now using this link:
// ${dynamicLink}

// The referral code will be applied automatically on install. Let’s earn together! 🚀`;

//     const result = await Share.share({ message });

//     if (result.action === Share.sharedAction) {
//       console.log('Referral link shared successfully');
//     } else if (result.action === Share.dismissedAction) {
//       console.log('Referral share dismissed');
//     }
//   } catch (error) {
//     Alert.alert('Error', error.message);
//   }
// };


const onShare = async () => {
  try {
    const result = await Share.share({
      message: `🎉 Earn Rewards with BrainBucks! 🧠💰

Hey! I’ve been using this awesome app called BrainBucks where you earn real rewards by participating in fun quizzes! 🏆📱

👉 My Referral Code: ${referCode}

📲 Download now using this link:
${APPURL}/SignupReferral?referralCode=${referCode}

The referral code will be applied automatically on install. Let’s earn together! 🚀`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};


  const copyToClipboard = () => {
    Clipboard.setString(referCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  return (
    <SafeAreaView style={StyleConstants.safeArView}>
      <Toast />
      <View style={styles.HeaderView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={StyleConstants.H2Nd}>
            <Image
              source={require('../../assets/img/arrows.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleOverlay}
            style={StyleConstants.TocHead}>
            <Image
              source={require('../../assets/img/logout.png')}
              tintColor={'red'}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.MainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.MainView1}>
              {/* <View style={styles.MainView2} >
                      <Image source={{ uri: image }} style={styles.img} />
                    </View> */}
            </View>
          </View>
          <Image
            source={{uri: image1}}
            resizeMode="contain"
            style={styles.ProfileImg}
          />
          <View style={styles.mobView}>
            <Text style={styles.TextName}>{user.name}</Text>
            <Text style={styles.Textmobile}>{user.phone}</Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {...route.params})
                }
                style={styles.EditT}>
                <Text style={styles.EditText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Your Referral Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.referCode}>{referCode}</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                {/* <Icon name="copy-outline" size={22} color="#2188E7" /> */}
                <Image
                  source={require('../../assets/img/copy.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalView}>
            <ImageBackground
              source={require('../../assets/img/background1.png')}
              resizeMode="contain"
              style={styles.bgImg}>
              <View style={styles.RfrView}>
                <Text style={styles.quizText}>Total Quiz Participated</Text>
                
                <Text style={[styles.quizText, {fontSize: 36,}]}>
                  {totalPlayed}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <TouchableOpacity
            onPress={onShare}
            style={{width: '100%', paddingHorizontal: 10, marginBottom: 35}}>
            <ImageBackground
              source={require('../../assets/img/background2.png')}
              resizeMode="contain"
              style={styles.bgImg}>
              <View style={styles.RfrView}>
                <Text style={styles.quizText}>Refer & Earn upto </Text>
                <Text style={[styles.quizText, {fontSize: 36}]}>50,000</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CustomerSupport');
              }}
              style={styles.touchH}>
              <View style={styles.CkrView}>
                <Image
                  source={require('../../assets/img/chakr.png')}
                  resizeMode="contain"
                  style={styles.Ckrimg}
                />
              </View>
              <View style={styles.SupportV}>
                <Text style={styles.TextSupport}>Help and Support</Text>
              </View>
              <Image
                style={styles.arrowToRight}
                source={require('../../assets/img/arrowtoright.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('privacypolice');
              }}
              style={styles.touchH}>
              <View style={styles.CkrView}>
                <Image
                  source={require('../../assets/img/privacypolicyblack.png')}
                  resizeMode="contain"
                  style={styles.Ckrimg}
                />
              </View>
              <View style={styles.SupportV}>
                <Text style={styles.TextSupport}>Privacy Policy</Text>
              </View>
              <Image
                style={styles.arrowToRight}
                source={require('../../assets/img/arrowtoright.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RulesRegulations');
              }}
              style={styles.touchH}>
              <View style={styles.CkrView}>
                <Image
                  source={require('../../assets/img/SecurityBlack.png')}
                  resizeMode="contain"
                  style={styles.Ckrimg}
                />
              </View>
              <View style={styles.SupportV}>
                <Text style={styles.TextSupport}>Rules & Regulations</Text>
              </View>
              <Image
                style={styles.arrowToRight}
                source={require('../../assets/img/arrowtoright.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.HelpView, {marginBottom: 30}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AboutBB');
              }}
              style={styles.touchH}>
              <View style={styles.CkrView}>
                <Image
                  source={require('../../assets/img/bbimg.png')}
                  resizeMode="contain"
                  style={{width: 60, height: 60}}
                />
              </View>
              <View style={styles.SupportV}>
                <Text style={styles.TextSupport}>About Brain Bucks</Text>
              </View>
              <Image
                style={styles.arrowToRight}
                source={require('../../assets/img/arrowtoright.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.logoutView}>
          <Text style={styles.welcomeText}>Do You Want To Log Out</Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Yes"
              color={'#eb1313'}
              titleStyle={{color: 'white', fontSize: 15, padding: 15}}
              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                logOut().then(toggleOverlay).then(ChatSockService.disconnect);
              }}
            />
            <Button
              titleStyle={{color: 'black', fontSize: 15, padding: 15}}
              color={'#e6e3e8'}
              title="No"
              buttonStyle={styles.logoutyesbutton}
              onPress={toggleOverlay}
            />
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  );
}
