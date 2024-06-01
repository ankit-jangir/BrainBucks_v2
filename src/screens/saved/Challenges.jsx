import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SavedApiService from '../../services/api/SavedApiService';
import {useCurrentId} from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { useNavigation } from '@react-navigation/native';

const Challenges = () => {
  const navigation = useNavigation()
  const saved = new SavedApiService();
  const [loading, setloading] = useState();
  const [Enrolled, setEnrollled] = useState([]);
  const {idState, context} = useCurrentId();

  useEffect(() => {
    getEnrolledQuizzes();
  }, []);

  async function getEnrolledQuizzes() {
    setloading(true);
    try {
      let res = await saved.getEnrolledQuizzes(idState.id);
      if (res.status === 1) {
        setEnrollled(res.enrolled_quizes);
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{zIndex:1}}>
        <Toast />
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator color={ColorsConstant.Theme} size={35} />
        ) : Enrolled.length === 0 ? (
          <NoDataFound
            message={'No Data Found'}
            action={getEnrolledQuizzes}
            actionText={'Reload'}
          />
        ) : (
          Enrolled.map(res => {
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
                  type={'enrolled'}
                  onPress={() => {
                    navigation.navigate('StartExam', { id: res._id });
                  }}
                />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({});
