import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/Saved.styles';
import SavedApiService from '../../services/api/SavedApiService';
import {useCurrentId} from '../../context/IdReducer';
import Toast from 'react-native-toast-message';
import Saved from './Saved';
import {ScrollView} from 'react-native-gesture-handler';
import {BLOBURL} from '../../config/urls';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';

const FreeTrivia = () => {
  const saved = new SavedApiService();

  const {idState, context} = useCurrentId();
  const [loading, setloading] = useState();
  const [trivia, setTrivia] = useState([]);

  useEffect(() => {
    getTriviaQuizzes();
  }, []);

  async function getTriviaQuizzes() {
    setloading(true);

    try {
      let res = await saved.getTriviaQuizzes(idState.id);
      if (res.status === 1) {
        console.log(res);
        setTrivia(res.trivia_quizes);
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
  const triviadata = [
    {
      exam: 'SBI-PO Current Affairs',
      fees: 0,
      prize: 500,
      width: 45,
      image: require('../../assets/img/sbi.png'),
    },
    {
      exam: 'SBI-PO Current Affairs',
      fees: 0,
      prize: 500,
      width: 45,
      image: require('../../assets/img/sbi.png'),
    },
  ];
  return (
    <>
      <Toast />
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
          {loading ? (
            <ActivityIndicator color={ColorsConstant.Theme} size={35} />
          ) : trivia.length === 0 ? (
            <NoDataFound
              message={'No Data Found'}
              action={getTriviaQuizzes}
              actionText={'Reload'}
            />
          ) : (
            trivia.map(res => {
              return (
                <View style={styles.container}>
                  <View style={styles.row}>
                    <View>
                      <Image
                        source={{uri: BLOBURL + res.banner}}
                        style={styles.bannerImage}
                      />
                    </View>
                    <View>
                      <Text style={styles.title}>{res.quiz_name}</Text>
                    </View>
                  </View>

                  <View style={[styles.row, styles.feeAndDateRow]}>
                    <View style={styles.row}>
                      <Text style={styles.feeLabel}>Prize</Text>
                      <View style={styles.feeAmountContainer}>
                        <Image
                          source={require('../../assets/img/bbcoin.png')}
                          resizeMode="contain"
                          style={styles.coinImage}
                        />
                        <Text style={styles.feeAmount}>{res.reward}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <Image
                        source={require('../../assets/img/time2.png')}
                        resizeMode="contain"
                        tintColor={'rgba(138, 138, 138, 1)'}
                        style={styles.iconImage}
                      />
                      <Text style={styles.date}>{res.sch_time}</Text>
                    </View>
                  </View>

                  <View style={styles.PerView}>
                    <Image
                      source={require('../../assets/img/cup.png')}
                      resizeMode="contain"
                      style={styles.cupPic}
                    />
                    <View style={styles.PerView1}>
                      <Text style={styles.textPer}>99 %</Text>
                    </View>
                  </View>

                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        start={{x: 0.0, y: 0.25}}
                        end={{x: 0.5, y: 1.0}}
                        colors={['#DD74EE', '#A715BE']}
                        style={{borderRadius: 8, height: 10}}></LinearGradient>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {}} style={styles.touchPar}>
                    <Text style={styles.textPar}>Participate Now</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default FreeTrivia;
