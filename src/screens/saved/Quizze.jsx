import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';
import SavedApiService from '../../services/api/SavedApiService';
import { useCurrentId } from '../../context/IdReducer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';

const Quizze = () => {
  const saved = new SavedApiService();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState();
  const { idState, dispatch } = useCurrentId();
  const [Quizes, setQuizze] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const navigation = useNavigation()

  const isFocused = useIsFocused()

  useEffect(() => {
    getActiveQuizzes();
  }, [isFocused]);

  async function getActiveQuizzes(page) {
    if (!page) {
      page = 1
    }

    if (page > totalPages) {
      return;
    }

    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true)
    }

    try {
      let res = await saved.getActiveQuizzes(idState.id, page);
      if (res.status === 1) {
        setTotalPages(res.totalpages)
        if (page === 1) { setQuizze(res.active_quizes) }
        else { setQuizze([...Quizes, ...res.active_quizes]) }
        setCurrentPage(page)
      } else {
         ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
    } finally {
      setLoadingMore(false)
      setLoading(false)
    }
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
        <FlatList
          ListEmptyComponent={() => (
            <NoDataFound
              scale={0.8}
              message={'No Data Found'}
            />
          )}
          data={Quizes}
          refreshing={loading}
          onRefresh={() => getActiveQuizzes()}
          onEndReached={() => { getActiveQuizzes(currentPage + 1) }}
          onEndReachedThreshold={0.6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <QuizCard
                title={item.quiz_name}
                image={{ uri: BLOBURL + item.banner }}
                fees={item.entryFees}
                prize={item.prize}
                date={item.sch_time}
                time={item.sch_time}
                totalslots={item.slots}
                alotedslots={item.slot_aloted}
                type={'active'}
                onPress={() => { navigation.navigate('QuizDetails', { id: item._id }); }}
              />
            )
          }}
        />
        {loadingMore && <ActivityIndicator size={30} style={{ height: 60 }} />}
      </View>
    </View>
  );
};

export default Quizze;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  title: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: '600',
  },
  feeAndDateRow: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
    paddingLeft: 6,
    fontWeight: '500',
  },
  feeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  feeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  date: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 5,
  },
  prizeAndDateRow: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  prizeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
    paddingLeft: 6,
    fontWeight: '500',
  },
  prizeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  prizeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  iconImageSmall: {
    width: 17,
    height: 17,
  },
  earningContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  dollarImage: {
    width: 25,
    height: 25,
  },
  earningAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  earningAmountBlue: {
    color: '#2188E7',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
  },
  earningAmount: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 13,
  },
  progressBarContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
});
