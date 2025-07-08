import {
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SavedApiService from '../../services/api/SavedApiService';
import { useCurrentId } from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { BLOBURL } from '../../config/urls';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';

const FreeTrivia = () => {
  const navigation = useNavigation()
  const saved = new SavedApiService();

  const { idState, dispatch } = useCurrentId();
  const [loading, setLoading] = useState(false);
  const [LoadingMore, setLoadingMore] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [trivia, setTrivia] = useState([]);

  const isFocused = useIsFocused()

  useEffect(() => {
    getTriviaQuizzes();
  }, [isFocused]);

  async function getTriviaQuizzes(page) {
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
      let res = await saved.getTriviaQuizzes(idState.id, page);
      if (res.status === 1) {
        setTotalPages(res.totalpages)
        if (page === 1) { setTrivia(res.trivia_quizes) }
        else { setTrivia([...trivia, ...res.trivia_quizes]) }
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
      <View style={{ backgroundColor: 'white', padding: 10 }}>

        <FlatList
          ListEmptyComponent={() =>
          (<NoDataFound
            scale={0.8}
            message={'No Quizzes Found'}
          />)
          }
          maxToRenderPerBatch={7}
          data={trivia}
          onRefresh={() => { getTriviaQuizzes() }}
          refreshing={loading}
          onEndReached={() => { getTriviaQuizzes(currentPage + 1) }}
          onEndReachedThreshold={0.6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <QuizCard
                title={item.quiz_name}
                image={{ uri: BLOBURL + item.banner }}
                prize={item.reward}
                date={item.sch_time}
                time={item.sch_time}
                totalslots={item.slots}
                alotedslots={item.slot_aloted}
                minper={item.min_reward_per}
                type={'trivia'}
                onPress={() => {
                  navigation.navigate('FreeRulesParticipation', { id: item._id })
                }}
              />
            )
          }}
        />
        {LoadingMore && <ActivityIndicator size={30} style={{ height: 60 }} />}

      </View>
    </View>
  );
};

export default FreeTrivia;
