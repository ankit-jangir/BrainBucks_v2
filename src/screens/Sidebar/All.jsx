import { StyleSheet, View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import HistoryApiService from '../../services/api/HistoryApiService';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
import { useQuiz } from '../../context/QuizPlayReducer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const All = ({ navigation, order }) => {
  const [allwin, setAllWin] = React.useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const {quizState,dispatch} = useQuiz();

  const history = new HistoryApiService()

  async function getAllHistory(page) {
    let total = totalPages;
    if (!page) {
      page = 1
      setTotalPages(2)
      total = 2
    }

    if (page > total) {
      return
    }


    try {
      if (page === 1) {
        setLoading(true)
      }
      else {
        setLoadingMore(true)
      }
      let res = await history.getFullHistory(order, page);
      if (res.status === 1) {
        setAllWin(res.properquizes)
        setTotalPages(res.totalpages)
        setCurrentPage(page)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting earned data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading(false);
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    getAllHistory()
  }, [order])


  return (
    <View style={styles.mainContainer}>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      {
        loading ?
          <ActivityIndicator size={40} />
          :
          allwin.length === 0 ?
            <NoDataFound message={"No Quiz Played Yet"} />
            :
            <FlatList
              onEndReached={() => { getAllHistory(currentPage + 1) }}
              onEndReachedThreshold={0.6}
              data={allwin}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => {
                return (
                  <QuizCard
                    title={item.quiz_name}
                    prize={item.is_active ? item.prize : item.reward}
                    type={item.is_active ? 'active' : 'trivia'}
                    minper={item.min_reward_per}
                    totalslots={item.slots}
                    alotedslots={item.slot_aloted}
                    image={{ uri: BLOBURL + item.banner }}
                    fees={item.entryFees}
                    date={item.sch_time}
                    onPress={() => {
                      dispatch({type:'change',state:{id:item._id}})
                      item.is_active ? navigation.navigate("QuizzesResult") : navigation.navigate("resultreward")
                    }}
                    btntxt={"View Result"}
                  />)
              }}
            />
      }
      {loadingMore && <ActivityIndicator size={25} style={{ height: 30 }} />}
    </View>
  );
};

export default All;
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
    fontWeight: '600',
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
    fontFamily: "Inter"

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
    fontFamily: "Inter"

  },
  progress: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    borderColor: "#367CFF",
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonTitle: {
    color: "#367CFF",
    fontFamily: "Inter"

  },
});
