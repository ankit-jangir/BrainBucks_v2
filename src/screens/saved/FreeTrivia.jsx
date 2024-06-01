import {
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SavedApiService from '../../services/api/SavedApiService';
import {useCurrentId} from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
import {BLOBURL} from '../../config/urls';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';

const FreeTrivia = () => {
  const saved = new SavedApiService();

  const {idState, dispatch} = useCurrentId();
  const [loading, setloading] = useState();
  const [trivia, setTrivia] = useState([]);

  useEffect(() => {
    getTriviaQuizzes();
  }, []);

  async function getTriviaQuizzes() {
    setloading(true);

    try {
      let res = await saved.getTriviaQuizzes(idState.id);
      if (res.status === 1) {
        setTrivia(res.trivia_quizes);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setloading(false);
    }
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{zIndex:1}}>
        <Toast />
      </View>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
          {loading ? (
            <ActivityIndicator color={ColorsConstant.Theme} size={35} />
          ) : trivia.length === 0 ? (
            <NoDataFound
              message={'No Data Found'}
              action={getTriviaQuizzes}
              actionText={'Reload'}
            />
          ) : (
            trivia.map(res => {
              return (
                  <QuizCard
                    key={res._id}
                    title={res.quiz_name}
                    image={{uri: BLOBURL + res.banner}}
                    prize={res.reward}
                    date={res.sch_time}
                    time={res.sch_time}
                    totalslots={res.slots}
                    alotedslots={res.slot_aloted}
                    minper={res.min_reward_per}
                    type={'trivia'}
                    onPress={() => {}}
                  />
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FreeTrivia;
