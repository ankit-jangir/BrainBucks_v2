import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../../utils/Translate';
import styles from '../../styles/AllLiveQuizzes.styles';
import Header from '../Home/Header';
import SavedApiService from '../../services/api/SavedApiService';
import basic from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
export default function MyExamQuizzes({ navigation, route }) {
  const [live, setLive] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const id = route.params.id
  const image = route.params.imgurl
  const title = route.params.title
  const serv = new SavedApiService()
  const [loading, setLoading] = useState(false)

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };


  useEffect(() => {
    getExamQuizzes()
  }, [])

  function getExamQuizHelper(id) {
    return async () => {
      let res = await serv.getActiveQuizzes(id)
      return res
    }
  }
  async function getExamQuizzes() {
    let res = await basic.apiTryCatch(getExamQuizHelper(id), Toast, ()=>{setLoading(true)}, ()=>{setLoading(false)})
    if (res) {
      setLive(res.active_quizes)
    }
  }

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
      <View style={{ zIndex: 200 }}><Toast /></View>
      <View style={styles.container}>
        <Header
          title="My Exam Quizzes"
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/arrow-left.png'), // provide the image source
            onPress: () => {
              navigation.goBack()
            },
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
          <Image source={{ uri: BLOBURL + image }} style={{ width: 35, height: 35 }} />
          <Text style={{ color: '#000', fontFamily: 'WorkSans-SemiBold', marginLeft: 10, fontSize: 20 }}>{title}</Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          {
            loading ?
              <ActivityIndicator size={40} style={{ flex: 1 }} />
              :
              live.map(item => (
                <QuizCard
                  key={item._id}
                  image={{ uri: BLOBURL + item.banner }}
                  title={item.quiz_name}
                  fees={item.entryFees}
                  prize={item.prize}
                  date={item.sch_time}
                  totalslots={item.slots}
                  alotedslots={item.slot_aloted}
                  type={'active'}
                  onPress={() => {
                    navigation.navigate('RulesofParticipation', { id: item._id });
                  }}
                />
              ))}
        </ScrollView>
      </View>
    </>
  );
}

const ExamDetail = (props) => {
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
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 10 }}
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
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.6, y: 2.0 }}
          colors={['#54ACFD', '#2289E7']}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
