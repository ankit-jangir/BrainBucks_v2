import React, {useState, useEffect, useRef} from 'react';
import Particpants from './Particpants';
import Rewards from './Rewards';
import Rules from './Rules';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  ImageBackground,
  Share,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from '../../utils/Translate';
import styles from '../../styles/StartExam.styles';

const Tab = createMaterialTopTabNavigator();

export default function StartExam({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);

  const rewards = [
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
  ];
  const particpants = [
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
  ];
  const rulesList = [
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
    {
      name: 'ocjbb',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{width: '100%', height: 150}}>
        <ImageBackground
          source={require('../../assets/img/banner.png')}
          style={{flex: 1}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}
            style={styles.InsufficientTouchable1}>
            <Image
              source={require('../../assets/img/arrows.png')}
              tintColor={'#fff'}
              style={styles.EnteryImg}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.InsufficientV3}>
        <View style={styles.InsufficientV4}>
          <View style={styles.InsufficientV5}>
            <Image
              source={require('../../assets/img/banner.png')}
              resizeMode="contain"
              style={styles.categoryImage}
            />
          </View>
          <View style={styles.categoryView}>
            <Text
              style={[styles.categoryText, {marginTop: 10, color: '#8A8A8A'}]}>
              category_name
            </Text>
          </View>
        </View>
        <View style={styles.EnteryV}>
          <View style={styles.EnteryV1}>
            <View style={{flex: 6}}>
              <View style={styles.EnteryFeesVi}>
                <Text style={styles.EnteryFeesText}>Fees</Text>
                <View style={styles.EnteryV2}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.EnteryImg}
                  />
                  <Text style={styles.EnteryFeesBText}>8765</Text>
                </View>
              </View>
              <View style={styles.EnteryV3}>
                <Text style={styles.EnteryFeesText}>Prize</Text>
                <View style={styles.EnteryV2}>
                  <Image
                    source={require('../../assets/img/bbcoin.png')}
                    style={styles.EnteryImg}
                  />
                  <Text style={styles.EnteryFeesBText}>656</Text>
                </View>
              </View> 
            </View>
            <View style={styles.DateV}>
              <View style={styles.DateV1}>
                <Image
                  source={require('../../assets/img/time2.png')}
                  tintColor={'#8A8A8A'}
                  style={styles.EnteryImg}
                />
                <Text style={styles.DateText}>12.22.222</Text>
              </View>
              <View style={styles.DateV1}>
                <Image
                  source={require('../../assets/img/calendar.png')}
                  tintColor={'#8A8A8A'}
                  style={styles.EnteryImg}
                />
                <Text style={styles.DateText}>12.2.22.22</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.TotalSlotsVi}>
          <Image
            source={require('../../assets/img/dollar.png')}
            resizeMode="contain"
            style={styles.DateImg}
          />
          <View style={styles.TotalSlotsVi1}>
            <Text style={styles.TotalSlotsBtext}>98/</Text>
            <Text style={[styles.TotalSlotsBtext, {color: '#333333'}]}>
              987
            </Text>
          </View>
        </View>
        <View style={styles.TotalSlotsVi2}>
          <View style={styles.TotalSlotsVi3}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={['#54ACFD', '#2289E7']}
              style={{borderRadius: 8, height: 10}}></LinearGradient>
          </View>
        </View>
        <View style={styles.StartExamV}>
          <TouchableOpacity  onPress={() => {
                  navigation.navigate('InsideLobby')
                }} style={{width: '80%'}}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 2.0}}
              colors={['#54ACFD', '#2289E7']}
              style={styles.StartExamLiner}>
              <Text style={styles.LobbtText}>Join Now</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '15%',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#51C386',
              borderRadius: 5,
            }}>
            <Image
              source={require('../../assets/img/whatsapp.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <Roomsrules
          rulesList={rulesList}
          particpants={particpants}
          rewards={rewards}
        />
      </View>
    </View>
  );
}

const Roomsrules = ({particpants, rewards, rulesList}) => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        style={{flex: 1}}
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: {fontSize: 16, textTransform: 'none'},
          tabBarStyle: {
            width: '100%',
            elevation: 0,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#E2E2E2',
          },
          tabBarIndicatorStyle: {backgroundColor: '#000000'},
        }}>
        <Tab.Screen name="Participants">
          {props => (
            <Particpants {...props} particpants={particpants}></Particpants>
          )}
        </Tab.Screen>
        <Tab.Screen name="Rewards">
          {props => <Rewards {...props} rewards={rewards}></Rewards>}
        </Tab.Screen>
        <Tab.Screen name="Rules">
          {props => <Rules {...props} rulesList={rulesList}></Rules>}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
