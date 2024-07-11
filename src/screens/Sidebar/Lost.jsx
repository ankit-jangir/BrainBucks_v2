import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearProgress, Button } from '@rneui/themed';
import HistoryApiService from '../../services/api/HistoryApiService';
import BasicServices from '../../services/BasicServices';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { useQuiz } from '../../context/QuizPlayReducer';


const Lost = ({ navigation, order }) => {
  const [lost, setLost] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const { quizState, dispatch } = useQuiz();


  const history = new HistoryApiService()

  useEffect(() => {
    getLostQuizzes()
  }, [order])

  function helper(page) {
    return async () => {
      let res = await history.getLostQuizzes(order, page)
      return res
    }
  }

  async function getLostQuizzes(page) {
    let total = totalPages;
    if (!page) {
      page = 1
      setTotalPages(2)
      total = 2
    }

    if (page > total) {
      return
    }

    let func = setLoadingMore
    if (page === 1) {
      func = setLoading
    }

    let res = await BasicServices.apiTryCatch(helper(page), Toast, () => { func(true) }, () => { func(false) })
    if (res) {
      setLost(res.subActiveQuizz)
      setTotalPages(res.totalpages)
      setCurrentPage(page)
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{ zIndex: 200 }}><Toast /></View>
      {
        loading
          ?
          <ActivityIndicator size={40} />
          :
          lost.length === 0
            ?
            <NoDataFound message={"No Data Found"} action={() => { getLostQuizzes() }} actionText={"Refresh"} />
            :
            <FlatList
              refreshing={loading}
              onRefresh={() => getLostQuizzes()}
              onEndReached={() => { getLostQuizzes(currentPage + 1) }}
              onEndReachedThreshold={0.6}
              data={lost}
              keyExtractor={(item) => "lost" + item._id}
              renderItem={({ item }) => {
                return (
                  <QuizCard
                    title={item.quiz_name}
                    prize={item.prize}
                    type={'active'}
                    minper={item.min_reward_per}
                    totalslots={item.slots}
                    alotedslots={item.slot_aloted}
                    image={{ uri: BLOBURL + item.banner }}
                    fees={item.entryFees}
                    date={item.sch_time}
                    onPress={() => {
                      if (item.is_res_dec) {
                        dispatch({ type: 'change', state: { id: item._id } })
                        navigation.navigate("RoomsResult")
                      }
                    }
                    }
                    btntxt={item.is_res_dec ? "View Result" : item.crontab_result_time}

                  />)
              }
              }
            />
      }
      {loadingMore && <ActivityIndicator size={25} style={{ height: 30 }} />}

    </View >
  );
};

export default Lost

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    elevation: 3,
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainImage: {
    width: screenWidth * 0.10,
    height: screenWidth * 0.10,
  },
  textTitle: {
    marginLeft: screenWidth * 0.03,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: "Inter",
    color: "#2E2E2E"

  },
  containerImg12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,

  },
  containerImg122: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'lightgray',
    fontFamily: "Inter"
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  highlightedText: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: screenWidth * 0.02,
    color: '#F5B807',
    fontFamily: "Inter"

  },
  containerImg1222: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIcon: {
    width: 20,
    height: 20,
  },
  dateText: {
    paddingLeft: 8,
    fontFamily: "Inter",
    color: 'lightgray',
    fontWeight: '600'

  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  scoreText: {
    paddingLeft: 5,
    fontFamily: "Inter",
    color: '#2188E7'

  },
  scoreText: {
    paddingLeft: 5,
    fontFamily: "Inter",
    color: '#2188E7',
    fontWeight: '700'
  },
  scoreText1: {
    paddingLeft: 5,
    fontFamily: "Inter",
    color: '#000',
    fontWeight: '700'
  },
  progress: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    borderColor: "#54ACFD",
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonTitle: {
    color: "#54ACFD",
    fontFamily: "Inter"

  },
});
