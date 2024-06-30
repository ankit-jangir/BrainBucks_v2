import React, {useState, useEffect, useRef} from 'react';
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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from '../../utils/Translate';
import styles from '../Quizzes/FreeTriviaStarExam.styles';

const Tab = createMaterialTopTabNavigator();

export default function FreeTriviaStarExam({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);

  const rules = [
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
          <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.InsufficientTouchable1}>
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
            <View style={{flex: 6, flexDirection: 'row'}}>
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
          </View>
        </View>
        <View style={{ flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',}}>
          <Image
            source={require('../../assets/img/cup.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
          <View style={{ alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,}}>
            <Text
              style={{
                color: '#C922E4',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 16,
              }}>
              99 %
            </Text>
          </View>
        </View>
        <View style={styles.TotalSlotsVi2}>
          <View style={styles.TotalSlotsVi3}>
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
        <View style={styles.StartExamV}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FreeRulesParticipation')}
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
                fontSize: 14,
                fontFamily: 'WorkSans-Medium',
              }}>
              Participate Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={{color:'#000',fontFamily:'inter', fontWeight: 'bold',textAlign: 'center',marginTop:10}}>Rules of Participation</Text>
      <ScrollView style={{ flex: 1, }}>
        {rules.length < 1 ?
          <ActivityIndicator size={34} color={'#000'} style={styles.TriviaRulesActivity} />
          :
          rules.map((item, index) => {
            return (
              <RulesView id={index} item={item} />
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const RulesView = (props,index) => {
    return (
      <View style={styles.FeesV9}>
        <View style={{ flex: 0.10, }}>
          <Text style={styles.FeesText3}>1</Text>
        </View>
        <View style={{ flex: 0.90 }}>
          <Text style={styles.FeesText3}>{props.item.name}</Text>
        </View>
      </View>
    )
  }