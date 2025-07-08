// import { ActivityIndicator, Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
// import { Text } from '../utils/Translate'
// import React, { useEffect, useState } from 'react'
// import styles from '../styles/Home.styles'
// import QuizCard from './QuizCard'
// import { useIsFocused, useNavigation } from '@react-navigation/native'
// import NoDataFound from './NoDataFound'
// import { BLOBURL } from '../config/urls'
// import HomeApiService from '../services/api/HomeApiService'
// import { useQuery } from '@tanstack/react-query'
// import { ColorsConstant } from '../constants/Colors.constant'

// export default function HomeTriviaQuizzes({homeData}) {

//     const navigation = useNavigation()
//     const { width } = Dimensions.get('window');


//     const isFocused = useIsFocused()

//     useEffect(()=>{
//         refetch()
//     },[isFocused])


//     const CARD_MARGIN = 1; // Adjust this value as needed
//     const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width

//     const homeServ = new HomeApiService()

//     const getTriviaHomeQuizzes = async ()=>{
//         const activeQuizRes = await homeServ.getTriviaQuizes(1,10)
//         return activeQuizRes
//     }

//     const { data, isFetching, refetch } = useQuery({ queryKey: ['homeTriviaQuizzes'], queryFn: getTriviaHomeQuizzes })
//     const [triviaQuizzes, setTriviaQuizzes] = useState(data?.triviaquizes || [])
    

//     useEffect(()=>{
//         setTriviaQuizzes(data?.triviaquizes || [])
//     },[data])


//     return (
//         <>
//             <View style={styles.LiveView}>
//                 <View style={styles.LiveView1}>
//                     <View style={styles.LiveView2}>
//                         <Text style={styles.LiveText}>Free Trivia</Text>
//                         <View style={styles.lotiView}>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={styles.SeeView}>
//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'trivia' })}
//                         style={styles.TouchAll}>
//                         <Text style={styles.SeeAll}>See All</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={{ flex: 1 }}>
//                 {
//                     isFetching
//                     ?
//                     <ActivityIndicator size={20} color={ColorsConstant.Theme}/>
//                     :
                   
//                         <FlatList
//                             data={triviaQuizzes}
//                             keyExtractor={item => item._id.toString()}
//                             renderItem={({ item }) => (
//                                 <View
//                                     style={{
//                                         width: CARD_WIDTH,
//                                         margin: CARD_MARGIN,
//                                     }}>
//                                     <QuizCard
//                                         prize={item.reward}
//                                         fees={item.entryFees}
//                                         title={item.quiz_name}
//                                         image={{ uri: BLOBURL + item.banner }}
//                                         alotedslots={item.slot_aloted}
//                                         totalslots={item.slots}
//                                         type={'trivia'}
//                                         date={item.sch_time}
//                                         minper={item.min_reward_per}
//                                         onPress={() => {
//                                             navigation.navigate('FreeRulesParticipation', { id: item._id })
//                                         }}
//                                     />
//                                 </View>
//                             )}
//                             horizontal
//                             pagingEnabled
//                             showsHorizontalScrollIndicator={false}
//                             // snapToInterval={width}
//                             snapToAlignment="center"
//                             decelerationRate="fast"
//                             contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
//                         />
//                 }
//             </View>
//         </>
//     )
// }
// // (triviaQuizzes?.length === 0)
// // ?
// // <NoDataFound scale={0.7} message={"No Trivia Quizes Currently"}actionText={"Reload"} />
// // :
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '../utils/Translate';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.styles';
import QuizCard from './QuizCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BLOBURL } from '../config/urls';
import HomeApiService from '../services/api/HomeApiService';
import { useQuery } from '@tanstack/react-query';

export default function HomeTriviaQuizzes() {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const CARD_MARGIN = 1;
  const CARD_WIDTH = width - 7 * CARD_MARGIN;

  const homeServ = new HomeApiService();
  const isFocused = useIsFocused();

  const getTriviaHomeQuizzes = async () => {
    const activeQuizRes = await homeServ.getTriviaQuizes(1, 10);
    return activeQuizRes;
  };

  const { data, refetch } = useQuery({
    queryKey: ['homeTriviaQuizzes'],
    queryFn: getTriviaHomeQuizzes,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const [triviaQuizzes, setTriviaQuizzes] = useState([]);

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (data?.triviaquizes?.length) {
      setTriviaQuizzes(data.triviaquizes);
    }
  }, [data]);

  // No data yet, don't render anything
  if (!triviaQuizzes || triviaQuizzes.length === 0) return null;

  return (
    <>
      <View style={styles.LiveView}>
        <View style={styles.LiveView1}>
          <View style={styles.LiveView2}>
            <Text style={styles.LiveText}>Free Trivia</Text>
            <View style={styles.lotiView}></View>
          </View>
        </View>
        <View style={styles.SeeView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'trivia' })}
            style={styles.TouchAll}
          >
            <Text style={styles.SeeAll}>See All {">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={triviaQuizzes}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH, margin: CARD_MARGIN }}>
              <QuizCard
                prize={item.reward}
                fees={item.entryFees}
                title={item.quiz_name}
                image={{ uri: BLOBURL + item.banner }}
                alotedslots={item.slot_aloted}
                totalslots={item.slots}
                type={'trivia'}
                date={item.sch_time}
                minper={item.min_reward_per}
                onPress={() => {
                  navigation.navigate('FreeRulesParticipation', { id: item._id });
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
