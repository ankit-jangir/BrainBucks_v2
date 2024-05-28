import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/InsideLobby.styles';

export default function InsideLobby({ navigation }) {
  const [timerCount, setTimer] = useState();

  return (
    <View style={StyleConstants.safeArView}>
      <View style={styles.viewWelcome}>
        <Text style={styles.textWel}>Welcome to</Text>
      </View>
      <View style={styles.qview}>
        <View style={styles.qview1}>
          <View style={styles.qview2}>
            <Image source={require('../../assets/img/image.png')} resizeMode='contain' style={{ width: 25, height: 25 }} />
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.textTit}>SBI-PO Current Affairs</Text>
          </View>
        </View>
      </View>

      <View style={styles.Pview}>
        <View style={styles.Pview1}>
          <Text style={styles.textP}>Participants Joined</Text>
          <View style={styles.viewJ}>
            <Text style={styles.textj}>888/</Text>
            <Text style={[styles.textj, { color: '#333333' }]}>900</Text>
          </View>
        </View>
      </View>

      <View style={styles.Doview}>
        <View style={styles.Doview1}>
          <Text style={styles.textDo}>Do not close or Refresh this window</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <LottieView
          autoPlay
          style={styles.lview}
          source={require('../../assets/img/cycle.json')}
        />
      </View>
      <View style={styles.Eview}>
        <TouchableOpacity onPress={() => navigation.navigate('ActiveQuizzJoinAnimation')} style={{ width: '80%' }}>
          <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.6, y: 2.0 }} colors={['#54ACFD', '#2289E7']} style={styles.Etouch}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textExam}>Exam Start in </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
