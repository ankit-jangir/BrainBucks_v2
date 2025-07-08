// import { ActivityIndicator, Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Text } from '../utils/Translate';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import NoDataFound from './NoDataFound';
// import QuizCard from './QuizCard';
// import { BLOBURL } from '../config/urls';
// import styles from '../styles/Home.styles';
// import HomeApiService from '../services/api/HomeApiService';
// import { useQuery } from '@tanstack/react-query';
// import { ColorsConstant } from '../constants/Colors.constant';
// import { useQuiz } from '../context/QuizPlayReducer';

// export default function HomeEnrolledQuizzes() {

//     const navigation = useNavigation()
//     const { width } = Dimensions.get('window');
//     const CARD_MARGIN = 1; // Adjust this value as needed
//     const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width

//     const homeServ = new HomeApiService()
//     const isFocused = useIsFocused()

//     const {quizState, dispatch} = useQuiz()

//     useEffect(() => {
//         refetch()
//     }, [isFocused])

//     const getEnrolledHomeQuizzes = async () => {
//         const enrolledQuizRes = await homeServ.getEnrolledQuizes(1, 10)
//         return enrolledQuizRes
//     }

//     const { data, isFetching, refetch } = useQuery({ queryKey: ['homeEnrolledQuiz'], queryFn: getEnrolledHomeQuizzes })
//     const [enrolledQuizzes, setEnrolledQuizzes] = useState(data?.enrolled_quizes || [])


//     useEffect(() => {
//         setEnrolledQuizzes(data?.enrolled_quizes || [])
//     }, [data])



//     return (
//         <>
//             <View style={styles.LiveView}>
//                 <View style={styles.LiveView1}>
//                     <View style={styles.LiveView2}>
//                         <Text style={styles.LiveText}>Enrolled Quizzes</Text>
//                         <View style={styles.lotiView}>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={styles.SeeView}>
//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'enrolled' })}
//                         style={styles.TouchAll}>
//                         <Text style={styles.SeeAll}>See All</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={{ flex: 1 }}>
//                 {
//                     isFetching
//                         ?
//                         <ActivityIndicator size={20} color={ColorsConstant.Theme} />
//                         :
                      
//                             <FlatList
//                                 data={enrolledQuizzes}
//                                 keyExtractor={item => item._id.toString()}
//                                 renderItem={({ item }) => (
//                                     <View
//                                         style={{
//                                             width: CARD_WIDTH,
//                                             margin: CARD_MARGIN,
//                                         }}>
//                                         <QuizCard
//                                             prize={item.reward}
//                                             fees={item.entryFees}
//                                             title={item.quiz_name}
//                                             date={item.sch_time}
//                                             image={{ uri: BLOBURL + item.banner }}
//                                             alotedslots={item.slot_aloted}
//                                             totalslots={item.slots}
//                                             type={'enrolled'}
//                                             onPress={() => {
//                                                 dispatch({type:"change", state:{id:item._id}})
//                                                 navigation.navigate('StartExam', { id: item._id });
//                                             }}
//                                         />
//                                     </View>
//                                 )}
//                                 horizontal
//                                 pagingEnabled
//                                 showsHorizontalScrollIndicator={false}
//                                 // snapToInterval={width}
//                                 snapToAlignment="center"
//                                 decelerationRate="fast"
//                                 contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
//                             />
//                 }
//             </View>
//         </>
//     )
// }

import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../utils/Translate';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import QuizCard from './QuizCard';
import { BLOBURL } from '../config/urls';
import styles from '../styles/Home.styles';
import HomeApiService from '../services/api/HomeApiService';
import { useQuery } from '@tanstack/react-query';
import { useQuiz } from '../context/QuizPlayReducer';

export default function HomeEnrolledQuizzes() {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const CARD_MARGIN = 1;
  const CARD_WIDTH = width - 7 * CARD_MARGIN;

  const homeServ = new HomeApiService();
  const isFocused = useIsFocused();
  const { quizState, dispatch } = useQuiz();

  const { data, refetch } = useQuery({
    queryKey: ['homeEnrolledQuiz'],
    queryFn: async () => await homeServ.getEnrolledQuizes(1, 10),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);


  console.log('====================================');
  console.log(enrolledQuizzes,'ddddd');
  console.log('====================================');
  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (data?.enrolled_quizes?.length) {
      setEnrolledQuizzes(data.enrolled_quizes);
    }
  }, [data]);

  // Agar data hi nahi mila toh kuch bhi render mat karo
  if (!enrolledQuizzes || enrolledQuizzes.length === 0) return null;

  return (
    <>
      <View style={styles.LiveView}>
        <View style={styles.LiveView1}>
          <View style={styles.LiveView2}>
            <Text style={styles.LiveText}>Enrolled Quizzes</Text>
            <View style={styles.lotiView}></View>
          </View>
        </View>
        <View style={styles.SeeView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'enrolled' })}
            style={styles.TouchAll}
          >
            <Text style={styles.SeeAll}>See All {">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={enrolledQuizzes}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH, margin: CARD_MARGIN }}>
              <QuizCard
                prize={item.prize}
                fees={item.entryFees}
                title={item.quiz_name}
                date={item.sch_time}
                image={{ uri: BLOBURL + item.banner }}
                alotedslots={item.slot_aloted}
                totalslots={item.slots}
                type={'enrolled'}
                onPress={() => {
                  dispatch({ type: "change", state: { id: item._id } });
                  navigation.navigate('StartExam', { id: item._id });
                }}
              />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
        />
      </View>
    </>
  );
}
