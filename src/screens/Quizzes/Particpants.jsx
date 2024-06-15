import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { useIsFocused } from '@react-navigation/native';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import { useQuiz } from '../../context/QuizPlayReducer';
import Toast from 'react-native-toast-message';

export default function Participants({ participants }) {
  const focus = useIsFocused()
  const quizServ = new ActiveQuizApiService()
  const {quizState, dispatch} = useQuiz()
  const [data, setData] = useState([])

  useEffect(()=>{
    quizServ.getActiveQuizParticipants(quizState.id).then(res=>{
      if(res){
        setData(["You",...res.participantNames])
      }
    }).catch((err)=>{
      console.log("Error in fetching participants: ",err);
      // Toast.show({type:"error", text1:"Something went wrong"})
    })
  },[focus])

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
    color:'#000'
  },
});
