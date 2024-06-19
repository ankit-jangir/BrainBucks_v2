import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import styles from '../../styles/AllLiveQuizzes.styles';
import BasicServices from '../../services/BasicServices';
import HomeApiService from '../../services/api/HomeApiService';
import Toast from 'react-native-toast-message';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';

export default function AllLiveQuizzes({ navigation, route }) {
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [data, setData] = useState([])
  const serv = new HomeApiService()
  const type = route.params.type;

  const onRefresh = () => {
    getData()
  };

  useEffect(() => {
    getData()
  }, [])

  function getDataHelper(page) {
    return async () => {
      let res;
      if (type === 'active') {
        res = await serv.getActiveQuizes(page)
      }
      else if (type === 'trivia') {
        res = await serv.getTriviaQuizes(page)
      }
      else {
        res = await serv.getEnrolledQuizes(page)
      }
      return res;
    }
  }

  async function getData(page) {
    if (!page) {
      page = 1
    }
    if (page <= totalPages) {
      setCurrentPage(page)
      let func = setLoadingMore
      if (page===1){
        func = setLoading
      }
      let res = await BasicServices.apiTryCatch(getDataHelper(page), Toast, () => { func(true) }, () => { func(false) })
      if (res) {
        setTotalPages(res.totalpages)
        if (type === 'trivia') {
          if (page === 1)
            setData(res.triviaquizes)
          else
            setData([...data, ...res.triviaquizes])
        }
        else if (type === 'active') {
          if (page === 1)
            setData(res.activequizes)
          else
            setData([...data, ...res.activequizes])
        }
        else {
          if (page === 1)
            setData(res.enrolledquizes)
          else
            setData([...data, ...res.enrolledquizes])
        }
      }
    }

  }




  function handlePress(id) {
    if (type === 'trivia') {
      navigation.navigate('FreeRulesParticipation', { id: id })
    } else if (type === 'active') {
      navigation.navigate('RulesofParticipation', { id: id })
    } else {
      navigation.navigate('StartExam', { id: id });
    }
  }


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
              <Text style={styles.headerTitle}>{type === 'trivia' ? "All Trivia Quizes" : type === 'enrolled' ? "All Enrolled Quizzes" : "All Live Quizzes"}</Text>
            </View>
          </View>
        </View>

          {
          loading ?<ActivityIndicator size={40} style={{ flex: 1 }} />
          :
            data.length === 0
              ?
                <NoDataFound message={"No Quizzes Found"} action={getData} actionText={"Reload"} />
              :
              <FlatList
                onEndReachedThreshold={0.8}
                onEndReached={() => { getData(currentPage + 1) }}
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                data={data}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => (
                  <QuizCard
                    key={item._id}
                    onPress={() => { handlePress(item._id) }}
                    image={{ uri: BLOBURL + item.banner }}
                    title={item.quiz_name}
                    fees={item.entryFees}
                    prize={type === 'trivia' ? item.reward : item.prize}
                    date={item.sch_time}
                    totalslots={item.slots}
                    alotedslots={item.slot_aloted}
                    type={type}
                    minper={item.min_reward_per}
                  />
                )}
              />
          }
          {loadingMore && <ActivityIndicator size={30} style={{height:60}}/>}
      </View>
    </>
  );
}