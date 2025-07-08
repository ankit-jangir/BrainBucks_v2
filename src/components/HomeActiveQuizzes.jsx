// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {Text} from '../utils/Translate';
// import LottieView from 'lottie-react-native';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import NoDataFound from './NoDataFound';
// import QuizCard from './QuizCard';
// import {BLOBURL} from '../config/urls';
// import styles from '../styles/Home.styles';
// import HomeApiService from '../services/api/HomeApiService';
// import {useQuery} from '@tanstack/react-query';
// import {ColorsConstant} from '../constants/Colors.constant';

// export default function HomeActiveQuizzes({homeData}) {
//   const navigation = useNavigation();
//   const {width} = Dimensions.get('window');

//   const CARD_MARGIN = 1; 
//   const CARD_WIDTH = width - 7 * CARD_MARGIN; 

//   const homeServ = new HomeApiService();
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     refetch();
//   }, [isFocused]);

//   const getActiveHomeQuizzes = async () => {
//     const activeQuizRes = await homeServ.getActiveQuizes(1, 10);
//     return activeQuizRes;
//   };

//   const {data, isFetching, refetch} = useQuery({
//     queryKey: ['homeActiveQuizzes'],
//     queryFn: getActiveHomeQuizzes,
//   });
//   const [activeQuizzes, setActiveQuizzes] = useState(data?.activequizes || []);

//   useEffect(() => {
//     setActiveQuizzes(data?.activequizes || []);
//   }, [data]);

//   return (
//     <>
//       <View style={styles.LiveView}>
//         <View style={styles.LiveView1}>
//           <View style={styles.LiveView2}>
//             <Text style={styles.LiveText}>Live Quizzes</Text>
//             <View style={styles.lotiView}>
//               <LottieView
//                 autoPlay
//                 style={styles.ViewLoti}
//                 source={require('../assets/img/live-pulse.json')}
//               />
//             </View>
//           </View>
//         </View>
//         <View style={styles.SeeView}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('AllLiveQuizzes', {type: 'active'})
//             }
//             style={styles.TouchAll}>
//             <Text style={styles.SeeAll}>See All</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={{flex: 1}}>
//         {isFetching ? (
//           <ActivityIndicator size={20} color={ColorsConstant.Theme} />
//         )  : (
//           <FlatList
//             data={activeQuizzes}
//             keyExtractor={item => item._id.toString()}
//             renderItem={({item}) => (
//               <View
//                 style={{
//                   width: CARD_WIDTH,
//                   margin: CARD_MARGIN,
//                 }}>
//                 <QuizCard
//                   prize={item.prize}
//                   fees={item.entryFees}
//                   title={item.quiz_name}
//                   date={item.sch_time}
//                   image={{uri: BLOBURL + item.banner}}
//                   alotedslots={item.slot_aloted}
//                   totalslots={item.slots}
//                   type={'active'}
//                   onPress={() => {
//                     navigation.navigate('QuizDetails', {id: item._id});
//                   }}
//                 />
//               </View>
//             )}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             // snapToInterval={width}
//             snapToAlignment="center"
//             decelerationRate="fast"
//             contentContainerStyle={{paddingHorizontal: CARD_MARGIN}}
//           />
//         )}
//       </View>
//     </>
//   );
// }
// // : activeQuizzes?.length === 0 ? (
// //   <NoDataFound
// //     scale={0.7}
// //     message={'No Active Quizes Currently'}
// //     actionText={'Reload'}
// //   />
// // )

import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../utils/Translate';
import LottieView from 'lottie-react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import NoDataFound from './NoDataFound';
import QuizCard from './QuizCard';
import {BLOBURL} from '../config/urls';
import styles from '../styles/Home.styles';
import HomeApiService from '../services/api/HomeApiService';
import {useQuery} from '@tanstack/react-query';

export default function HomeActiveQuizzes() {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const CARD_MARGIN = 1; 
  const CARD_WIDTH = width - 7 * CARD_MARGIN; 

  const homeServ = new HomeApiService();
  const isFocused = useIsFocused();

  const getActiveHomeQuizzes = async () => {
    const activeQuizRes = await homeServ.getActiveQuizes(1, 10);
    return activeQuizRes;
  };

  const {data, refetch} = useQuery({
    queryKey: ['homeActiveQuizzes'],
    queryFn: getActiveHomeQuizzes,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [activeQuizzes, setActiveQuizzes] = useState([]);

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (data?.activequizes?.length) {
      setActiveQuizzes(data.activequizes);
    }
  }, [data]);

  // If no data yet, don't show anything (no loader)
  if (!activeQuizzes || activeQuizzes.length === 0) return null;

  return (
    <>
      <View style={styles.LiveView}>
        <View style={styles.LiveView1}>
          <View style={styles.LiveView2}>
            <Text style={styles.LiveText}>Live Quizzes</Text>
            <View style={styles.lotiView}>
              <LottieView
                autoPlay
                style={styles.ViewLoti}
                source={require('../assets/img/live-pulse.json')}
              />
            </View>
          </View>
        </View>
        <View style={styles.SeeView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AllLiveQuizzes', {type: 'active'})
            }
            style={styles.TouchAll}>
            <Text style={styles.SeeAll}>See All {">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={activeQuizzes}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <View style={{width: CARD_WIDTH, margin: CARD_MARGIN}}>
              <QuizCard
                prize={item.prize}
                fees={item.entryFees}
                title={item.quiz_name}
                date={item.sch_time}
                image={{uri: BLOBURL + item.banner}}
                alotedslots={item.slot_aloted}
                totalslots={item.slots}
                type={'active'}
                onPress={() => {
                  navigation.navigate('QuizDetails', {id: item._id});
                }}
              />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{paddingHorizontal: CARD_MARGIN}}
        />
      </View>
    </>
  );
}
