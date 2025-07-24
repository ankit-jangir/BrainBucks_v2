import {
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from '../../styles/Rooms.styles';
import Explore from './Explore';
import MyRooms from './MyRooms';
import {Button} from '../../utils/Translate';
import {Text, TextInput} from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import {
  CheckEligibilityForPublicRoom,
  SendOTPToMail,
  verifyOTP,
} from '../../controllers/RoomsController';
import PrivateRooms from './PrivateRooms';
import {Modal} from 'react-native-paper';
import {ColorsConstant} from '../../constants/Colors.constant';
import {useIsFocused} from '@react-navigation/native';
import BasicServices from '../../services/BasicServices';

const Tab = createMaterialTopTabNavigator();

export default function Rooms({navigation, route}) {
  const {id, type} = route.params || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [checkValidityLoading, setValidityLoading] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [userType, setUserType] = useState(null);
  const isFocused = useIsFocused();

  async function handleEligibleClick() {
    let res = await CheckEligibilityForPublicRoom(
      toastHandlerForModal,
      setValidityLoading,
    );
    if (res.status === 1) {
      setErrorMessage(null);
      setVisible(true);
    }
  }

  useEffect(() => {
    if (isFocused) {
      BasicServices.getUserType().then(type => {
        console.log('User Type (is_edu):', type);
        setUserType(type);
      });
    }
  }, [isFocused]);

  async function verifyOtp() {
    if (otp.trim().length !== 6) {
      ToastAndroid.show('Enter A Valid OTP', ToastAndroid.SHORT);
      return;
    }
    let res = await verifyOTP(email, otp, Toast, setOtpLoading);
    if (res.status === 1) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      setOtpModalVisible(false);
      setOtp('');
      setEmail('');
    }
  }

  async function sendOtpToMail() {
    let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.trim().length === 0 || !mailRegex.test(email)) {
      ToastAndroid.show('Please Enter a valid email', ToastAndroid.SHORT);
      return;
    }
    let res = await SendOTPToMail(email, Toast, setMailLoading);
    if (res.status === 1) {
      setVisible(false);
      setOtpModalVisible(true);
    }
  }

  const toastHandlerForModal = {
    show: obj => {
      setErrorMessage(obj.text1), setVisible(true);
    },
  };

  return (
    <>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          if (showActions) setShowActions(false);
          Keyboard.dismiss();
        }}>
        <View style={styles.maincontainer}>
          <View style={styles.topbtns}>
            <Text style={styles.roomstext}>Rooms</Text>

            <View style={{position: 'relative', zIndex: 10}}>
              <TouchableOpacity
                onPress={() => setShowActions(prev => !prev)}
                style={styles.actionToggleButton}>
                <Text style={styles.actionToggleText}>+ Action</Text>
              </TouchableOpacity>

              {showActions && (
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={styles.actionContainer}>
                    <Button
                      title="Create Room"
                      onPress={() => {
                        setShowActions(false);
                        navigation.navigate('createroom');
                      }}
                      buttonStyle={styles.actionButton}
                      titleStyle={styles.actionTitle}
                    />
                    {userType !== true && (
                      <Button
                        title="Apply Public"
                        onPress={() => {
                          setShowActions(false);
                          handleEligibleClick();
                        }}
                        buttonStyle={styles.actionButton}
                        titleStyle={styles.actionTitle}
                      />
                    )}
                    <Button
                      title="Add Questions"
                      onPress={() => {
                        setShowActions(false);
                        navigation.navigate('Questionscreen');
                      }}
                      buttonStyle={styles.actionButton}
                      titleStyle={styles.actionTitle}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>

          {userType === true ? (
            <>
              <View style={{paddingHorizontal: 16}}>
                <Text style={[styles.roomstext, {fontSize: 16, color: 'gray'}]}>
                  Created Rooms
                </Text>
              </View>
              <MyRooms navigation={navigation} route={route} />
            </>
          ) : (
            <Tab.Navigator
              style={{marginTop: 25}}
              tabBar={props => (
                <MyTabBar
                  {...props}
                  imgNeeded={true}
                  width={100}
                  isEdu={userType}
                />
              )}
              initialRouteName="MyRooms">
              <Tab.Screen
                name="MyRooms"
                component={MyRooms}
                initialParams={{id}}
              />
              <Tab.Screen
                name="Explore"
                component={Explore}
                initialParams={{id}}
              />
              <Tab.Screen
                name="Private"
                component={PrivateRooms}
                initialParams={{id}}
              />
            </Tab.Navigator>
          )}

          {/* Email Modal */}
          <Modal
            visible={visible}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 20,
                margin: 30,
                backgroundColor: 'white',
                minWidth: 300,
              }}>
              {!errorMessage ? (
                <>
                  <TextInput
                    style={[styles.createRoomInput]}
                    placeholder={'Enter Your E-mail Address'}
                    placeholderTextColor={'gray'}
                    inputMode="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                  <View style={{flexDirection: 'row', gap: 20, marginTop: 30}}>
                    <Button
                      title="OK"
                      onPress={sendOtpToMail}
                      buttonStyle={{borderColor: ColorsConstant.Theme}}
                      loading={mailLoading}
                      titleStyle={{color: ColorsConstant.White}}
                      containerStyle={{flex: 1}}
                    />
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setVisible(false), setEmail(''), setOtp('');
                      }}
                      buttonStyle={{borderColor: 'rgba(78, 116, 289, 1)'}}
                      type="outline"
                      titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
                      containerStyle={{flex: 1}}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: ColorsConstant.Orange,
                      textAlign: 'center',
                      fontSize: 16,
                      padding: 20,
                    }}
                    key={errorMessage + 'errmsg'}>
                    {errorMessage}
                  </Text>
                  <Button
                    title="OK"
                    onPress={() => {
                      setVisible(false);
                    }}
                    buttonStyle={{borderColor: 'rgba(78, 116, 289, 1)'}}
                    type="outline"
                    titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
                    containerStyle={{
                      width: 200,
                      marginHorizontal: 50,
                      marginVertical: 10,
                    }}
                  />
                </>
              )}
            </View>
          </Modal>

          {/* OTP Modal */}
          <Modal
            visible={otpModalVisible}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 20,
                margin: 30,
                backgroundColor: 'white',
                minWidth: 300,
              }}>
              <TextInput
                style={[styles.createRoomInput]}
                placeholder={'Enter OTP'}
                placeholderTextColor={'gray'}
                value={otp}
                inputMode="numeric"
                onChangeText={text => setOtp(text)}
              />
              <View style={{flexDirection: 'row', gap: 20, marginTop: 30}}>
                <Button
                  title="OK"
                  onPress={verifyOtp}
                  buttonStyle={{borderColor: ColorsConstant.Theme}}
                  loading={otpLoading}
                  titleStyle={{color: ColorsConstant.White}}
                  containerStyle={{flex: 1}}
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setOtpModalVisible(false), setEmail(''), setOtp('');
                  }}
                  buttonStyle={{borderColor: 'rgba(78, 116, 289, 1)'}}
                  type="outline"
                  titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
                  containerStyle={{flex: 1}}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export function MyTabBar({
  state,
  descriptors,
  navigation,
  imgNeeded,
  width,
  isEdu,
}) {
  return (
    <View
      style={[
        styles.topbar,
        {flexDirection: 'row', backgroundColor: '#fff', padding: 10},
        width && {width: width + '%'},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        let src = require('../../assets/img/roomsimgs.png');
        if (index === 0) {
          src = require('../../assets/img/explore.png');
        }

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            style={{flex: 1}}>
            <View style={[styles.tabBarLabelHolder]}>
              {imgNeeded && (
                <Image
                  style={{
                    width: isEdu ? 28 : 20,
                    height: isEdu ? 28 : 20,
                    tintColor: isFocused ? ColorsConstant.Theme : '#999',
                  }}
                  source={src}
                />
              )}
              <Text
                style={{
                  color: isFocused ? ColorsConstant.Theme : '#444',
                  fontSize: isEdu ? 18 : 14,
                  fontWeight: isEdu ? 'bold' : 'normal',
                  marginTop: 4,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
