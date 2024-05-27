import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import styles from '../../styles/AllLiveQuizzes.styles';

export default function AllLiveQuizzes({navigation}) {
  const [live, setLive] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };

  const DATA = [
    {
      id: '1',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    {
      id: '3',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    {
      id: '4',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988/88',
    },
    // Add more items as needed
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../assets/img/arrows.png')}
                resizeMode="contain"
                style={styles.backButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Live Quizzes</Text>
            </View>
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          {DATA.map(item => (
            <LiveQuizz key={item.id} item={item} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const LiveQuizz = (props) => {
  return (
    <View style={styles.quizContainer}>
      <View style={styles.quizHeader}>
        <Image
          source={require('../../assets/img/banner.png')}
          style={styles.quizImage}
        />
        <Text style={styles.quizTitle}>SBI-PO Current Affairs</Text>
      </View>

      <View style={styles.quizDetails}>
        <View style={styles.quizDetailItem}>
          <Text style={styles.quizDetailLabel}>Fees</Text>
          <View style={styles.quizDetailValueContainer}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={styles.coinImage}
            />
            <Text style={styles.coinText}>99</Text>
          </View>
        </View>
        <View style={styles.quizDetailItem}>
          <Image
            source={require('../../assets/img/time2.png')}
            resizeMode="contain"
            tintColor="rgba(138, 138, 138, 1)"
            style={styles.timeImage}
          />
          <Text style={styles.timeText}>12/10/2002</Text>
        </View>
      </View>

      <View style={styles.quizDetails}>
        <View style={styles.quizDetailItem}>
          <Text style={styles.quizDetailLabel}>Prize</Text>
          <View style={styles.quizDetailValueContainer}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={styles.coinImage}
            />
            <Text style={styles.coinText}>99</Text>
          </View>
        </View>
        <View style={styles.quizDetailItem}>
          <Image
            source={require('../../assets/img/calendar.png')}
            resizeMode="contain"
            tintColor="rgba(138, 138, 138, 1)"
            style={styles.calendarImage}
          />
          <Text style={styles.calendarText}>12/10/2002</Text>
        </View>
      </View>

      <View style={styles.earningContainer}>
        <Image
          source={require('../../assets/img/dollar.png')}
          resizeMode="contain"
          style={styles.dollarImage}
        />
        <View style={styles.earningTextContainer}>
          <Text style={styles.earningPrimaryText}>988/</Text>
          <Text style={styles.earningSecondaryText}>88</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 10}}
            colors={['#54ACFD', '#2289E7']}
            style={styles.progressBar}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerButtonContainer}
        onPress={() => {
            props.navigation.navigate('RulesofParticipation');
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.6, y: 2.0}}
          colors={['#54ACFD', '#2289E7']}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
