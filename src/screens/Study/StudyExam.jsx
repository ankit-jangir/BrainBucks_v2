import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
// import { Text } from '../../../Translate';
import styles from '../../styles/Study.styles';

export default function StudyExam({route, navigation}) {
  const [refresh, setRefresh] = useState(false);

  const studymaterial = [
    {
      exam: 'SBI-PO',
      image: require('../../assets/img/sbi.png'),
    },
    {
      exam: 'SBI-PO',
      image: require('../../assets/img/sbi.png'),
    },
    {
      exam: 'SBI-PO',
      image: require('../../assets/img/sbi.png'),
    },
    {
      exam: 'SBI-PO',
      image: require('../../assets/img/sbi.png'),
    },
  ];

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{width: 45, height: 45, margin: 10}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000010',
          }}>
          <Image
            source={require('../../assets/img/arrows.png')}
            style={styles.ExamSaveImg}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontFamily: 'WorkSans-SemiBold',
            fontSize: 24,
            color: '#2E2E2E',
            textAlign: 'center',
          }}>
          {' '}
          Exams Successfully Added
        </Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
          }}
          source={require('../../assets/img/vito-englishvit.json')}
        />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          paddingHorizontal: 50,
        }}>
        <Text
          style={{
            fontFamily: 'WorkSans-SemiBold',
            fontSize: 16,
            color: '#2E2E2E',
            textAlign: 'center',
          }}>
          Now you can participate in Quizzes from following Exams
        </Text>
      </View>
      <View style={{flex: 1, paddingHorizontal: 40, marginTop: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          {studymaterial.map(item => {
            return (
              <TouchableOpacity style={styles.ExamSaveTouchable}>
                <View style={styles.ExamSaveV}>
                  <View style={styles.ExamSaveV1}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.ExamSaveImg}
                    />
                  </View>
                  <View style={styles.ExamSaveV2}>
                    <Text style={styles.ExamSaveText}>{item.exam}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
