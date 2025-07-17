import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../../utils/Translate';
import styles from '../../styles/AllLiveQuizzes.styles';
import SavedApiService from '../../services/api/SavedApiService';
import basic from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import QuizCard from '../../components/QuizCard';
import {BLOBURL} from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';
import MainHeader from '../../components/MainHeader';
export default function MyExamQuizzes({navigation, route}) {
  const [live, setLive] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const id = route.params.id;
  const image = route.params.imgurl;
  const title = route.params.title;
  const serv = new SavedApiService();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(2);
  const [loading2, setLoading2] = useState(false);

  const onRefresh = () => {
    getExamQuizzes();
  };

  useEffect(() => {
    getExamQuizzes();
  }, []);

  function getExamQuizHelper(id, page) {
    return async () => {
      let res = await serv.getActiveQuizzes(id, page);
      return res;
    };
  }
  async function getExamQuizzes(page) {
    if (!page) {
      page = 1;
    }

    if (page > pageCount) {
      return;
    }

    let func = setLoading2;
    if (page === 1) {
      func = setLoading;
    }

    let res = await basic.apiTryCatch(
      getExamQuizHelper(id, page),
      Toast,
      () => {
        func(true);
      },
      () => {
        func(false);
      },
    );
    if (res) {
      setPageCount(res.totalpages);
      page === 1
        ? setLive(res.active_quizes)
        : setLive([...live, ...res.active_quizes]);
      setCurrentPage(page);
    }
  }

  return (
    <>
      <View style={{zIndex: 200}}>
        <Toast />
      </View>
      <View style={styles.container}>
        <MainHeader
          name={'My Exam Quizzes'}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              navigation.goBack();
            },
          }}
        />
<View
  style={{
    flexDirection: 'row',
    alignItems: 'flex-start',  // so text starts at top of image
    padding: 10,
    alignItems:'center'
  }}>
  <Image
    source={{ uri: BLOBURL + image }}
    style={{ width: 35, height: 35, marginRight: 10 }}
  />
  <Text
    style={{
      flex: 1,                     // take remaining space
      color: '#000',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
      flexWrap: 'wrap',           // allow wrapping
    }}
    numberOfLines={2}
    ellipsizeMode="tail"
  >
    {title}
  </Text>
</View>



        {loading ? (
          <ActivityIndicator size={40} style={{flex: 1}} />
        ) : live.length === 0 ? (
          <NoDataFound
            message={'No Quizzes Found for This Exam'}
            action={getExamQuizzes}
            actionText={'Reload'}
          />
        ) : (
          <FlatList
            onEndReached={() => getExamQuizzes(currentPage + 1)}
            onEndReachedThreshold={0.6}
            data={live}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <QuizCard
                key={item._id}
                image={{uri: BLOBURL + item.banner}}
                title={item.quiz_name}
                fees={item.entryFees}
                prize={item.prize}
                date={item.sch_time}
                totalslots={item.slots}
                alotedslots={item.slot_aloted}
                type={'active'}
                onPress={() => {
                  navigation.navigate('QuizDetails', {id: item._id});
                }}
              />
            )}
          />
        )}
        {loading2 && <ActivityIndicator size={30} style={{height: 40}} />}
      </View>
    </>
  );
}

const ExamDetail = props => {
  return (
    <View style={styles.quizContainer}>
      <View style={styles.quizHeader}>
        <Image
          source={require('../../assets/img/banner.png')}
          style={styles.quizImage}
        />
        <Text style={styles.quizTitle}>SBI-PO Current Affairs</Text>
      </View>

      <View style={styles.quizDetails}>
        <View style={styles.quizDetailItem}>
          <Text style={styles.quizDetailLabel}>Fees</Text>
          <View style={styles.quizDetailValueContainer}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={styles.coinImage}
            />
            <Text style={styles.coinText}>99</Text>
          </View>
        </View>
        <View style={styles.quizDetailItem}>
          <Image
            source={require('../../assets/img/time2.png')}
            resizeMode="contain"
            tintColor="rgba(138, 138, 138, 1)"
            style={styles.timeImage}
          />
          <Text style={styles.timeText}>12/10/2002</Text>
        </View>
      </View>

      <View style={styles.quizDetails}>
        <View style={styles.quizDetailItem}>
          <Text style={styles.quizDetailLabel}>Prize</Text>
          <View style={styles.quizDetailValueContainer}>
            <Image
              source={require('../../assets/img/bbcoin.png')}
              resizeMode="contain"
              style={styles.coinImage}
            />
            <Text style={styles.coinText}>99</Text>
          </View>
        </View>
        <View style={styles.quizDetailItem}>
          <Image
            source={require('../../assets/img/calendar.png')}
            resizeMode="contain"
            tintColor="rgba(138, 138, 138, 1)"
            style={styles.calendarImage}
          />
          <Text style={styles.calendarText}>12/10/2002</Text>
        </View>
      </View>

      <View style={styles.earningContainer}>
        <Image
          source={require('../../assets/img/dollar.png')}
          resizeMode="contain"
          style={styles.dollarImage}
        />
        <View style={styles.earningTextContainer}>
          <Text style={styles.earningPrimaryText}>988/</Text>
          <Text style={styles.earningSecondaryText}>88</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 10}}
            colors={['#54ACFD', '#2289E7']}
            style={styles.progressBar}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerButtonContainer}
        onPress={() => {
          props.navigation.navigate('QuizDetails');
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.6, y: 2.0}}
          colors={['#54ACFD', '#2289E7']}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
