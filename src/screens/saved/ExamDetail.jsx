import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, TextInput} from '../../utils/Translate';
import {StyleConstants} from '../../constants/Style.constant';
import StudyExam from '../Study/StudyExam';
import Quizze from './Quizze';
import Challenges from './Challenges';
import FreeTrivia from './FreeTrivia';
import styles from '../../styles/Saved.styles';
import LinearGradient from 'react-native-linear-gradient';
import StudyMaterials from '../Study/StudyMaterials';




const Tab = createMaterialTopTabNavigator();

export default function ExamDetail({navigation, route}) {
  return (
    <>
      <View style={StyleConstants.safeArView}>
        <View style={styles.Hview}>
          <View style={styles.Hview1}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.THead}>
              <Image
                source={require('../../assets/img/arrows.png')}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <View style={styles.ViewMy}>
              <Text style={styles.TextMy}>My Exams</Text>
            </View>
          </View>
        </View>
            <View style={{alignItems: 'center',flex:0.6}}>
              <View style={styles.liveVIew}>
                <View style={styles.liveVIew1}>
                  <View style={styles.liveVIew2}>
                    <View style={styles.cateView}>
                      <Image
                        source={require('../../assets/img/banner.png')}
                        style={{height: 50, width: 50,borderRadius:100}}></Image>
                    </View>
                    <View style={styles.cateName}>
                      <Text style={styles.cateName1}>uuu</Text>
                    </View>
                  </View>
                  <View style={styles.ActiveView}>
                    <View style={styles.ActiveView1}>
                      <View style={{flex: 0.7}}>
                        <View style={styles.ActiveView2}>
                          <Text style={styles.textAct}>Active Quizzes </Text>
                          <Text style={[styles.textAct, {color: '#367CFF'}]}>
                            88
                          </Text>
                        </View>
                      </View>
                      <View style={{flex: 0.8}}>
                        <View style={styles.Cview}>
                          <Text style={styles.textC}>Challenges </Text>
                          <Text
                            style={[
                              styles.textC,
                              {fontFamily: 'WorkSans-SemiBold'},
                            ]}>
                            Active
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.textP}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.textPro}>
                        Probability of Success{' '}
                      </Text>
                      <Text style={styles.textPer}>00%</Text>
                    </View>
                    <View style={styles.LiniView}>
                      <LinearGradient
                        start={{x: 0.0, y: 0.25}}
                        end={{x: 0.5, y: 1.0}}
                        colors={['#F5B807', '#F5B807']}
                        style={styles.Grade}></LinearGradient>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ExamDetail')}
                    style={styles.viewBtn}>
                    <Text style={styles.textDetails}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

        <View style={styles.RView} >
      <Tab.Navigator style={{}} screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarLabelStyle: { fontSize: 12, textTransform: "none", },
        tabBarStyle: { width: "100%", },
        tabBarIndicatorStyle: { backgroundColor: "#000000", },
      }} >
        <Tab.Screen name="Quizze">{(props) => <Quizze/>}</Tab.Screen>
        <Tab.Screen name="Free Trivia">{(props) => <FreeTrivia/>}</Tab.Screen>
        <Tab.Screen name="MyQuizzes">{(props) => <Challenges/>}</Tab.Screen>
        <Tab.Screen name="Study">{(props) => <StudyMaterials/>}</Tab.Screen>
      </Tab.Navigator>
    </View>

      </View>
    </>
  );
}

