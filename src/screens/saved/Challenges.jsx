import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SavedApiService from '../../services/api/SavedApiService';
import { useCurrentId } from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useQuiz } from '../../context/QuizPlayReducer';

const Challenges = () => {
  const navigation = useNavigation()
  const saved = new SavedApiService();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState();

  const [Enrolled, setEnrolled] = useState([]);
  const { idState, context } = useCurrentId();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)

  const isFocused = useIsFocused()

  const { quizState, dispatch } = useQuiz()

  useEffect(() => {
    getEnrolledQuizzes();
  }, [isFocused]);

  async function getEnrolledQuizzes(page) {
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

      let res = await saved.getEnrolledQuizzes(idState.id, page);
      if (res.status === 1) {
        setTotalPages(res.totalpages)
        if (page === 1) { setEnrolled(res.enrolled_quizes) }
        else { setEnrolled([...Enrolled, ...res.enrolled_quizes]) }
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      {
        <FlatList
          ListEmptyComponent={
            () =>
            (
              <NoDataFound
               scale={0.8}
                message={'Enroll in a quiz to see here'}
              />
            )
          }
          data={Enrolled}
          onRefresh={() => { getEnrolledQuizzes() }}
          refreshing={loading}
          onEndReached={() => { getEnrolledQuizzes(currentPage + 1) }}
          onEndReachedThreshold={0.6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <QuizCard
                key={item._id}
                title={item.quiz_name}
                image={{ uri: BLOBURL + item.banner }}
                prize={item.reward}
                date={item.sch_time}
                time={item.sch_time}
                totalslots={item.slots}
                alotedslots={item.slot_aloted}
                type={'enrolled'}
                onPress={() => {
                  dispatch({ type: 'change', state: { id: item._id } })
                  navigation.navigate('StartExam', { id: item._id });
                }}
              />
            )
          }}
        />
      }
      {loadingMore && <ActivityIndicator size={30} style={{ height: 60 }} />}
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({});
