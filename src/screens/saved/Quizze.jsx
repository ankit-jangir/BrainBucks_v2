import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';
import SavedApiService from '../../services/api/SavedApiService';
import {useCurrentId} from '../../context/IdReducer';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import QuizCard from '../../components/QuizCard';

const Quizze = () => {
  const navigation = useNavigation();
  const saved = new SavedApiService();
  const [loading, setloading] = useState();
  const {idState, context} = useCurrentId();
  const [Quizes, setQuizze] = useState([]);
  useEffect(() => {
    getActiveQuizzes();
  }, []);

  async function getActiveQuizzes() {
    setloading(true);
    try {
      let res = await saved.getActiveQuizzes(idState.id);
      if (res.status === 1) {
        setQuizze(res.active_quizes);
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
      <View>
        <Toast />
      </View>
      <ScrollView>
        <View style={{padding: 10, backgroundColor: 'white', flex: 1}}>
          {loading ? (
            <ActivityIndicator color={ColorsConstant.Theme} size={35} />
          ) : Quizes.length === 0 ? (
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <NoDataFound
                message={'No Data Found'}
                action={getActiveQuizzes}
                actionText={'Reload'}
              />
            </View>
          ) : (
            Quizes.map(res => {
              return (
                <>
                  <QuizCard
                    key={res._id}
                    title={res.quiz_name}
                    image={{uri: BLOBURL + res.banner}}
                    fees={res.entryFees}
                    prize={res.prize}
                    date={res.sch_time}
                    time={res.sch_time}
                    totalslots={res.slots}
                    alotedslots={res.slot_aloted}
                    type={'active'}
                    onPress={() => {}}
                  />
                </>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Quizze;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  title: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: '600',
  },
  feeAndDateRow: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
    paddingLeft: 6,
    fontWeight: '500',
  },
  feeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  feeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  date: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 5,
  },
  prizeAndDateRow: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  prizeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
    paddingLeft: 6,
    fontWeight: '500',
  },
  prizeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  prizeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  iconImageSmall: {
    width: 17,
    height: 17,
  },
  earningContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  dollarImage: {
    width: 25,
    height: 25,
  },
  earningAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  earningAmountBlue: {
    color: '#2188E7',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
  },
  earningAmount: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 13,
  },
  progressBarContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
});
