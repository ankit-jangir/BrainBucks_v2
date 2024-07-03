import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
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
      <SafeAreaView style={StyleConstants.safeArView}>
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
           

      <View style={styles.RView} >
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarLabelStyle: { fontSize: 12, textTransform: "none", },
        tabBarStyle: { width: "100%", },
        tabBarIndicatorStyle: { backgroundColor: "#000000", },
      }} >
        <Tab.Screen name="Quizze">{(props) => <Quizze {...props}/>}</Tab.Screen>
        <Tab.Screen name="Free Trivia">{(props) => <FreeTrivia {...props}/>}</Tab.Screen>
        <Tab.Screen name="MyQuizzes">{(props) => <Challenges {...props}/>}</Tab.Screen>
        {/* <Tab.Screen name="Study">{(props) => <StudyMaterials {...props}/>}</Tab.Screen> */}
      </Tab.Navigator>
    </View>

      </SafeAreaView>

  );
}

