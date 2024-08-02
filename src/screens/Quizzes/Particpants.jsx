import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { useIsFocused } from '@react-navigation/native';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import { useQuiz } from '../../context/QuizPlayReducer';
import Toast from 'react-native-toast-message';
import BasicServices from '../../services/BasicServices';

export default function Participants({ participants }) {

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const focus = useIsFocused()
  const quizServ = new ActiveQuizApiService()
  const { quizState, dispatch } = useQuiz()
  const [data, setData] = useState([])

  useEffect(() => {
    getRewards();
  }, [focus]);

  function getDataHelper(page) {
    return async () => {
      let res = await quizServ.getActiveQuizParticipants(quizState.id, page);
      return res;
    }
  }

  async function getRewards(page) {
    if (!page) {
      page = 1
    }

    if (page <= totalPages) {
      setCurrentPage(page)
      let func = setLoadingMore
      let res = await BasicServices.apiTryCatch(getDataHelper(page), Toast, () => { func(true) }, () => { func(false) })
      if (res) {
        setTotalPages(res.totalPages)
        if (page === 1)
          setData(res.participantNames)
        else
          setData([...data, ...res.participantNames])
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onEndReached={()=>{
          getRewards(currentPage+1)
        }}
        renderItem={({ item, index }) => (
          <ParticipantItem data={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const ParticipantItem = ({ data, index }) => {
  return (
    <View style={styles.participantContainer}>
      <Text style={styles.participantText}>{index + 1}. {data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dark',
  },
  participantContainer: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#E2E2E2',
    paddingLeft: 15,
  },
  participantText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    color: '#000'
  },
});
