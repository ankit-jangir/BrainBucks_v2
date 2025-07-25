import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import {StyleConstants} from '../../constants/Style.constant';
import {Button, Text} from '../../utils/Translate';
import styles from '../../styles/SingUp.styles';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';
import BasicServices from '../../services/BasicServices';
import ChatSockService from '../../services/api/ChatSockService';
import {setLoggedIn} from '../../..';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpExam({navigation, route}) {
  const [refresh, setRefresh] = useState(false); // pull-to-refresh
  const [isLoadingExams, setIsLoadingExams] = useState(false); // loader for exam fetching
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState(new Set([]));
  const [search, setSearch] = useState('');
  const [disabled, setDisabled] = useState(false);
  const auth = new AuthenticationApiService();

  async function searchExams(val) {
    setSearch(val);
  }

  async function finalRegister() {
    if (selectedExams.size === 0) {
      ToastAndroid.show(
        'Atleast select one exam to continue',
        ToastAndroid.SHORT,
      );
      return;
    }
    setDisabled(true);
    try {
      let res = await auth.registerUser(
        route.params.phone,
        route.params.name,
        route.params.gender,
        Array.from(selectedExams),
        route.params.otp,
        route.params.referCode,
        route.params.userType,
        route.params.description,
      );
      if (res.status === 1) {
        await BasicServices.setJwt(res.token);
        await BasicServices.setId(res.user_id);
        await BasicServices.setUserType(res.is_edu);
        ChatSockService.connect();
        setLoggedIn(true);
        await AsyncStorage.removeItem('referral_code');
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in Registering User', err.message);
    } finally {
      setDisabled(false);
    }
  }

  function selectExam(id) {
    setSelectedExams(se => {
      let k = new Set(se);
      if (k.has(id)) {
        k.delete(id);
      } else {
        k.add(id);
      }
      return k;
    });
  }

  async function reloadExams() {
    setIsLoadingExams(true);
    try {
      let res = await auth.getExams(search);
      if (res.status === 1) {
        setExams(res.categories);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in getting categories in signup: ', err.message);
    } finally {
      setIsLoadingExams(false);
    }
  }

  useEffect(() => {
    reloadExams();
  }, [search]);

  const onRefresh = async () => {
    setRefresh(true);
    await reloadExams();
    setRefresh(false);
  };

  return (
    <>
      <View style={styles.containerView}>
        <View style={{zIndex: 2}}>
          <Toast />
        </View>
        <View style={styles.FinalView}>
          <View style={styles.FinalView1}>
            <View style={styles.StepView}>
              <Text style={styles.TextFinal}>Final Step</Text>
              <Image
                source={require('../../assets/img/arrowtoright.png')}
                resizeMode="contain"
                style={styles.ArrowPic}
              />
            </View>
          </View>
          <View style={styles.flowerView}>
            <Image
              source={require('../../assets/img/flower.png')}
              resizeMode="contain"
              style={styles.flowerPic}
            />
          </View>
        </View>

        <View style={styles.CardView}>
          <View style={styles.CardView2}>
            <Text style={styles.TextPrepare}>I am preparing for</Text>
            <View style={styles.SearchView}>
              <TouchableOpacity style={{flex: 0.1}}>
                <Image
                  source={require('../../assets/img/search.png')}
                  resizeMode="contain"
                  tintColor={ColorsConstant.GrayyColor}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.innput}
                value={search}
                onChangeText={searchExams}
                placeholder="Search for Exams"
                placeholderTextColor={ColorsConstant.GrayyColor}
              />
            </View>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
            style={{flex: 1, paddingHorizontal: 20}}>
            {isLoadingExams ? (
              <ActivityIndicator size={30} style={{marginTop: 20}} />
            ) : exams.length === 0 ? (
              <NoDataFound
                message={'Data Not Found'}
                action={reloadExams}
                actionText={'Load Again'}
              />
            ) : (
              exams.map(item => (
                <View key={item._id} style={styles.ExamView}>
                  <View style={styles.ExamView2}>
                    <View style={styles.CateView}>
                      <Image
                        source={{uri: BLOBURL + item.image}}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                        }}
                      />
                    </View>
                    <View style={styles.CateViewName}>
                      <Text style={styles.CateName}>
                        {item.category_name}
                      </Text>
                    </View>
                    <View style={styles.TouchhView}>
                      <TouchableOpacity
                        onPress={() => {
                          selectExam(item._id);
                        }}
                        style={[
                          styles.plus,
                          selectedExams.has(item._id) && {
                            backgroundColor: ColorsConstant.Checkedcolor,
                          },
                        ]}>
                        {selectedExams.has(item._id) ? (
                          <Text style={{color: '#fff'}}>✓</Text>
                        ) : (
                          <Text style={{color: '#000'}}>+</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.btnView}>
            <Button
              onPress={finalRegister}
              title="Start Preparing"
              loading={disabled}
              titleStyle={[
                StyleConstants.BtnText,
                {color: ColorsConstant.White},
              ]}
              buttonStyle={[
                StyleConstants.Btn,
                {backgroundColor: ColorsConstant.Theme},
              ]}
              loadingProps={{
                size: 'large',
                color: 'white',
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
