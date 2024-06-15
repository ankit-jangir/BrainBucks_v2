import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SavedApiService from '../../services/api/SavedApiService';
import {useCurrentId} from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

const Challenges = () => {
  const navigation = useNavigation()
  const saved = new SavedApiService();
  const [loading, setLoading] = useState();
  const [loadingMore, setLoadingMore] = useState();

  const [Enrolled, setEnrolled] = useState([]);
  const {idState, context} = useCurrentId();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  useEffect(() => {
    getEnrolledQuizzes();
  }, []);

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
      
      let res = await saved.getEnrolledQuizzes(idState.id,page);
      if (res.status === 1) {
        setTotalPages(res.totalpages)
        if (page === 1) { setEnrolled(res.enrolled_quizes) }
        else { setEnrolled([...Enrolled, ...res.enrolled_quizes ]) }
        setCurrentPage(page)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong',
      // });
    } finally {
      setLoadingMore(false)
      setLoading(false)
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{zIndex:1}}>
        <Toast />
      </View>
        {
        loading ? (
          <ActivityIndicator color={ColorsConstant.Theme} size={35} />
        ) : Enrolled.length === 0 ? (
         <View style={{flex:1}}>
          <NoDataFound
            message={'Enroll in a quiz to see here'}
            action={()=>{navigation.goBack()}}
            actionText={'Go Back'}
          />
          </View>
        ) : (
          <FlatList
            data={Enrolled}
            onEndReached={()=>{getEnrolledQuizzes(currentPage+1)}}
            onEndReachedThreshold={0.6}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <QuizCard
                  key={item._id}
                  title={item.quiz_name}
                  image={{uri: BLOBURL + item.banner}}
                  prize={item.reward}
                  date={item.sch_time}
                  time={item.sch_time}
                  totalslots={item.slots}
                  alotedslots={item.slot_aloted}
                  type={'enrolled'}
                  onPress={() => {
                    navigation.navigate('StartExam', { id: item._id });
                  }}
                />
              )
            }}
          />
        )
          }
        {loadingMore && <ActivityIndicator size={30} style={{ height: 60 }} />}
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({});
