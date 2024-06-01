import { Image,  View, Dimensions, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearProgress, Button } from '@rneui/themed';
import HistoryApiService from '../../services/api/HistoryApiService';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../../utils/Translate';
import styles from '../../styles/Home.styles';
import NoDataFound from '../../components/NoDataFound';
import { getHomeData } from '../../controllers/HomeController';
import basic from '../../services/BasicServices';
import QuizCard from '../../components/QuizCard';
import { BLOBURL } from '../../config/urls';
import { useQuiz } from '../../context/QuizPlayReducer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const CARD_MARGIN = 1; // Adjust this value as needed
const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width
const All = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [allwin, setAllWin] = useState([]);
  const [loading, setLoading] = useState(true);

  const {quizState,dispatch}= useQuiz

  const history = new HistoryApiService();

  async function getWalletData() {
    try {
      let res = await history.getFullHistory(1, 1);
      if (res.status === 1) {
        setAllWin(res.properquizes);
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting earned data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWalletData();
  }, []);


  function loadData() {
    getHomeData(Toast, setLoading)
  }

  useEffect(() => {
    let subs = true;
    if (progress < 1 && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(progress + 0.1);
        }
      }, 100);
    }
    return () => {
      subs = false;
    };
  }, [progress]);

  return (
    <View style={styles.mainContainer}>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>

      {
  allwin?.length == 0 ? (
    <NoDataFound
      scale={0.7}
      message="No Active Quizzes Currently"
      action={loadData}
      actionText="Reload"
    />
  ) : (
    <FlatList
      data={allwin}
      keyExtractor={item => item._id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            width: CARD_WIDTH,
            margin: CARD_MARGIN,
          }}
        >
          <QuizCard
            prize={item.prize}
            fees={item.entryFees}
            title={item.quiz_name}
            date={item.sch_time}
            image={{ uri: `${BLOBURL}${item.banner}` }}
            alotedslots={item.slot_aloted}
            totalslots={item.slots}
            type={item.is_active}
            minper={item.min_reward_per}
            reward={item.reward}
            buttontext="viewresult"
            onPress={() => {
              // dispatch({type:'change',state:{id:item._id}})
              navigation.navigate('QuizzesResult');
            }}
          />
        </View>
      )}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
    />
  )
}

    </View>
  );
};

export default All;


