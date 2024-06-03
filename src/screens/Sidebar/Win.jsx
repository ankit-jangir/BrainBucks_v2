import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import HistoryApiService from '../../services/api/HistoryApiService';
import BasicServices from '../../services/BasicServices';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Win = ({ navigation, order }) => {
  const [won, setWon] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)

  const history = new HistoryApiService()

  useEffect(() => {
    getWonQuizzes()
  }, [order])

  function helper(page) {
    return async () => {
      let res = await history.getWonQuizzes(order, page)
      return res
    }
  }

  async function getWonQuizzes(page) {
    let total = totalPages;
    if (!page) {
      page = 1
      setTotalPages(2)
      total=2
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
        setWon(res.subActiveQuizz)
        setTotalPages(res.totalpages)
      setCurrentPage(page)
    }
  }


  return (
    <>
      <View style={{ zIndex: 200 }}><Toast /></View>

      <View style={styles.mainContainer}>
        {
          loading
            ?
            <ActivityIndicator size={40} />
            :
            won.length === 0
              ?
              <NoDataFound message={"No Data Found"} action={getWonQuizzes} actionText={"Refresh"} />
              :
              <FlatList
                onEndReached={() => { getWonQuizzes(currentPage + 1) }}
                onEndReachedThreshold={0.6}
                data={won}
                keyExtractor={(item) => item._id.toString()}
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
                        navigation.navigate("resultreward")
                      }
                      }
                      btntxt={"View Result"}

                    />)
                }
                }
              />
        }
        {loadingMore && <ActivityIndicator size={25} style={{ height: 30 }} />}
      </View>
    </>
  );
};

export default Win;

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
