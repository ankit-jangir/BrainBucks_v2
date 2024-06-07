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
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import styles from '../../styles/ViewProfile.styles';
import Toast from 'react-native-toast-message';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import {useIsFocused} from '@react-navigation/native';
import {BLOBURL} from '../../config/urls';
import {Overlay} from '@rneui/themed';
import {Button} from '../../utils/Translate';
import basic from '../../services/BasicServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatSockService from '../../services/api/ChatSockService';

export default function ViewProfile({navigation, route}) {
  const [image1, setImage1] = useState(
    'https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png',
  );
  const [user, setUser] = useState(route.params.userData);
  let auth = new AuthenticationApiService();
  let isFocused = useIsFocused();
  const [loggingOut, setLoggingOut] = useState(false);
  const [visible, setVisible] = useState(false);

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
            navigation.reset({index: 0, routes: [{name: 'Splash'}]});
          });
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in Logging out', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
      });
    } finally {
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
          Toast.show({
            type: 'error',
            text1: res.Backend_Error,
          });
        }
      });
    } catch (err) {
      console.log('Error in Fetching Profile in Edit Profile', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Try again later',
      });
    }
  }, [isFocused]);

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
          <View style={styles.totalView}>
            <ImageBackground
              source={require('../../assets/img/background1.png')}
              resizeMode="contain"
              style={styles.bgImg}>
              <View style={styles.RfrView}>
                <Text style={styles.quizText}>Total Quiz Participated</Text>
                <Text style={[styles.quizText, {fontSize: 36}]}>
                  {route.params.totalPlayed}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <TouchableOpacity
            onPress={() => {
              /*Url()*/
            }}
            style={{width: '100%', paddingHorizontal: 10, marginBottom: 10}}>
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
              navigation.navigate('CustomerSupport')
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
              <Image style={{height:30, width:40, objectFit:'contain', marginRight:10, tintColor:'black'}} source={require('../../assets/img/arrowtoright.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('privacypolice')
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
              <Image style={{height:30, width:40, objectFit:'contain', marginRight:10, tintColor:'black'}} source={require('../../assets/img/arrowtoright.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RulesRegulations")
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
              <Image style={{height:30, width:40, objectFit:'contain', marginRight:10, tintColor:'black'}} source={require('../../assets/img/arrowtoright.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.HelpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AboutBB')
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
              <Image style={{height:30, width:40, objectFit:'contain', marginRight:10, tintColor:'black'}} source={require('../../assets/img/arrowtoright.png')}/>
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
